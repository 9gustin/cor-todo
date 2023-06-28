import { FC } from "react";
import { Icon } from "../Icon";
import { TodoItemProps } from "./types";
import { useTodos } from "../../context";
import { TodoStatus } from "./TodoStatus";

export const TodoItem: FC<TodoItemProps> = ({
  id,
  name,
  status,
  priority,
  description,
}) => {
  const { deleteTodo } = useTodos();
  const handleDelete = () => deleteTodo(id);

  return (
    <li className="grid grid-cols-12 grid-rows-2 gap-2 w-full items-center border-b-2 border-yellow-300 pb-3">
      {priority.icon && (
        <Icon
          name={priority.icon}
          className="col-span-1 h-5 w-5"
          color={priority.color}
        />
      )}
      <h3 className="col-span-9 font-bold">{name}</h3>
      <button
        type="button"
        onClick={handleDelete}
        className="w-10 h-10 flex items-center justify-center rounded-md bg-rose-600 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
      >
        <Icon name="AiFillDelete" />
      </button>
      <TodoStatus id={id} current={status} className="col-span-12" />
      {description && <p className="col-span-12">{description}</p>}
    </li>
  );
};
