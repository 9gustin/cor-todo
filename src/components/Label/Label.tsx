import clsx from "clsx";
import { FC } from "react";
import { LabelProps } from "./types";

export const Label: FC<LabelProps> = ({
  name,
  children,
  hasError,
  isRequired,
}) => {
  return (
    <label className="block">
      <span
        className={clsx(
          "after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700",
          isRequired && "after:content-['*']"
        )}
      >
        {name}
      </span>
      {children}
      {hasError && (
        <span className="text-red-500 text-sm">Campo requerido</span>
      )}
    </label>
  );
};
