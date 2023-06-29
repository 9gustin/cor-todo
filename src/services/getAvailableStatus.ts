import { mockStatus } from "./mocks";
import { Customizable } from "../types";

export const getAvailableStatus = (): Promise<Customizable[]> => {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(mockStatus), 500);
  });
};
