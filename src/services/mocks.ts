import { Customizable } from "../types";

export const mockStatus: Customizable[] = [
  {
    id: "new",
    name: "Nueva",
    orderPriority: 1,
    color: "#e66317",
    pluralName: "Nuevas",
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
    pluralName: "Finalizadas",
  },
];

export const mockPriorities: Customizable[] = [
  {
    id: "low",
    name: "Baja",
    orderPriority: 3,
    color: "#32a852",
    icon: "AiFillCaretDown",
  },
  {
    id: "medium",
    name: "Media",
    orderPriority: 2,
    color: "#ad8821",
    icon: "AiOutlinePicCenter",
  },
  {
    id: "high",
    name: "Alta",
    orderPriority: 1,
    color: "#eb2f2f",
    icon: "AiFillCaretUp",
  },
];
