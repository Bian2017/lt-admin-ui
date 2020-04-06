/**
 * 自定义hook： 函数防抖
 */
import { useState, useEffect } from 'react';

function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 清除副作用，在下次update的时候会先执行该函数
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
