import React from 'react'
import axios from 'axios'
import { IItems } from './interface';

// NOT SURE HOW TO MAKE IT CORRECT!!!

interface FormProps {
    items: IItems[],
    setItems: (a: IItems[]) => void,
    maxItems: number
}

export default function Form({items, setItems, maxItems}: FormProps) {

    const [inputId, setInputId] = React.useState('')
    const [inputTodo, setInputTodo] = React.useState('')
    const [todoId, setTodoId] = React.useState(maxItems + 1)
    const [showButton, setShowButton] = React.useState(true)
    
    React.useEffect(() => {
        setTodoId(maxItems + 1)
    },[maxItems])

    const addTodo = React.useCallback(async (id: number, inputTodo: string, inputId: string) => {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos',
        {
            "userId": Number(inputId),
            "id": id,
            "title": inputTodo,
            "completed": false
        }
    )
        setItems([...items, {...response.data, id}])
    }, [items, setItems, maxItems])

    const HandleSubmit = React.useCallback( async (e:React.FormEvent) => {
        e.preventDefault()
        await addTodo (todoId, inputTodo, inputId)
        setTodoId(todoId + 1)
        setInputId('')
        setInputTodo('')
    }, [todoId, inputTodo, inputId, addTodo])

    return (
        <div className='form_wrapper'>
            <button onClick={() => setShowButton(!showButton)} className={showButton ? 'btn_show' : 'btn_hidden'}>{showButton ? "SHOW FORM" : "HIDE FORM"}</button>
            {!showButton && <form onSubmit={HandleSubmit}>
                <input type="number" value={inputId} onChange={(e) => setInputId(e.target.value)} placeholder='Enter User ID'></input>
                <input type="text" value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} placeholder='Enter Todo'></input>
                <button disabled={!inputId.trim() || !inputTodo.trim()}>SUBMIT</button>
            </form>}
        </div>
    )
}
