import React from 'react'

export default function TableCell({ item }: any) {
    
    return (
    <div className="table__cell">
        {item.toString()}
    </div>
    )
}