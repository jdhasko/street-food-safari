import { useEffect, useState } from "react";

/**
 * Debounces a value, returning the debounced value after the delay
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 350)
 * @returns The debounced value
 */
function useDebounce<T>(value: T, delay: number = 350): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
