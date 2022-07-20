# vite-react-antd-temp

使用 vite 搭建的 react antd pc demo，采用了最新的 react18，仅供学习交流

### 使用

```bash
yarn

yarn start

yarn build
```

### 开发步骤

1. 在 src/pages 中新建页面组件
2. 在 src/router/menus.tsx 中注册页面组件
3. 开始业务代码编写
4. 打包部署

### 环境变量

```bash
# 打包输出文件夹
out_dir=vite-pc
# 调试时开启
soucemap=false
# 部署的根路径，不写则为[/],此示例为[/foo/]
deploy_path=foo
# 打包成es6形式，可选es5兼容老浏览器
es_target=es6
# 严格模式，开启的话会导致useEffect执行两次
strict_mode=false
# 根路径，用于初始化重定向、404根返回
root_path=home
```

### 注意事项

- 简易数据流
  - 在src/model/modelsRegister.ts中注册model
  - ```js
    // 使用第二个函数参数进行性能优化，只有标记的属性改变才触发渲染
    const { mount } = useModel('useGlobalModel', (modal) => ({ mount: modal.mount }));
    ```

- 部署二级目录
  - 修改.env文件的deploy_path **或在** package.json 中增加命令：<br>
    &nbsp;&nbsp;&nbsp;&nbsp;例如："buildme": "cross-env deploy_path=h5 vite build"
  - 项目中使用到跳转或根路径的地方，需增加前缀 ```__APP_DEPLOY__```

### 已完成特性

- [√] 集成 umi 的简易数据流，代替redux
- [√] es5 打包
- [√] ts、prettier 格式化
- [√] less 模块、px2view、styled-components、 styled-components2vw
- [√] 非根目录部署
- [√] 简易示例页面
- [√] 国际化配置
- [√] 简单请求封装

### 待完成

### 遗留问题

- [less 模块命名问题](https://juejin.cn/post/7047309460322123806)，暂时建议模块化css文件名都加上 ```.module.```
- 页面返回的处理
