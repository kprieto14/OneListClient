import axios from 'axios'
import React, { useEffect, useState } from 'react'

type TodoItemType = {
  id: number
  text: string
  complete: boolean
  updated_at: Date
  created_at: Date
}

export function App() {
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([])
  const [newTodoText, setNewTodoText] = useState('')

  useEffect(function () {
    async function loadItems() {
      const response = await axios.get(
        'https://one-list-api.herokuapp.com/items?access_token=kristy-prieto'
      )

      if (response.status === 200) {
        setTodoItems(response.data)
      }
    }

    loadItems()
  }, [])

  async function handleCreateNewTodoItem() {
    const response = await axios.post(
      'https://one-list-api.herokuapp.com/items?access_token=kristy-prieto',
      { item: { text: newTodoText } }
    )

    if (response.status === 201) {
      const newTodo = response.data

      const newTodoItems = [...todoItems, newTodo]

      setTodoItems(newTodoItems)
      setNewTodoText('')
    }
  }

  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>

      <main>
        <ul>
          {todoItems.map(function (todoItem) {
            return <li key={todoItem.id} className={todoItem.complete ? 'completed' : ''}>{todoItem.text}</li>
          })}
        </ul> 
        
        <form
          onSubmit={function (event) {
            event.preventDefault()

            handleCreateNewTodoItem()
          }}
        >
          <input
            type="text"
            placeholder="Whats up?" 
            value={newTodoText}
            onChange={(event) => setNewTodoText(event.target.value)}
          />
        </form>
      </main>

      <footer>
        <p>&copy; 2020 Suncoast Developers Guild</p>
      </footer>
</div> )
}