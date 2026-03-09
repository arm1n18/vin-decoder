import React from "react";
import { TableRow } from "./TableRow.component";


interface TableProps {
    headers: string[];
    rows: { group: string | null, data: React.ReactNode[][] }[];
    align?: "center" | "left" | "right" | "justify" | "char";
}

export const Table: React.FC<TableProps> = ({ headers, rows, align = 'left' }) => {
    let index = 0;

    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        {headers.map(h => (
                            <th key={h}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                     
                    {rows.map((row, i) => (
                        <React.Fragment key={`group-${i}`}>
                            {row.group && 
                                <tr className="group">
                                    <td colSpan={rows[0].data[0].length} align="center">
                                        <strong>{row.group}</strong>
                                    </td>
                                </tr>
                            }
                            
                            {
                                row.data.map(r => {
                                    const currentIndex = index++
                                    return (
                                        <TableRow key={`row-${currentIndex}`} index={currentIndex} data={r} align={align} />
                                    )
                                })
                            }
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}