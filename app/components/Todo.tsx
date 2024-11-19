import React, { FormEvent, useContext, useRef, useState } from 'react'
import { TodoContext } from '../context/TodoContext'
import { ITodo, ITodoProps } from '../types'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function Todo({ todo }: ITodoProps) {
  const context = useContext(TodoContext)
  const [inputValue, setInputValue] = useState(todo.text)
  const [checkboxValue, setCheckboxValue] = useState(todo.completed)
  const modalRef = useRef<HTMLDialogElement>(null)

  if (!context) {
    throw new Error('useContext must be used within a TodoContext.Provider')
  }

  const { setTodos } = context

  const handleOpenModal = () => {
    setInputValue(todo.text)
    modalRef.current?.showModal()
  }

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget?.value)
  }

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()

      if (!inputValue) {
        return console.log('No text')
      }

      const editedTodo = {
        id: todo.id,
        text: inputValue,
        completed: todo.completed,
        author: todo.author,
      }
      await fetch('/api/edit', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedTodo),
      })
      setTodos((prevTodos: ITodo[]) =>
        prevTodos.map((todo) =>
          todo.id === editedTodo.id ? editedTodo : todo,
        ),
      )

      modalRef.current?.close()
      setInputValue('')
    }
  }

  const handleDelete = async () => {
    await fetch('/api', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })
    setTodos((prevTodos: ITodo[]) => prevTodos.filter((t) => t.id !== todo.id))
  }

  const handleCheckboxChange = async (e: FormEvent<HTMLInputElement>) => {
    setCheckboxValue(e.currentTarget?.checked)
    const checkedTodo = {
      id: todo.id,
      text: todo.text,
      completed: e.currentTarget.checked,
      author: todo.author,
    }
    await fetch('/api/complete', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(checkedTodo),
    })
    setTodos((prevTodos: ITodo[]) =>
      prevTodos.map((todo) =>
        todo.id === checkedTodo.id ? checkedTodo : todo,
      ),
    )
  }

  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex-grow flex flex-col">
        <p className="m-0 truncate">{todo.text}</p>
        <p className="m-0 text-xs">
          <span className="text-neutral-content opacity-20">Added by:</span>
          &nbsp;
          <span className="text-neutral-content opacity-40">{todo.author}</span>
        </p>
      </div>
      <button onClick={handleOpenModal}>
        <PencilIcon className="size-6 ml-auto" />
      </button>
      <button onClick={handleDelete}>
        <TrashIcon className="size-6" />
      </button>
      <input
        type="checkbox"
        className="checkbox"
        checked={checkboxValue}
        onChange={handleCheckboxChange}
      />

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
          <h3 className="font-bold text-lg pr-8 mb-4">{`Edit '${todo.text}' todo`}</h3>
          <label htmlFor="edit-todo"></label>
          <input
            id="edit-todo"
            type="text"
            placeholder="Edit the todo..."
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
