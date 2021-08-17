import { User } from "screens/ProjectList/SearchPanel";

const localStorageKey = "__auth_provider_token__";

const apiURL = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const register = (data: { username: string; password: string }) => {
  // fetch 返回一个Promise对象
  return fetch(`${apiURL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      // 注册成功，更新localStorage中的token，返回User类型的当前用户信息
      return handleUserResponse(await response.json());
    } else {
      // 注册失败，返回Promise
      return Promise.reject(await response.json());
    }
  });
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// 为什么logout这么写：https://coding.imooc.com/learn/questiondetail/V2104YQJ5ZrXmxQw.html
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
