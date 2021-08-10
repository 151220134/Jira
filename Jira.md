# Jira

## 功能

- JWT 登录注册
- 项目列表
- 项目详情
- 项目编辑删除
- 任务列表
- 任务排序
- 看板列表
- 看板排序

### ToDo

- [ ] 乐观更新
- [ ] 埋点上报
- [ ] pwa

## 开发日志

2021-08-10

- 初始化项目
  `npx create-react-app jira --template typescript` 注意代理可能会导致初始化失败
  ~~`npm WARN @babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining@7.14.5 requires a peer of @babel/core@^7.13.0 but none is installed. You must install peer dependencies yourself.`~~
- 配置
  - 配置绝对路径：`"baseUrl": "./src"`
  - 配置格式化：[Prettier](https://prettier.io/docs/en/install.html)
  - 配置[commitlint](https://github.com/conventional-changelog/commitlint)
