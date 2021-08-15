import { Table } from 'antd'
import { User } from 'screens/ProjectList/SearchPanel'

interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
}

interface ListProps {
    list: Project[],
    users: User[]
}

export const List = ({list, users}: ListProps) => {
    return <Table rowKey={"id"} pagination={false} columns={[{
        title: '名称',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name) // localCompare可以排序中文字符
    }, {
        title: '负责人',
        render: (value, project) => <span>{users.find(user => user.id === project.personId)?.name || '未知'}</span>
    }]} dataSource={list} />
    // return (
    //     <table>
    //         <thead>
    //             <tr>
    //                 <td>项目名称</td>
    //                 <td>负责人</td>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {list.map(project => (<tr key={project.id}>
    //                 <td>{project.name}</td>
    //                 <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
    //             </tr>))}
    //         </tbody>
    //     </table>
    // )
}