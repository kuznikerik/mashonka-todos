import { useContext } from 'react'
import Todo from './Todo'
import { TodoContext } from '../context/TodoContext'

export default function TodoList() {
  const context = useContext(TodoContext)

  if (!context) {
    throw new Error('useContext must be used within a TodoContext.Provider')
  }

  const { todos } = context

  const completedTodoItems = todos
    .filter((todo) => todo.completed === true)
    .map((todo) => (
      <Todo
        key={todo.id}
        todo={todo}
        isCompleted={true}
      />
    ))

  const todoItems = todos
    .filter((todo) => todo.completed === false)
    .map((todo) => (
      <Todo
        key={todo.id}
        todo={todo}
        isCompleted={false}
      />
    ))

  return (
    <>
      <>
        {!!todoItems.length && <div className="w-full">{todoItems}</div>}

        {!!completedTodoItems.length && (
          <div className="w-full border-t border-solid dark:border-neutral-content dark:border-opacity-20 pt-2 mt-2">
            {completedTodoItems}
          </div>
        )}
      </>
    </>
  )
}
