import { Todo } from "../../types";

export type TodoItemProps = Omit<Todo, "createdAt">;

export interface TodoStatusProps {
  id: Todo['id'];
  className?: string;
  current: Todo['status'];
}