# 本项目用webpack react react-router redux antd-design
# 打包npm run build 
# 启动 npm start
# 1. cnpm i webpack webpack-cli -D
# 2. 新建 src/index.js
# 3. cnpm i react react-dom react-router react-router-dom -S
# 4. cnpm i @babel/core @babel/preset-env babel-loader -D, 根目录下新建.babelrc "presets":["@babel/preset-env","@babel/react"],
# 5. 新建 /webpack.config.js 配置规则 plugins
# 6. 新建 src/index.html 根节点
# 7. 写入react组件,打包尝试
# 8. cnpm webpack-dev-server 启动项目
# 9. 跑起来项目配置路由 用 BrowserRouter的话要后端配置,本地的话可以在webpack.config.js中
       devServer:{
        historyApiFallback:true
    }
# 10. cnpm i redux react-redux -S
# 11. index.js 里引入 Provider 包裹组件注入stroe
# 12. 新建src/store/* 创建store, reducer 和action,组件里用的时候 引入connect 和bindActionCreator 方法链接
# 13. cnpm i antd  babel-import-plugin -D, .babelrc 文件里添加["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
