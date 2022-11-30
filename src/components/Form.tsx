import React from 'react'
import axios from 'axios'
import { IItems } from './interface';

// NOT SURE HOW TO MAKE IT CORRECT!!!

interface FormProps {
    items: IItems[],
    setItems: any
}

export default function Form({items, setItems}:FormProps) {

    const [inputId, setInputId] = React.useState('')
    const [inputTodo, setInputTodo] = React.useState('')
    const [disabled, setDisabled] = React.useState(true)

    // not sure how to make it correctly, probably good option
    // would be to set id on back-end, so now I will hard code it,
    // as I know, that there are 200 items
    const [todoId, setTodoId] = React.useState(201)

    const HandleSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        // console.log(todoId)
        async function addTodo() {
            const response = await axios.post('https://jsonplaceholder.typicode.com/todos',
        {
            "userId": Number(inputId),
            "id": todoId,
            "title": inputTodo,
            "completed": false
        })

        setItems([...items, response.data])
        // console.log(response)
        }
        addTodo()
        setTodoId(prev => prev + 1)
        setInputId('')
        setInputTodo('')
        // console.log(todoId)
    }

    React.useEffect(() => {
        if (inputId.trim() && inputTodo.trim()) {
            setDisabled(false)
        } else {setDisabled(true)}
    }, [inputId, inputTodo])

    return (
        <div className='form_wrapper'>
            <form onSubmit={HandleSubmit}>
                <input type="number" value={inputId} onChange={(e) => setInputId(e.target.value)} placeholder='Enter User ID'></input>
                <input type="text" value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} placeholder='Enter Todo'></input>
                <button disabled={disabled}>SUBMIT</button>
            </form>
        </div>
    )
}
