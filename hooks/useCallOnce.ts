import { useEffect, useRef } from "react";

type Callback = (...args: any[]) => any;

type UseCallOnceHook = (callback: Callback) => void;

const useCallOnce: UseCallOnceHook = (callback) => {
  const ref = useRef(0);

  useEffect(() => {
    if (ref.current === 0) {
      ref.current = 1;

      callback();
    }
  }, [ref.current, callback]);
};

export default useCallOnce;
