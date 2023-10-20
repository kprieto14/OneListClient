import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TodoItem } from './components/TodoItem'

export type TodoItemType = {
  id: number
  text: string
  complete: boolean
  updated_at: Date
  created_at: Date
}

export function App() {
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([])
  const [newTodoText, setNewTodoText] = useState('')

  function loadAllItems() {
    async function loadItems() {
      const response = await axios.get(
        'https://one-list-api.herokuapp.com/items?access_token=kristy-prieto'
      )

      if (response.status === 200) {
        setTodoItems(response.data)
      }
    }

    loadItems()
  }

  useEffect(loadAllItems, [])

  async function handleCreateNewTodoItem() {
    const response = await axios.post(
      'https://one-list-api.herokuapp.com/items?access_token=kristy-prieto',
      { item: { text: newTodoText } }
    )

    if (response.status === 201) {
      loadAllItems()
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
          return <TodoItem key={todoItem.id} todoItem={todoItem} reloadItems={loadAllItems}/>
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
    </div> 
  )
}

