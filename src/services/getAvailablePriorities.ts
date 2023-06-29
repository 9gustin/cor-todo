import { Customizable } from "../types";
import { mockPriorities } from "./mocks";

export const getAvailablePriorities = (): Promise<Customizable[]> => {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(mockPriorities), 500);
  });
};
