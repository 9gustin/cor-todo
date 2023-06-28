import { TodoItem } from "./TodoItem";
import { useTodos } from "../../context";
import { SectionTitle } from "../SectionTitle";

export const TodoList = () => {
  const { todos } = useTodos();

  return (
    <>
      <SectionTitle>Mis tareas</SectionTitle>
      {todos.length ? (
        <ul className="flex flex-col gap-6 my-6">
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
      ) : (
        <p className="text-center text-gray-400">No hay tareas creadas</p>
      )}
    </>
  );
};
