import { useQuery } from "react-query";
import { getAvailablePriorities, getAvailableStatus } from "../services";

export const useCustomizables = () => {
  const { data: status, isLoading: isLoadingStatus } = useQuery(
    "status",
    getAvailableStatus
  );
  const { data: priorities, isLoading: isLoadingPriorities } = useQuery(
    "priorities",
    getAvailablePriorities
  );

  return {
    status,
    priorities,
    isLoading: isLoadingStatus || isLoadingPriorities,
  };
};
