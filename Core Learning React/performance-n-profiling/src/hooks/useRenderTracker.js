import { useRef, useEffect } from "react";

export function useRenderTracker(name) {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`${name} render count:`, renderCount.current);
  });
};