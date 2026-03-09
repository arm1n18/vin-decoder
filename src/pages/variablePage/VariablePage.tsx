import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import type { VariableValuesList, VariableResult } from "../../types/variables.interface";
import { useVariables } from '../../store/variablesStore'
import parse from "html-react-parser";
import { Table } from "../../components/table/Table.component";
import { Icon } from "../../components/Icon.component";

export default function VariablePage() {
    const { variableId } = useParams();
    const { variables, updateVariables } = useVariables();

    const [variable, setVariable] = useState<VariableResult | null>(null);
    const [variableValuesList, setVariableValuesList] = useState<VariableValuesList | null>(null);

    const [isLoading, setIsLoading] = useState<{variable: boolean, valuesList: boolean}>({ variable: true, valuesList: true });
    const [errorMessage, setErrorMessage] = useState<{variable: string | null, valuesList: string | null}>({variable: null, valuesList: null});

    const fetchVariableValuesList = async() => {        
        setIsLoading((prev) => ({...prev, valuesList: true}))
        try {
            const response = await api.getVehicleVariableValueList(variableId ?? '')
            setVariableValuesList(response)
        } catch (err) {
            setErrorMessage((prev) => ({...prev, valuesList: String(err)}))
        } finally {
            setIsLoading((prev) => ({...prev, valuesList: false}))
        }
    }

    const fetchVariables = async() => {
        setIsLoading((prev) => ({...prev, variable: true}))

        try {
            const response = await api.getVehicleVariablesList()
            setVariable(response.Results.find(v => v.Name == variableId) ?? null)
            updateVariables(response.Results)
        } catch (err) {
            setErrorMessage((prev) => ({...prev, variable: String(err)}))
        } finally {
            setIsLoading((prev) => ({...prev, variable: false}))
        }
    }

    useEffect(() => {
        const cached = variables.find(v => v.Name == variableId)
        if(cached) {
           setVariable(cached)
           setIsLoading((prev) => ({...prev, variable: false}))
        } else {
            fetchVariables()
        }

        fetchVariableValuesList()
    }, [])
    
    return (
        <div className="wrapper">
            <h1>Variable: {variableId}</h1>

            {isLoading.variable 
                ? <div className="loader" />
                : (
                    variable && 
                        <div className="info-block">
                            <span>
                                {parse(variable?.Description)}
                            </span>
                        </div>
                )
            }

            {errorMessage.variable && 
                <div className="error-block">
                    <Icon name="Danger" size={32} />
                    <span>{errorMessage.variable}</span>
                </div>
            }

            {isLoading.valuesList 
                ? <div className="loader" />
                : (
                    variableValuesList && variableValuesList.Results.length > 0 && 
                        <Table 
                            headers={["ID", "Name"]} 
                            rows={
                                variableValuesList.Results
                                .map(v => ({ group: null, data: [[v.Id, v.Name]] }))
                            }
                            align="center"
                        />
                )
            }

            {errorMessage.valuesList && 
                <div className="error-block">
                    <Icon name="Danger" size={32} />
                    <span>{errorMessage.valuesList}</span>
                </div>
            }
        </div>
    )
}