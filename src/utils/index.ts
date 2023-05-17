import { useEffect } from "react";

export function useDebouncedEffect(fn: Function, deps: any[], time: number) {
  const dependencies = [...deps, fn, time];
  useEffect(() => {
    const timeout = setTimeout(fn, time);
    return () => {
      clearTimeout(timeout);
    };
  }, dependencies);
}
