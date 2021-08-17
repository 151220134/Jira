import { ReactNode, useContext, useEffect, useState } from "react";
import * as auth from "auth-provider";
import React from "react";
import { User } from 'screens/ProjectList/SearchPanel'
import { http } from "utils/http";
import { useAsync } from "utils/useAsync";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

interface AuthForm {
    username: string,
    password: string
}

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if(token) {
        const data = await http('me', {token});
        user = data.user;
    }
    return user;
}

const AuthContext = React.createContext<{
    user: User|null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>
}|undefined>(undefined);
AuthContext.displayName = "AuthContext";

// 在根节点上用AuthProvider，类似Context.Provider
export const AuthProvider = ({children}: {children: ReactNode}) => {
    // auth-provider负责维护token信息，AuthContext负责维护user信息
    // <User|null> 是联合类型，可能取User也可能取null
    // const [user, setUser] = useState<User|null>(null);
    const {data: user, error, isLoading, isIdle, isError, run, setData: setUser} = useAsync<User|null>()

    // 调用auth-provider中写好的三个函数更新localStorage中的token，再更新user
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    // 在页面加载之后，取localStorage中读token，带着token请求对应用户信息user
    useEffect(() => {
        // 初始化user
        run(bootstrapUser())
    }, [])

    if(isIdle||isLoading) {
        return <FullPageLoading />
    }

    if(isError) {
        return <FullPageErrorFallback error={error} />
    }

    // value中给出user值和可以引发user值变化的方法，但不能直接setUser
    return <AuthContext.Provider children={children} value={{user, register, login, logout}}/>
}

// 在子节点上用useAuth，读取Context
// 封装的好处：https://coding.imooc.com/learn/questiondetail/jlqGx6zEj1RXe1Dk.html
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth必须在AuthProvider中使用")
    }
    return context
}