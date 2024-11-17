'use client'

import { FormEvent, useContext, useRef, useState } from 'react'
import { TodoContext } from '../page'
import { addTodo } from '../service'
import { ITodo } from '../types'

export default function AddTodo() {
  const context = useContext(TodoContext)
  const [inputValue, setInputValue] = useState('')
  const modalRef = useRef<HTMLDialogElement>(null)

  if (!context) {
    throw new Error('useContext must be used within a TodoContext.Provider')
  }

  const { setTodos } = context

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget?.value)
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      if (!inputValue) {
        return console.log('No text')
      }

      const newTodo = {
        id: crypto.randomUUID(),
        text: inputValue,
        completed: false,
      }
      await addTodo(newTodo)
      setTodos((prevTodos: ITodo[]) => [...prevTodos, newTodo])

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
            className="input input-bordered w-full"
            value={inputValue}
            onChange={handleInputChange}
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
