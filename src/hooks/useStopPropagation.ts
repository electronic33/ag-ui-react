import { useCallback } from "react";

const useStopPropagation = () => {
  const stopPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return stopPropagation;
};

export default useStopPropagation;
