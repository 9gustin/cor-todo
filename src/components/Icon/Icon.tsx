import { FC } from "react";
import { IconProps, iconList } from "./types";

export const Icon: FC<IconProps> = ({ name, color, className }) => {
  const IconComponent = iconList[name];
  return <IconComponent className={className} color={color} />;
};
