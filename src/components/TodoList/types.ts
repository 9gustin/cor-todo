import { Todo } from "../../types";

export type TodoItemProps = Omit<Todo, "createdAt">;

export interface TodoStatusProps {
  className?: string;
  current: Todo['status'];
}