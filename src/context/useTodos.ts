import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { CreateTodo, Todo } from "../types";

export interface TodosContext {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  addTodo: (todo: CreateTodo) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
}

export const useTodos = create<TodosContext>((set) => ({
  todos: [],
  deleteTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  addTodo: (todo) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          ...todo,
          id: uuidv4(),
          createdAt: new Date(),
        },
      ],
    })),
  updateTodo: (id, todo) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? { ...t, ...todo } : t)),
    })),
}));
