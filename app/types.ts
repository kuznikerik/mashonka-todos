export interface ITodo {
  id: string,
  text: string,
  completed: boolean,
  author: string
}

export interface ITodoContext {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

export interface ITodoListProps {
  todos: ITodo[];
}

export interface ITodoProps {
  todo: ITodo,
  isCompleted: boolean
}