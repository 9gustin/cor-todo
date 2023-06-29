import { useCallback, useMemo, useState } from "react";
import { useTodos } from "../../context";
import { FilterByFn, OrderByFn, IsFilterByFn } from "./types";
import { SHOW_ALL, ensureFilterIsValid, initialFilters } from "./constants";

export const useFilteredTodos = () => {
  const { todos: allTodos } = useTodos();
  const [filters, setFilters] = useState(initialFilters);

  const orderBy: OrderByFn = (key) => {
    ensureFilterIsValid(key);

    setFilters((prevFilters) => ({
      ...prevFilters,
      orderBy: key,
    }));
  };

  const toggleFilter: FilterByFn = (key, expectedId) => {
    ensureFilterIsValid(key);

    if (key === SHOW_ALL || !expectedId) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        filterBy: SHOW_ALL,
      }));
      return;
    }

    if (!Array.isArray(filters.filterBy)) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        filterBy: [[key, expectedId]],
      }));
      return;
    }

    let currentFilter = filters.filterBy;
    const alreadyHasFilter = currentFilter.some(
      ([key, value]) => key === key && value === expectedId
    );

    if (alreadyHasFilter) {
      currentFilter = currentFilter.filter(
        ([key, value]) => key !== key || value !== expectedId
      );
    } else {
      currentFilter = [...currentFilter, [key, expectedId]];
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      filterBy: currentFilter.length ? currentFilter : SHOW_ALL,
    }));
  };

  const todos = useMemo(() => {
    const { orderBy, filterBy } = filters;

    const filteredTodos =
      filterBy === SHOW_ALL || filterBy.length === 0
        ? allTodos
        : allTodos.filter((todo) => {
            return filterBy.some(([key, value]) => {
              return todo[key].id === value;
            });
          });

    return filteredTodos.sort((a, b) => {
      return a[orderBy].orderPriority - b[orderBy].orderPriority;
    });
  }, [allTodos, filters]);

  const isFilteredBy: IsFilterByFn = useCallback(
    (key = SHOW_ALL, expectedId) => {
      if (filters.filterBy === SHOW_ALL || !Array.isArray(filters.filterBy)) {
        return key === SHOW_ALL;
      }

      return filters.filterBy.some(
        ([key, value]) => key === key && value === expectedId
      );
    },
    [filters.filterBy]
  );

  const hasFilters = useMemo(() => {
    return (
      allTodos.length > 0 &&
      filters.filterBy.length > 0 &&
      filters.filterBy !== SHOW_ALL &&
      Array.isArray(filters.filterBy)
    );
  }, [allTodos.length, filters.filterBy]);

  return {
    todos,
    orderBy,
    hasFilters,
    isFilteredBy,
    toggleFilter,
  };
};
