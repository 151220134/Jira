import { SearchPanel } from "screens/ProjectList/SearchPanel";
import { List } from "screens/ProjectList/List";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/users";
import { Typography } from "antd";

export const ProjectListScreen = () => {
  // 状态提升
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();
  
  useDocumentTitle('项目列表', false);

  return (
    <Container id="ProjectList">
      <h2>项目列表</h2>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
