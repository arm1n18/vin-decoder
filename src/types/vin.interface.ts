export interface VinDecodeResult  {
    Value: string | null;
    ValueId: number | null;
    Variable: string;
    VariableId: number;
}

export interface VinDecode {
    Count: number;
    Message: string;
    SearchCriteria: string;
    Results: VinDecodeResult[];
}