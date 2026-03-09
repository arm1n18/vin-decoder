import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { Table } from "../../components/table/Table.component";
import type { GroupedVariables } from "../../types/variables.interface";
import { useVariables } from '../../store/variablesStore'
import { groupVariablesAsNodes } from "../../utils/groupVariables";
import { Icon } from "../../components/Icon.component";

export default function VariablesPage() {
    const { variables, updateVariables } = useVariables();
    const [variablesList, setVariablesList] = useState<GroupedVariables[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchVariables = async() => {
        setIsLoading(true)

        try {
            const response = await api.getVehicleVariablesList()
            setVariablesList(groupVariablesAsNodes(response.Results))
            updateVariables(response.Results)
        } catch (err) {
            setErrorMessage(String(err))
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(variables && variables.length > 0) {
            setVariablesList(groupVariablesAsNodes(variables))
            setIsLoading(false)
        } else {
            fetchVariables()
        }
    }, [])

    return (
        <div className="wrapper">
            <h1>Variables</h1>
            {isLoading 
                ? <div className="loader" />
                : (
                    variablesList 
                    && <Table 
                        headers={["Name", "Description"]} 
                        rows={variablesList}
                    />
                )
            }

            {errorMessage && 
                <div className="error-block">
                    <Icon name="Danger" size={32} />
                    <span>{errorMessage}</span>
                </div>
            }
        </div>
    )
}