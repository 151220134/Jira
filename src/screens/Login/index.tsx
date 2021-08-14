import { FormEvent } from "react"
import { useAuth } from "screens/Context/AuthContext";

export const LoginScreen = () => {

    const {user, login, register} = useAuth()

    // FormEvent 是泛型类型
    // HTMLFormElement extends Element 鸭子类型只看接口
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // as HTMLFormElement 是类型断言，Element上没有value属性
        const username = (e.currentTarget.elements[0] as HTMLFormElement).value;
        const password = (e.currentTarget.elements[1] as HTMLFormElement).value;
        login({username, password});
        // register({username, password});
    }
     
    return (
    <form onSubmit={handleSubmit}>
        {user?<div>登录成功，用户名：{user?.name}</div>: null}
        <div>
            <label htmlFor="username">用户名</label>
            <input type="text" id={"username"}/>
        </div>
        <div>
            <label htmlFor="password">密码</label>
            <input type="password" id={"password"}/>
        </div>
        <button type={'submit'}>登录</button>
    </form>)
}