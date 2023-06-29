import clsx from "clsx";
import { FC } from "react";
import { TodoStatusProps } from "./types";
import { useCustomizables } from "../../context";

export const TodoStatus: FC<TodoStatusProps> = ({ className, current }) => {
  const { status } = useCustomizables();

  return (
    <ul className={clsx("flex gap-2", className)}>
      {status?.map((s, index) => (
        <li key={s.id}>
          <span
            className={clsx(
              "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset  ring-gray-500/10",
              s.id === current.id ? `text-white` : "bg-gray-50 text-gray-600"
            )}
            style={{
              backgroundColor: s.id === current.id ? s.color : undefined,
            }}
          >
            {s.name}
          </span>
          {index !== status.length - 1 && " > "}
        </li>
      ))}
    </ul>
  );
};
