import { FormEvent } from "react"

const apiURL = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {

    const login = (param:{username: string, password: string}) => {
        fetch(`${apiURL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param),
        }).then(async response => {
            if(response.ok) {

            }
        })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = (e.currentTarget.elements[0] as HTMLFormElement).value;
        const password = (e.currentTarget.elements[1] as HTMLFormElement).value;
        login({username, password});
    }
     
    return (<form onSubmit={handleSubmit}>
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