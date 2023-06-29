import { TodoItem } from "./TodoItem";
import { TodoFilters } from "./TodoFilters";
import { SectionTitle } from "../SectionTitle";
import { useFilteredTodos } from "../../hooks";

export const TodoList = () => {
  const { todos, orderBy, toggleFilter, hasFilters, isFilteredBy } =
    useFilteredTodos();
  console.warn("todos", todos);

  return (
    <>
      <SectionTitle>Mis tareas</SectionTitle>
      {todos.length || hasFilters ? (
        <TodoFilters
          orderBy={orderBy}
          toggleFilter={toggleFilter}
          isFilteredBy={isFilteredBy}
        />
      ) : null}
      {todos.length ? (
        <>
          <ul className="flex flex-col gap-6 my-6" data-testid="all-tasks">
            {todos.map(({ name, description, id, status, priority }) => (
              <TodoItem
                id={id}
                key={id}
                name={name}
                status={status}
                priority={priority}
                description={description}
              />
            ))}
          </ul>
        </>
      ) : (
        <p className="text-center text-gray-400 py-6">
          {hasFilters
            ? "No hay tareas que coincidan con la busqueda"
            : "No hay tareas"}
        </p>
      )}
    </>
  );
};
