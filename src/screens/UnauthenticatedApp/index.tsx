import { useState } from "react"
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp = () => {
    const [IsRegister, setIsRegister] = useState(false);

    return (
        <div>
            { IsRegister ? <RegisterScreen/> : <LoginScreen/> }
            <button onClick={() => setIsRegister(!IsRegister)}>
                切换到{IsRegister ? "登录" : "注册"}
            </button>
        </div>
    )
}