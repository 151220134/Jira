import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/AuthContext";

const apiURL = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
      ...headers,
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiURL}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json(); // 别漏了这句
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

// useHttp的作用是用闭包的原理返回一个回调函数，参数是传入这个回调函数的
// 好处是对使用者屏蔽user
// 自动给http请求加上token
export const useHttp = () => {
  const { user } = useAuth();
  // utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
