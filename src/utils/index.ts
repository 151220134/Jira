import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (obj: object) => {
  const result = { ...obj }; // Object.assgin({}, obj)
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useDebounce = <V>(value: V, delay?: number): V => {
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

export const useArray = <T>(initArray: T[]) => {
  // 自定义Hook中存储数据要借助useState
  const [value, setValue] = useState(initArray);

  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      // 在数组的拷贝上进行修改操作
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
