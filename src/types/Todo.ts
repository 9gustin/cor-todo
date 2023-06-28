import { Customizable } from "./Customizable";

export interface Todo {
  id: string;
  name: string;
  createdAt: Date;
  description?: string;
  status: Customizable;
  priority: Customizable;
}

export type CreateTodo = Omit<Todo, "id" | "createdAt">;
