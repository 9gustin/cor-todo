export type AvailableFields = "status" | "name" | "description" | "priority";

export type CreateTodoFormData = Record<AvailableFields, string>;

export interface CreateTodoFormProps {
  className?: string;
}
