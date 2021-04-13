import { useEffect, useRef } from 'react';

export function usePrevious<T extends any>(value: T, initialValue?: T) {
  const ref = useRef(initialValue);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
