import { ChangeEventHandler } from "react";
import { Customizable } from "../../types";

export interface SelectProps {
  label: string;
  className?: string;
  isLoading?: boolean;
  isRequired?: boolean;
  options?: Customizable[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}
