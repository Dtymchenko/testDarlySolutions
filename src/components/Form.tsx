import React from 'react'
import axios from 'axios'
import { IItems } from './interface';
import { notEqual } from 'assert';

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
    const [sending, setSending] = React.useState(false)

    
    React.useEffect(() => {
        setTodoId(maxItems + 1)
    },[maxItems])


    // Please note, that this API works a little strange, so  it returns always id 201 and also it does not actually add your new todo to list,
    // so if we have here 200 todos, but you rendered for example 60 todos and you use form to add new - it will be added just below todo number 60,
    // though it will have id 201 - it is just because of this API
    const addTodo = React.useCallback(async (id: number, inputTodo: string, inputId: string) => {
        setSending(true)
        try {
            const response = await axios.post('https://jsonplaceholder.typicode.com/todos',
        {
            "userId": Number(inputId),
            "id": id,
            "title": inputTodo,
            "completed": false
        }
    )
        setItems([...items, {...response.data, id}])
        } catch (error:any) {
            alert(error.message)
            console.log(error.message)
        } finally {
            setSending(false)
        }
        
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
                {/* Form has just 2 inputs, because there is no sense to make more with this exact API. */}
                <input type="number" value={inputId} onChange={(e) => setInputId(e.target.value)} placeholder='Enter User ID'></input>
                <input type="text" value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} placeholder='Enter Todo'></input>
                <button disabled={!inputId.trim() || !inputTodo.trim()}>SUBMIT</button>
            </form>}
            {sending && <div className='form_sending'><p>Sending data to server...</p></div>}
        </div>
    )
}
