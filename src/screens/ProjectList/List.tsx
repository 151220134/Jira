import { Table, TableProps } from "antd";
import { User } from "screens/ProjectList/SearchPanel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/Pin";
import { useEditProject } from "utils/project";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project>{
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const {mutate} = useEditProject();
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true}/>,
          render: (value,project) => {
            return <Pin checked={project.pin} onCheckedChange={pin => {
              mutate({id: project.id, pin})
            }} />
          }
        },
        {
          title: "名称",
          // dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name), // localCompare可以排序中文字符
          render: (value, project) => {
            return <Link to={String(project.id)}>{project.name}</Link>
          }
        },
        {
            title: "部门",
            dataIndex: "organization"
        },
        {
          title: "负责人",
          render: (value, project) => (
            <span>
              {users.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </span>
          ),
        },
        {
            title: "创建时间",
            render: (value, project) => {
                return <span>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD') : "无"}
                </span>
            }
        }
      ]}
      {...props}
    />
  );
};
