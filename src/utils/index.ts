import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "" || value === [];

export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj }; // Object.assgin({}, obj)
  Object.keys(result).forEach((key) => {
    const value = result[key];
    // isFalsy会把false判断为true导致对应属性被删除，不符合预期
    if (isVoid(value)) {
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

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = useRef(document.title).current;
  // 页面加载时: 旧title
  // 加载后：新title

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖，读到的就是旧title
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);
