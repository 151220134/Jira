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

## 技术栈

- React17
- React Hook
- Typescript4
- Redux Toolkit 管理客户端全局状态
- React Query 管理服务端全局状态
- 性能优化、性能监控、性能报告
- 自动化测试
- CSS-in-JS/Grid/Flexbox
- React Router 6

### ToDo

- [ ] 乐观更新
- [ ] 埋点上报
- [ ] [pwa](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)

## 开发日志

2021-08-10

- 初始化项目
  `npx create-react-app jira --template typescript` 注意代理可能会导致初始化失败
  ~~`npm WARN @babel/plugin-bugfix-v8-spread-parameters-in-optional-chaining@7.14.5 requires a peer of @babel/core@^7.13.0 but none is installed. You must install peer dependencies yourself.`~~

  [无须再手动引入 React](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)

- 配置
  - 配置绝对路径：`"baseUrl": "./src"`
  - 配置格式化：[Prettier](https://prettier.io/docs/en/install.html)
  - 配置[commitlint](https://github.com/conventional-changelog/commitlint)：`['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test'];`
  - 配置[json-server](https://github.com/typicode/json-server)
