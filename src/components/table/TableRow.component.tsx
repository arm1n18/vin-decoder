import "./Table.css"

interface TableRowProps {
    index: number;
    data: React.ReactNode[];
    align?: "center" | "left" | "right" | "justify" | "char";
}

export const TableRow: React.FC<TableRowProps> = ({ index, data, align }) => {
    return (
        <tr className={`row ${index % 2 == 0 ? "even" : "odd"}`}>
            {data.map((d, i) => (
                <td key={`${i}-${d}`} align={align}>
                    {d}
                </td>
            ))}
        </tr>
    )
}