import { useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);

export const cleanObject = (obj) => {
  const result = { ...obj }; // Object.assgin({}, obj)
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useDebounce = (value, delay) => {
  // 设置内部状态用来暂存value实现延迟效果
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 一旦value发生变化，就会设置定时器，定时器结束后更新debouncedValue值
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 清除effect的同时调用clearTimeout清除定时器
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
