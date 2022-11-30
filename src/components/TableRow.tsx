import React from 'react'
import TableCell from './TableCell'
import { IItems } from './interface';

interface TableRowProps {
    item: IItems
}

export default function TableRow({ item }: TableRowProps) {
    const {
        id,
        title,
        userId,
        completed
    } = item

    const tableRowMainClass = "table__row"
    const tableRowAddClass = id % 2 ? "odd" : "even"
    
    
        return (
            <div className={tableRowMainClass.concat(" ", tableRowAddClass)}>
                <TableCell item={userId} />
                <TableCell item={id} />
                <TableCell item={title} />
                <TableCell item={completed} />
        </div>
        )
    };