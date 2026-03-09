import type { VariablesList, VariableValuesList } from "../types/variables.interface"
import type { VinDecode } from "../types/vin.interface"

const BASE_URL = "https://vpic.nhtsa.dot.gov/api/vehicles"

async function fetchJSON<T>(path: string, init: RequestInit = {}): Promise<T> {
    const result = await fetch(`${BASE_URL}${path}`, {
        ...init
    })

    if (!result.ok) {
        const error = await result.json();
        if (error.message) {
            throw new Error(error.message);
        } else {
            throw new Error(result.statusText)
        }
        
    }

    return result.json() as Promise<T>
}

export const api = {
    decodeVIN: (vin: string) => fetchJSON<VinDecode>(`/decodevin/${vin}?format=json`),
    getVehicleVariablesList: () => fetchJSON<VariablesList>(`/getvehiclevariablelist?format=json`),
    getVehicleVariableValueList: (id: string) => fetchJSON<VariableValuesList>(`/getvehiclevariablevalueslist/${id}?format=json`),
}