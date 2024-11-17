import { ITodoListProps } from '../types'
import Todo from './Todo'

export default function TodoList({ todos }: ITodoListProps) {
  const todoItems = todos.map((todo) => (
    <Todo
      key={todo.id}
      todo={todo}
    />
  ))
  return <div className="w-full">{todoItems}</div>
}
