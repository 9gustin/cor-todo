import { Todo } from "../../types";

export type TodoItemProps = Omit<Todo, "createdAt">;
