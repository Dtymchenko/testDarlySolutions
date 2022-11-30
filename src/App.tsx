import React from 'react';
import './App.css';
import axios from 'axios'
import Table from './components/Table';
import { IItems } from './components/interface';
import Form from './components/Form';


export default function App() {

  const [items, setItems] = React.useState<IItems[]>([])
  const [loading, setLoading] = React.useState(true)
  const [pages, setPages] = React.useState(1)
  const [maxItems, setMaxItems] = React.useState<any>(0)

  const scrollHandler = (e:any) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
    // && items.length < maxItems
    ) 
    {
      setLoading(true)
    }
  }

  React.useEffect(() => {
    const getData = async () => {
      const response = await axios.get<IItems[]>(`https://jsonplaceholder.typicode.com/todos?_limit=30&_page=${pages}`)
      setItems([...items, ...response.data])
      setPages(prev => prev + 1)
      setMaxItems(response.headers['x-total-count'])
      setLoading(false)

    }
    getData();
  }, [loading])

  React.useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function() {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <div className="App">
      <Form items={items} setItems={setItems}/>
      <Table items={items}/>
    </div>
  );
}
