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

  - 配置[commitlint](https://github.com/conventional-changelog/commitlint)

    ```
    # 主要type
    feat:     增加新功能
    fix:      修复bug

    # 特殊type
    docs:     只改动了文档相关的内容
    style:    不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
    build:    构造工具的或者外部依赖的改动，例如webpack，npm
    refactor: 代码重构时使用
    revert:   执行git revert打印的message

    # 暂不使用type
    test:     添加测试或者修改现有测试
    perf:     提高性能的改动
    ci:       与CI（持续集成服务）有关的改动
    chore:    不修改src或者test的其余修改，例如构建过程或辅助工具的变动
    ```

  - 配置[json-server](https://github.com/typicode/json-server)

2021-08-11

- 项目列表页面
  - 包含组件：搜索框`<input>`、下拉框`<select>`、列表`<table>`
  - 写一个 JS 组件先写状态：`useState`
  - 状态提升：state 放在父组件里，通过 props 传给子组件，使子组件可以共享状态
  - 请求项目列表的接口：`useEffect`+[fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)
  - 配置 URL 地址：`process.env.REACT_APP_API_URL`
    - `npm start`读`.env.development`文件中的环境变量
    - `npm run build`读`.env`文件中的环境变量
  - 可选链`?.`安全地读取/删除 e.g.`obj?.prop` | `obj?.[prop]` | `obj.method?.()`
  - 列表组件的每一项元素都要有一个独特的`key`
  - `/src/utils`存放工具函数 e.g.`isFalsy()`
  - `npm install qs -D`自动转化为 url 参数的工具
  - 自定义 Hook：
    - ~~`useMount`~~不要在开发中使用
    - `useDebounce`防抖，每次回调都重新开始计时

2021-08-12

- Typescript 基本知识梳理

  - 强类型

  - [数据类型](https://www.notion.so/4-3-TypeScript-08f52ad87f7540e781144d7688452f39)
    - function：声明参数和返回值的类型
    - void：函数不返回任何值或者返回 undefined
    - tuple：数量固定、混合类型的数组
    - any：不做任何类型检查
    - unknown：严格版 any，但不能赋给其它任何值，也不能读取任何方法
  - `interface`：声明一个自定义类型
  - 联合类型`|`：取多种类型之一

  - 交叉类型`&`：从两个对象中创建一个新对象，新对象拥有着两个对象所有的功能

  - 类型别名：`type SomeName = someValidTypeAnnotation`

    e.g. `type StrOrNum = string | number;`

  - `.d.ts`：js 文件 + .d.ts 文件 === ts 文件

  - [类型推断](https://jkchao.github.io/typescript-book-chinese/typings/typeInference.html#%E7%B1%BB%E5%9E%8B%E6%8E%A8%E6%96%AD)

  - [泛型](https://typescript.bootcss.com/generics.html)：相当于是声明函数时留下占位符，使用函数时给占位符填入具体类型

    ```typescript
    // 泛型类型
    interface GenericIdentityFn<T> {
      (arg: T): T;
    }
    // 泛型函数
    function identity<T>(arg: T): T {
      return arg;
    }
    // 使用泛型类型时要传入类型参数
    let myIdentity: GenericIdentityFn<number> = identity;
    ```

2021-08-13

- 登录/注册页面
  - json-server 中间件：模拟非 RESTful 的 API
  - 鸭子类型：面向接口编程，而不是面向对象编程
  - 模拟后端数据库的工具[jira-dev-tool](https://www.npmjs.com/package/jira-dev-tool)：[Service Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)
- Auth
  - [JWT](https://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)：`Header.Payload.Signature`，服务器无状态；使用 JWT 实现[Auth](https://vertxchina.github.io/vertx-translation-chinese/auth/JWTAuth.html)
  - 在 React 中使用[Context](http://www.ptbird.cn/react-createContex-useContext.html)：全局存储用户信息
    1. 创建 context：`const MyContext = React.createContext(defaultValue)`
    2. 父组件提供 value：`<MyContext.Provider value={{xx:xx}}>`
    3. 子组件获取 context：`const {funcName} = useContext(MyContext);`
  - `AuthProvider`：已经封装好 value 值，直接在根节点上使用 AuthProvider 即可
  - `useAuth`：在`useContext`的基础上[封装一层](https://coding.imooc.com/learn/questiondetail/jlqGx6zEj1RXe1Dk.html)，避免在所有需要使用 context 的组件中导入具体的 context（即上面 3.中 MyContext），直接调用 useAuth()即可

2021-08-14

- 登录/非登录状态
  - 结合 useAuth 实现登录与非登录状态之间的切换
-
