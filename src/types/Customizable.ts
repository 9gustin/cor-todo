import type { IconNameType } from "../components";

export interface Customizable {
  id: string;
  name: string;
  color: string;
  pluralName?: string;
  icon?: IconNameType;
  orderPriority: number;
}
