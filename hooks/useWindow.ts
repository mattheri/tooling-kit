import { useEffect, useState } from "react";

const useWindow = () => {
  const [w, setW] = useState<(Window & typeof globalThis) | null>(null);

  useEffect(() => {
    setW(window);
  }, []);

  return w;
};

export default useWindow;
