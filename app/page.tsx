'use client'
import { createContext, useEffect, useState } from 'react'
import AddTask from './components/AddTodo'
import { getAllTodos } from './service'
import TodoList from './components/TodoList'
import { ITodo, ITodoContext } from './types'
export const TodoContext = createContext<ITodoContext | undefined>(undefined)

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getAllTodos()
      setTodos(data)
    }
    fetchTodos()
  }, [])

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <main className="h-dvh max-w-80 w-full mx-auto flex flex-col items-center justify-center">
        <h1 className="font-bold text-xl text-center mb-4">Mashonka Todo's</h1>
        <AddTask />
        <TodoList todos={todos} />
      </main>
    </TodoContext.Provider>
  )
}
