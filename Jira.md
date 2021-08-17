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
  - `.d.ts`：js 文件 + .d.ts 文件 === ts 文件
  - [类型推断](https://jkchao.github.io/typescript-book-chinese/typings/typeInference.html#%E7%B1%BB%E5%9E%8B%E6%8E%A8%E6%96%AD)

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
  - `useAuth`：在`useContext`的基础上[封装一层](https://coding.imooc.com/learn/questiondetail/jlqGx6zEj1RXe1Dk.html)，避免在所有需要使用 context 的组件中导入具体的 context（即上面 3.中 MyContext），直接调用 useAuth()即可取到当前用户 user 的值

2021-08-14

- 登录/非登录状态
  - 结合 useAuth 实现登录与非登录状态之间的切换
- 抽象 HTTP 请求
  - 改造 http 方法：可以兼容
  - `useHttp`：给（通过 fetch 发出）的 http 请求带上 token
- 保持登录状态
  - `bootstrapUser`：在页面加载之后，取 localStorage 中读 token，带着 token 请求对应用户信息 user
  - 实际效果：在登录状态下刷新页面，会先闪一下非登录状态，再转成登录状态
- Typescript 高级类型

  - 联合类型`|`：取多种类型中的一个
  - 交叉类型`&`：具有多种类型的所有属性
  - `interface`：定义对象的类型
  - 类型别名：不会新建一个类型，`type SomeName = someValidTypeAnnotation` e.g. `type StrOrNum = string | number;`
  - [泛型](https://typescript.bootcss.com/generics.html)：相当于是声明时留下占位符，使用时给占位符填入具体类型，常用的有泛型函数、泛型接口、泛型类型

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

  - 类型保护

    - `typeof`
    - `instanceof`
    - `in`
    - `keyof`

  - [Utility Types](https://segmentfault.com/a/1190000018726280#item-5-18)（常用）

    - `Partial<T>`：T 的所有属性均为可选
    - `Required<T>`：T 的所有属性均为必选
    - `Pick<T, K>`：从 T 中选出 K 属性，可以使用联合类型来选择多个字段
    - `Omit<T, K>`：从 T 中忽略 K 属性
    - `Extract<T, U>`：从 T 中提取 U 子集
    - `Exclude<T, U>`：从 T 中排除 U
    - `Paramters`：该类型可以获得函数的参数类型组成的元组类型

2021-08-15

- [AntDesign](https://ant.design/index-cn)

  - [在 create-react-app 中使用](https://ant.design/docs/react/use-with-create-react-app-cn)
  - [antd 组件](https://ant.design/components/overview-cn/)替换原生组件

- CSS-in-JS：[Emotion](https://emotion.sh/docs/introduction)

  - css Prop
  - [Styled Components](https://curlywater.github.io/blog/f2e/css/emotion/#styled-components)：`import styled from '@emotion/styled'`

- Grid 布局

  - [圣杯布局](https://www.digitalocean.com/community/tutorials/css-css-grid-holy-grail-layout)

- Flex 布局

  - [圣杯布局](https://philipwalton.github.io/solved-by-flexbox/demos/holy-grail/)

- grid 和 flex 各自的应用场景 1. 是一维布局还是二维布局？一维布局用 flex，二维布局用 grid 2. 是从内容出发还是从布局出发？

  从内容出发：先有一组内容(数量一般不固定)，然后希望他们**均匀分布**在容器中，由内容自己的大小决定占据的空间，用 flex

  从布局出发：先规划**网格**(数量一般比较固定)，然后再把元素往里填充，用 grid

- 优化各个页面的布局

  - 安装[dayjs](https://www.npmjs.com/package/dayjs)

- 清除 warning

  - 因为 Function 对象、RegExp 对象会被作为 Object 类型，但不能被展开语法作用，所以在声明类型是要用`{[key: string]: unknown}`
  - 用`<Button type={"link"}>`代替`<a>`标签
  - useEffect 依赖：`// eslint-disable-next-line react-hooks/exhaustive-deps`
  - 安装 react-query

2021-08-16

- 加载中 loading 和错误 error 状态处理
  - `useAsync`：储存异步请求的状态，可以包裹于所有的异步请求，e.g. users 接口、projects 接口、me 接口
  - `useUsers`和`useProjects`：多抽象一层，把 useAsync 返回的信息封装在这两个自定义 hook 内部
- Event Loop
- [Error Boundaries](https://zh-hans.reactjs.org/docs/error-boundaries.html)：如果在渲染阶段出现异常，整个组件树都会被卸载
- `type PropsWithChildren<P> = P & { children?: ReactNode | undefined };`
- `static getDerivedStateFromError(error: Error) `
