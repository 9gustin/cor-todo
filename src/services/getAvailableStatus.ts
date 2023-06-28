import { Customizable } from "../types";

export const getAvailableStatus = (): Promise<Customizable[]> => {
  return new Promise(function (resolve) {
    setTimeout(
      () =>
        resolve([
          {
            id: "new",
            name: "Nueva",
            orderPriority: 1,
            color: "#e66317",
          },
          {
            id: "in-progress",
            orderPriority: 2,
            color: "#1790e6",
            name: "En proceso",
          },
          {
            id: "finished",
            orderPriority: 3,
            color: "#1cba1f",
            name: "Finalizada",
          },
        ]),
      500
    );
  });
};
