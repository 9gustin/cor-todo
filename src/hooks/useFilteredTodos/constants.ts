import type { AvailableKeys, Filters, FiltersState } from "./types";

export const SHOW_ALL = "SHOW_ALL";

export const availableOrderKeys: AvailableKeys[] = ["priority", "status"];
export const availableFilters: Filters[] = [...availableOrderKeys, SHOW_ALL];

export const ensureFilterIsValid = (key: Filters) => {
  if (!availableFilters.includes(key)) {
    throw {
      key,
      message: `Invalid filter key. Available filters are: ${availableFilters.join(
        ", "
      )}`,
    };
  }
};

export const initialFilters: FiltersState = {
  orderBy: "priority",
  filterBy: SHOW_ALL,
};
