## vue-admin-permission

项目基于 vue-cli3.0 进行搭建，并使用了 vue 全家桶 vue vuex axios vue-router elementui，增加了按钮级别的权限控制

### <a target="_blank" href="http://www.vueadmin.cn">线上预览地址</a>

### <a target="_blank" href="https://github.com/loveRandy/react-admin">React 版本请移步</a>

#### 脚手架版本:

\*vue-cli-3.0

#### 用到 vue 相关的生态链模块:

-   `vue`
-   `vue-router`
-   `vuex`
-   `axios`

#### 项目要点

-   `路由懒加载`
-   `根据权限生成动态路由`
-   `全局数据请求拦截处理及loading`
-   `多个代理配置`
-   `抽离第三方库文件dll`

### 项目启动步骤

1. 安装包（这里需要使用 npm 进行安装，如果用 cnpm 或者 yarn 会有热更新失效的问题）
   npm install
2. 开发运行
   npm run serve:randy
3. 生产打包
   npm run dll (仅需运行一次)
   npm run build

#### 项目分析

npm run analyze

#### 温馨提示

在新增 vue 页面的时候，热更新可能会失效，重启一下项目
