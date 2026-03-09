export interface VariableResult {
    ID: number;
    DataType: string;
    Description: string;
    GroupName: string | null;
    Name: string;
}

export interface VariablesList {
    Count: number;
    Message: string;
    SearchCriteria: string;
    Results: VariableResult[];
}

export interface VariableValuesListResult {
    Id: number;
    Name: string;
    ElementName: string;
}

export interface VariableValuesList {
    Count: number;
    Message: string;
    SearchCriteria: string;
    Results: VariableValuesListResult[];
}

export interface GroupedVariables {
    group: string | null;
    data: React.ReactNode[][]
}