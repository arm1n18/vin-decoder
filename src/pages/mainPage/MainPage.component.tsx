import { useEffect, useMemo, useReducer, useState } from "react";
import { Button, Input } from "../../components/ui";
import { api } from "../../services/api";
import type { VinDecode, VinDecodeResult } from "../../types/vin.interface";
import { Table } from "../../components/table/Table.component";
import { addVinToHistory, getHistory, removeVinFromHistory } from "../../services/localStorage";
import { Icon } from "../../components/Icon.component";
import "./MainPage.css"

interface VinAction {
    vin: string;
    action: 'push' | 'unshift' |  'remove'
}

export default function MainPage() {
    const [vin, setVin] = useState<string>("");
    const [decodedVIN, setDecodedVIN] = useState<VinDecode | null>(null);
    const [vinHistory, setVinHistory] = useReducer(reducer, []);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function reducer(state: string[], action: VinAction): string[] {
        switch (action.action) {
            case "push": {
                return [...state.filter(v => v != action.vin), action.vin].slice(0, 3)
            }
            case 'unshift': {
                return [action.vin, ...state.filter(v => v != action.vin)].slice(0, 3)
            }
            case "remove": {
                return [...state.filter(v => v != action.vin)].slice(0, 3)
            }
        }
    }

    const onSubmit = async(newVin: string) => {
        if(isLoading) return

        if(!isVinValid(newVin)) {
            setErrorMessage("VIN код має невірний формат")
            return
        }

        setErrorMessage(null)
        setDecodedVIN(null)
        setIsLoading(true)

        try {
            const response = await api.decodeVIN(newVin)
            setDecodedVIN(response)
            const error = possibleError(response.Results)
            setErrorMessage(error)

            if(!error) {
                setVinHistory({ action: 'unshift', vin: newVin })
                addVinToHistory(newVin)
            }
        } catch (err) {
            alert(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (value: string) => {
        setVin(value.toUpperCase().trim())
    }

    const isVinValid = (vin: string): boolean => {
        const regex = /^[A-HJ-NPR-Z0-9]{17}$/
        return regex.test(vin)
    }

    const possibleError = (results: VinDecodeResult[]): string | null => {
        const errorCode = results.find(r => r.VariableId == 143)
        if(errorCode && errorCode.Value == '0') {
            return null
        }

        const additionalErrorText = results.find(r => r.VariableId == 156)

        return additionalErrorText?.Value || null
    }

    const onVinClick = (vin: string) => {
        if(isLoading) return

        setVin(vin)
        onSubmit(vin)
    }

    const onVinRemove = (vin: string) => {
        setVinHistory({ action: 'remove', vin: vin })
        removeVinFromHistory(vin)
    }

    const rows = useMemo(() => {
        if(decodedVIN) {
            return decodedVIN.Results
                .filter(v => v.Value && v.Value.length > 0 && ![143, 156, 191].includes(v.VariableId))
                .map(v => ({
                    group: null,
                    data: [[v.Variable, v.Value!]]
                }));
        }

        return null
    }, [decodedVIN]);

    useEffect(() => {
        const VINs = getHistory()
        for(let vin of VINs) {
            setVinHistory({action: 'push', vin: vin})
        }
    }, [])

    return (
        <div className="wrapper">
            <h1>VIN Decoder</h1>
            <form className="search-form" onSubmit={(e) => {e.preventDefault(); onSubmit(vin)}}>
                <Input 
                    className="w-full"
                    placeholder="Введіть VIN" 
                    maxLength={17}
                    value={vin}
                    onChange={(e) => handleChange(e.target.value)}
                />

                <Button type="submit" disabled={isLoading || !isVinValid(vin)}>
                    Пошук
                </Button>
            </form>
            
            <div className="vin-history">
                {vinHistory.map(v => (
                    <div key={v} className={`vin-block ${isLoading ? "disabled" : ''}`} onClick={() => onVinClick(v)}>
                        <span>{v}</span>
                        <div className="remove-vin" onClick={(e) => {e.stopPropagation(); onVinRemove(v)}}>
                            <Icon name="FillCross" size={16} />
                        </div>
                    </div>
                ))}
            </div>

            {errorMessage && 
                <div className="error-block">
                    <Icon name="Danger" size={32} />
                    <span>{errorMessage}</span>
                </div>
            }

            {isLoading 
                ? <div className="loader" />
                : (rows 
                    && <Table 
                        headers={["Variable", "Value"]} 
                        rows={rows}
                    />
                )
            }
        </div>
    )
}