import { Customizable, Todo } from "../../types";
import { FilterByFn, Filters, IsFilterByFn, OrderByFn } from "../../hooks";

export type TodoItemProps = Omit<Todo, "createdAt">;

export interface TodoStatusProps {
  className?: string;
  current: Todo["status"];
}

export interface TodoFiltersProps {
  className?: string;
  orderBy: OrderByFn;
  toggleFilter: FilterByFn;
  isFilteredBy: IsFilterByFn;
}

export type CustomOptions = Array<Customizable & { key: Filters }>;
