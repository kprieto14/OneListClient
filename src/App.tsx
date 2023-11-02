import React from 'react'
import { TodoList } from './pages/TodoList'
import { TodoItemPage } from './pages/TodoItemPage'
import { Route, Routes } from 'react-router'

export type TodoItemType = {
  id: number | undefined
  text: string
  complete: boolean
  updated_at: Date | undefined
  created_at: Date | undefined
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
          <Route path='/items/:id' element={<TodoItemPage/>}/>
          <Route path='*' element={<p>Ooops, that URL is unknown.</p>}/>
        </Routes>
      </main>

      <footer>
        <p>&copy; 2020 Suncoast Developers Guild</p>
      </footer>
    </div> 
  )
}


