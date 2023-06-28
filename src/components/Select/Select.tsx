import { FC } from "react";
import { Label } from "../Label/Label";
import { SelectProps } from "./types";

export const Select: FC<SelectProps> = ({
  label,
  options,
  onChange,
  isLoading,
  className,
  isRequired,
}) => {
  return (
    <Label name={label} isRequired={isRequired}>
      {isLoading ? (
        <div className="bg-gray-300 h-10 rounded-md w-full" />
      ) : (
        <select className={className} onChange={onChange}>
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
