import { SearchPanel } from "screens/ProjectList/SearchPanel"
import { List } from "screens/ProjectList/List"
import { useState, useEffect } from "react"
import * as qs from "qs"
import { cleanObject, useDebounce } from "utils";

const apiURL = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    
    // 状态提升
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });
    const [users, setUsers] = useState([]);
    const [list, setList] = useState([]);
    const [debouncedParam] = useDebounce(param);

    // 初始化 users，等效于ComponentDidMount
    useEffect(() => {
        fetch(`${apiURL}/users`).then(async response => {
            if(response.ok) {
                setUsers(await response.json());
            }
        })
    }, [])

    useEffect(() => {
        fetch(`${apiURL}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
            if(response.ok) {
                setList(await response.json());
            }
        })
    }, [debouncedParam])

    return (
        <div className="container" id="ProjectList" >
            <SearchPanel param={param} setParam={setParam} users={users} />
            <List list={list} users={users} />
        </div>
    )
}