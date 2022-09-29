# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# 注意

### 留给有缘人；业务需求跟样式由具体项目决定，刨除业务代码，模板只集成一个相对完善的环境；达成相同功能目的有不同的实现方式，有用则参考，无用则引以为鉴；表达有不清晰的地方，见谅
### 在不暴露react-create-app的情况下修改配置
`yarn add react-app-rewired customize-cra`(强迫症带个-D)， 引入 react-app-rewired 跟 customize-cra，react-app-rewired用来接管指令，如package.json里改写为`react-app-rewired start`
customize-cra用来覆盖原本的webpack配置，详见根目录config-overrides.js,这里像vue一样给文件目录加了别名

### 关于路由
react-router-dom v6移除了对location，params等的支持，也就是说，要在组件内访问此类参数必须要使用钩子useLocation，useParams，但问题是钩子函数不能再类组件里使用，也不能再高阶函数里使用，实践可行的方案如下：
1、以组合的形式，在顶层组件下插入专门用于处理路由跳转的组件，定义见'@/components/event'，使用见`@/routers/index.js`,触发借助事件系统。注意纯函数组件开发环境下会执行多次，需要做好兼容。
2、用纯函数组件包裹类组件传参的方式，见组件`@/views/fourth/index`
3、路由权限有两种形式（跟vue一样）：全量渲染，导向的时候判断拦截重定向；根据权限动态渲染，匹配不到自动走默认路由。这里用的是动态渲染，因为去除业务代码可能看起来不太完善。一般思路是：
没登录，只显示没有权限的路由
有登录，显示对应权限的路由
涉及异步的时候，用标识字段在render里判断渲染（生命周期并不能影响到render执行，定义为异步不能阻塞渲染，所以判断只能在render里做）

### 关于全局状态
redux被作者认为已经过时，并且推荐使用@reduxjs/toolkit替代，相比之下新版的少了很多样板代码，但修改状态时还是不仅要引入定义的对象，dispatch时必须传入定义时的action方法，否则无效，定义见`@/stores/token`,应用见`@/layout/nav`

### 关于css预处理
需要用node-sass就直接安装node-sass；用dirt-sass就直接安装sass。react-create-app自动对其进行处理，不用做其他配置。安装sass，原因不用说。

### 关于多环境
默认的配置不支持多个生产环境打包，故安装`dotenv-cli`,更改package.json指令如`"build:prod": "dotenv -e .env.prod react-app-rewired build"`,指令详见package.json，环境见项目根目录，其实作用就是构建或运行时，根据环境文件覆盖其环境变量