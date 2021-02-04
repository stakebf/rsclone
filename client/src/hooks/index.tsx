import { useState, useEffect, useRef, useCallback } from "react";

export function useUpgradeState(init: any, initFlag = false) {
  const [state, setState] = useState(init);
  const flag = useRef(initFlag);

  useEffect(() => (): any => (flag.current = false), []);

  const setUpState = useCallback(
    (newState) => flag.current && setState(newState),
    [setState]
  );

  return [state, setUpState];
}
