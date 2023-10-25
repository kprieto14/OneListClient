import React from 'react'
import { TodoList } from './components/TodoList'
import { Route, Routes } from 'react-router'

export type TodoItemType = {
  id: number
  text: string
  complete: boolean
  updated_at: Date
  created_at: Date
}

export function App() {
  

  return (
    <div className="app">
      <header>
        <h1>One List</h1>
      </header>

      <main>
        <Routes>
          <Route path='/' element={<TodoList/>} />
        </Routes>
      </main>

      <footer>
        <p>&copy; 2020 Suncoast Developers Guild</p>
      </footer>
    </div> 
  )
}


