import { Button } from "antd";
import { useAuth } from "Context/AuthContext"
import { ProjectListScreen } from "screens/ProjectList";

export const AuthenticatedApp = () => {
    const {logout} = useAuth();
    return (<div>
        <Button onClick={logout} type={'primary'}>登出</Button>
        <ProjectListScreen/>
    </div>)
}