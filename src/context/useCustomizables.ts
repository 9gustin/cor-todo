import { create } from "zustand";
import { getAvailablePriorities, getAvailableStatus } from "../services";
import { Customizable } from "../types";

interface CustomizablesContext {
  status: Customizable[];
  priorities: Customizable[];
  loadData: () => Promise<void>;
}

export const useCustomizables = create<CustomizablesContext>((set) => ({
  status: [],
  priorities: [],
  loadData: async () => {
    const status = await getAvailableStatus();
    const priorities = await getAvailablePriorities();
    set({ status, priorities });
  },
}));
