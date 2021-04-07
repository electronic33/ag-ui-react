import { useCallback } from 'react';

export const useStopPropagation = () => {
  const stopPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return stopPropagation;
};
