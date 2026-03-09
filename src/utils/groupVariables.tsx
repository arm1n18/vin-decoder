import type { VariableResult } from "../types/variables.interface"
import parse from "html-react-parser";
import { Link } from "react-router-dom";

export function groupVariablesAsNodes (variables: VariableResult[]) {
    const map = new Map<string, React.ReactNode[][]>()

    for(const variable of variables) {
        if(variable.GroupName && variable.ID) {
            let group = map.get(variable.GroupName)
            if(group) {
                group.push([
                    <Link to={`/variables/${variable.Name}`}>{variable.Name}</Link>,
                    parse(variable.Description)
                ]);
            }else {
                map.set(variable.GroupName, [[
                    <Link to={`/variables/${variable.Name}`}>{variable.Name}</Link>,
                    parse(variable.Description)
                ]])
            }
        }
    }

    const variablsList: { group: string | null, data: React.ReactNode[][] }[] = []

    for (const [group, data] of map) {
        variablsList.push({group, data})
    }

    return variablsList
}