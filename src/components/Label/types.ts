import { PropsWithChildren } from "react";

export type LabelProps = PropsWithChildren<{
  name: string;
  hasError?: boolean;
  className?: string;
  isRequired?: boolean;
}>;
