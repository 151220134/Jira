import { SearchPanel } from "screens/ProjectList/SearchPanel"
import { List } from "screens/ProjectList/List"
import { useState, useEffect } from "react"
import { cleanObject, useDebounce } from "utils";
import { useHttp } from "utils/http";

export const ProjectListScreen = () => {
    
    // 状态提升
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);
    const debouncedParam = useDebounce(param);
    const client = useHttp();

    // 初始化 users，等效于ComponentDidMount
    useEffect(() => {
        client('users').then(setUsers)
        // fetch(`${apiURL}/users`).then(async response => {
        //     if(response.ok) {
        //         setUsers(await response.json());
        //     }
        // })
    }, [])

    useEffect(() => {
        client('projects', {data: cleanObject(debouncedParam)}).then(setList)
        // fetch(`${apiURL}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
        //     if(response.ok) {
        //         setList(await response.json());
        //     }
        // })
    }, [debouncedParam])

    return (
        <div className="container" id="ProjectList" >
            <SearchPanel param={param} setParam={setParam} users={users} />
            <List list={list} users={users} />
        </div>
    )
}