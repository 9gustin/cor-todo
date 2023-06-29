import {
  Filters,
  SHOW_ALL,
  AvailableKeys,
  availableOrderKeys,
} from "../../hooks";
import clsx from "clsx";
import { ordersLabels } from "./constants";
import { useCustomizables } from "../../context";
import { ChangeEventHandler, FC, useMemo } from "react";
import { CustomOptions, TodoFiltersProps } from "./types";

export const TodoFilters: FC<TodoFiltersProps> = ({
  orderBy,
  className,
  toggleFilter,
  isFilteredBy,
}) => {
  const { status, priorities } = useCustomizables();

  const options: CustomOptions = useMemo(() => {
    return [
      ...status.map(({ ...rest }) => {
        return {
          ...rest,
          key: "status" as Filters,
        };
      }),
      ...priorities.map(({ name, ...rest }) => {
        return {
          ...rest,
          key: "priority" as Filters,
          name: `Prioridad ${name}`,
        };
      }),
    ];
  }, [status, priorities]);

  const orderHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { value } = event.target;
    orderBy(value as AvailableKeys);
  };

  const buildFilterBy =
    (key: Filters = "status", value?: string) =>
    () => {
      toggleFilter(key, value);
    };

  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-700">Ordenar por</label>
        <select
          onChange={orderHandler}
          className="border border-gray-50 rounded-md px-4 py-2"
        >
          {availableOrderKeys.map((key) => (
            <option key={key} value={key}>
              {ordersLabels[key]}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 flex flex-wrap">
        <label className="w-full text-xs font-bold text-gray-700">Mostrar</label>
        <button
          onClick={buildFilterBy(SHOW_ALL)}
          className={clsx(
            "w-fit inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset  ring-gray-500/10",
            isFilteredBy()
              ? `text-white bg-indigo-500`
              : "bg-gray-50 text-gray-600"
          )}
        >
          Todas
        </button>
        {options?.map(({ key, id, color, name }) => {
          const current = isFilteredBy(key, id);
          return (
            <button
              onClick={buildFilterBy(key, id)}
              className={clsx(
                "w-fit inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset  ring-gray-500/10",
                current ? `text-white` : "bg-gray-50 text-gray-600"
              )}
              style={{
                backgroundColor: current ? color : undefined,
              }}
            >
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
