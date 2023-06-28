import * as allAvailableIcons from "react-icons/ai";

export type IconNameType = keyof typeof allAvailableIcons;

export interface IconProps {
  color?: string;
  className?: string;
  name: IconNameType;
}

export const iconList = allAvailableIcons;