import { Button, Card } from "antd";
import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp = () => {
  const [IsRegister, setIsRegister] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {IsRegister ? <RegisterScreen /> : <LoginScreen />}
        <Button type='default' onClick={() => setIsRegister(!IsRegister)}>
          切换到{IsRegister ? "登录" : "注册"}
        </Button>
      </Card>
    </div>
  );
};
