import { useCallback, useState } from 'react';

export const useToggle = (initialState: boolean) => {
  const [toggle, setToggle] = useState(initialState);

  const onToggle = useCallback(() => {
    setToggle((prevState) => !prevState);
  }, []);

  return [toggle, onToggle];
};
