export type AvailableKeys = "priority" | "status";
export type Filters = AvailableKeys | "SHOW_ALL";

export type OrderByFn = (key: AvailableKeys) => void;
export type FilterByFn = (key: Filters, expectedId?: string) => void;
export type IsFilterByFn = (key?: Filters, expectedId?: string) => boolean;

export interface FiltersState {
  orderBy: AvailableKeys;
  filterBy: 'SHOW_ALL' | Array<[AvailableKeys, string]>;
}
