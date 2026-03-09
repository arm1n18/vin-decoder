import { create } from "zustand";
import type { VariableResult } from "../types/variables.interface";

interface VariableSore {
    variables: VariableResult[];
    updateVariables: (newVariables: VariableResult[]) => void;
}

export const useVariables = create<VariableSore>((set) => ({
    variables: [],
    updateVariables: (newVariables) => set(() => ({
        variables: newVariables
    }))
}))