import { ChangeEventHandler, FC, memo, useState } from "react";
import { Icon } from "../Icon";
import { TodoItemProps } from "./types";
import { useCustomizables, useTodos } from "../../context";
import { Select } from "../Select";
import { inputCn } from "../CreateTodoForm/constants";
import { TodoStatus } from "./TodoStatus";

const TodoItemComponent: FC<TodoItemProps> = ({
  id,
  name,
  status,
  priority,
  description,
}) => {
  const handleDelete = () => deleteTodo(id);
  const [editing, setEditing] = useState(false);
  const { deleteTodo, updateStatus, updatePriority } = useTodos();
  const { status: allStatus, priorities: allPriorities } = useCustomizables();

  const toggleEditing = () => setEditing((prev) => !prev);

  const buildChangeHandler = (
    options = allStatus,
    update = updateStatus
  ): ChangeEventHandler<HTMLSelectElement> => {
    return (event) => {
      const { value } = event.target;
      const matchStatus = options.find(({ id }) => id === value);

      if (matchStatus) {
        update(id, matchStatus);
      }
    };
  };

  return (
    <li className="grid grid-cols-12 grid-rows-2 gap-2 w-full items-center border-b-2 border-yellow-300 pb-3">
      <h3 className="col-span-9 font-bold flex gap-2 items-center line-clamp-3">
        {priority.icon && (
          <Icon
            name={priority.icon}
            className="h-5 w-5"
            color={priority.color}
          />
        )}
        {name}
      </h3>
      <div className="col-span-3 flex gap-2 justify-end">
        {editing ? (
          <button
            type="button"
            onClick={toggleEditing}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-green-600 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            <Icon name="AiFillCheckCircle" />
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={toggleEditing}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-sky-600 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              <Icon name="AiFillEdit" />
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-rose-600 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            >
              <Icon name="AiFillDelete" />
            </button>
          </>
        )}
      </div>
      {editing ? (
        <>
          <Select
            label="Prioridad"
            className={inputCn}
            selected={priority.id}
            options={allPriorities}
            lblClassName="col-span-12 md:col-span-6"
            onChange={buildChangeHandler(allPriorities, updatePriority)}
          />
          <Select
            label="Estado"
            className={inputCn}
            options={allStatus}
            selected={status.id}
            onChange={buildChangeHandler()}
            lblClassName="col-span-12 md:col-span-6"
          />
        </>
      ) : (
        <TodoStatus current={status} className="col-span-12" />
      )}
      {description && <p className="col-span-12">{description}</p>}
    </li>
  );
};

export const TodoItem = memo(TodoItemComponent);
