import { FC, PropsWithChildren } from "react";

export const SectionTitle: FC<PropsWithChildren<object>> = ({ children }) => (
  <h2 className="text-xl font-bold underline decoration-yellow-300 my-6">
    {children}
  </h2>
);
