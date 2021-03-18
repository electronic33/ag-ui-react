import { useCallback, useState } from "react";

const useForceRenderHook = () => {
  const [_dummyState, setDummyState] = useState(false);

  const forceRender = useCallback(() => {
    setDummyState((prevState) => !prevState);
  }, []);

  return forceRender;
};

export default useForceRenderHook;
