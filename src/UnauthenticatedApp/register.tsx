import { useAuth } from "context/AuthContext";
import { Form, Input } from "antd"
import { LongButton } from "UnauthenticatedApp";
import { useAsync } from "utils/useAsync";

export const RegisterScreen = ({onError}:{onError:(error:Error)=>void}) => {

    const {register} = useAuth()
    const {run, isLoading} = useAsync(undefined, {throwOnError: true});

    // FormEvent 是泛型类型
    // HTMLFormElement extends Element 鸭子类型只看接口
    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     // as HTMLFormElement 是类型断言，Element上没有value属性
    //     const username = (e.currentTarget.elements[0] as HTMLFormElement).value;
    //     const password = (e.currentTarget.elements[1] as HTMLFormElement).value;
    //     register({username, password});
    // }
     
    // values中的属性名由Form.Item的name属性决定
    const handleFinish = async ({cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
        if(cpassword!==values.password) {
            onError(new Error('请确认两次输入的密码相同'))
            return
        }
        await run(register(values)).catch(onError)
    }

    return (
        <Form onFinish={handleFinish}
    // onSubmit={handleSubmit}
    >
        <Form.Item name={"username"} rules={[{required: true, message: "请输入用户名"}]}>
            <Input placeholder="用户名" type="text" id={"username"}/>
        </Form.Item>
        <Form.Item name={"password"} rules={[{required: true, message: "请输入密码"}]}>
            <Input placeholder="密码" type="text" id={"password"}/>
        </Form.Item>
        <Form.Item name={"cpassword"} rules={[{required: true, message: "请确认密码"}]}>
            <Input placeholder="确认密码" type="text" id={"cpassword"}/>
        </Form.Item>
        <Form.Item>
            <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>注册</LongButton>
        </Form.Item>
    </Form>)
}