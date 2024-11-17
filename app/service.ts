import { ITodo } from './types'

const baseUrl = "http://localhost:3001"

export const getAllTodos = async (): Promise<ITodo[]> => {
  try {
    const response = await fetch(`${baseUrl}/todos`, { cache: "no-store" });
    const todos = await response.json();
    return todos;
  } catch (error) {
    throw error
  }
};

export const addTodo = async (todo: ITodo): Promise<void> => {
  try {
    await fetch(`${baseUrl}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
  } catch (error) {
    throw error
  }
}

export const editTodo = async (todo: ITodo): Promise<ITodo> => {
  try {
    const response = await fetch(`${baseUrl}/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const updatedTodo = await response.json();
    return updatedTodo;
  } catch (error) {
    throw error
  }
};

export const deleteTodo = async (todo: ITodo): Promise<void> => {
  try {
    await fetch(`${baseUrl}/todos/${todo.id}`, {
      method: "DELETE",
    });
  } catch (error) {
    throw error;
  }
};