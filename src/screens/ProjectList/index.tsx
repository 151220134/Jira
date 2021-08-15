import { SearchPanel } from "screens/ProjectList/SearchPanel"
import { List } from "screens/ProjectList/List"
import { useState, useEffect } from "react"
import { cleanObject, useDebounce } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

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
    }, [])

    useEffect(() => {
        client('projects', {data: cleanObject(debouncedParam)}).then(setList)
    }, [debouncedParam])

    return (
        <Container id="ProjectList" >
            <h2>项目列表</h2>
            <SearchPanel param={param} setParam={setParam} users={users} />
            <List list={list} users={users} />
        </Container>
    )
}

const Container = styled.div`
padding: 3.2rem;
`