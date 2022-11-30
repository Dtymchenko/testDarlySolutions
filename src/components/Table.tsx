import React from 'react'
import TableRow from './TableRow';
import { IItems } from './interface';


interface TableProps {
    items: IItems[],
}

export default function Table({items}: TableProps) {
    // const starships = useSelector(({ starships }) => starships.starships);
    
        return (
    items.length ?
        <div className="table">
            {items.map((item, idx) => <TableRow key={idx} item={item} />)}
        </div>
        : <div>Loading...</div>
        )
};