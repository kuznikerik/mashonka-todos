'use client'

import { FormEvent, useContext, useRef, useState } from 'react'
import { TodoContext } from '../context/TodoContext'
import { ITodo } from '../types'

export default function AddTodo() {
  const context = useContext(TodoContext)
  const [inputValue, setInputValue] = useState('')
  const [authorInputValue, setAuthorInputValue] = useState('')
  const modalRef = useRef<HTMLDialogElement>(null)

  if (!context) {
    throw new Error('useContext must be used within a TodoContext.Provider')
  }

  const { setTodos } = context

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget?.value)
  }

  const handleAuthorInputChange = (e: FormEvent<HTMLInputElement>) => {
    setAuthorInputValue(e.currentTarget?.value)
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      if (!inputValue && !authorInputValue) {
        return console.log('All fields are required')
      }

      const newTodo = {
        id: crypto.randomUUID(),
        text: inputValue,
        completed: false,
        author: authorInputValue,
      }

      await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      })
      setTodos((prevTodos: ITodo[]) => [newTodo, ...prevTodos])

      modalRef.current?.close()
      setInputValue('')
    }
  }

  return (
    <div className="max-w-80 w-full flex justify-center items-center mb-4">
      <button
        className="btn w-full"
        onClick={() => modalRef.current?.showModal()}
      >
        Add new todo
      </button>
      <dialog
        ref={modalRef}
        className="modal"
      >
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg pr-8 mb-4">Add new todo</h3>
          <label htmlFor="add-todo"></label>
          <input
            id="add-todo"
            type="text"
            placeholder="Enter a title..."
            className="input input-bordered w-full mb-4"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <label htmlFor="todo-author"></label>
          <input
            id="todo-author"
            type="text"
            placeholder="Enter your name..."
            className="input input-bordered w-full"
            value={authorInputValue}
            onChange={handleAuthorInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}
