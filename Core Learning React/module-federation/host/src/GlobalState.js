import { useEffect, useState } from "react";

export const useGlobalState = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handler = (e) => {
      setCount((prev) => prev + e.detail);
    };
    window.addEventListener("increment", handler);
    return () => window.removeEventListener("increment", handler);
  }, []);
  return { count };
};