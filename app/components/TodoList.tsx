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
      {todos.length ? (
        <>
          <div className="w-full border-b border-solid dark:border-neutral-content dark:border-opacity-20 pb-2 mb-2">
            {todoItems.length ? (
              todoItems
            ) : (
              <p className="mb-2 font-bold">All done!</p>
            )}
          </div>
          <div className="w-full">
            {completedTodoItems.length ? (
              completedTodoItems
            ) : (
              <p className="mt-2 font-bold">
                None completed, man get yo&apos; ass up!
              </p>
            )}
          </div>
        </>
      ) : (
        <div>List is empty</div>
      )}
    </>
  )
}
