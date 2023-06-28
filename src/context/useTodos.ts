import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { CreateTodo, Customizable, Todo } from "../types";

export interface TodosContext {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  addTodo: (todo: CreateTodo) => void;
  updateStatus: (id: string, status: Customizable) => void;
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
  updateStatus: (id, status) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, status } : todo
      ),
    })),
}));
