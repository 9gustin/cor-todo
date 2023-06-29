import { ChangeEventHandler } from "react";
import { Customizable } from "../../types";

export interface SelectProps {
  label: string;
  className?: string;
  isLoading?: boolean;
  isRequired?: boolean;
  lblClassName?: string;
  options?: Customizable[];
  selected?: Customizable['id'];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}
