import { FC } from "react";
import { Label } from "../Label/Label";
import { SelectProps } from "./types";

export const Select: FC<SelectProps> = ({
  label,
  options,
  onChange,
  selected,
  isLoading,
  className,
  isRequired,
  lblClassName,
}) => {
  return (
    <Label name={label} isRequired={isRequired} className={lblClassName}>
      {isLoading ? (
        <div className="bg-gray-300 h-10 rounded-md w-full" />
      ) : (
        <select
          onChange={onChange}
          className={className}
          defaultValue={selected}
        >
          {options?.map(({ id, name }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </select>
      )}
    </Label>
  );
};
