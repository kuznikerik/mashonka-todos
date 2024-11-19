'use client'
import { useEffect, useState } from 'react'
import AddTask from './components/AddTodo'
import TodoList from './components/TodoList'
import { ITodo } from './types'
import { TodoContext } from './context/TodoContext'

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api')

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }

        const result = await response.json()
        setTodos(result)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTodos()
  }, [])

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <main className="h-dvh max-w-80 w-full mx-auto flex flex-col items-center justify-center">
        <h1 className="font-bold text-xl text-center mb-6">Mashonka Todos</h1>
        <AddTask />
        <TodoList />
      </main>
    </TodoContext.Provider>
  )
}
