import { Customizable } from "../types";

export const getAvailablePriorities = (): Promise<Customizable[]> => {
  return new Promise(function (resolve) {
    setTimeout(
      () =>
        resolve([
          {
            id: 'low',
            name: "Baja",
            orderPriority: 1,
            color: "#32a852",
            icon: 'AiFillCaretDown',
          },
          {
            id: 'medium',
            name: "Media",
            orderPriority: 2,
            color: "#ad8821",
            icon: 'AiOutlinePicCenter',
          },
          {
            id: 'high',
            name: "Alta",
            orderPriority: 3,
            color: "#eb2f2f",
            icon: 'AiFillCaretUp',
          },
        ]),
      500
    );
  });
};
