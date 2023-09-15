# hash 路由和 history 路由

## 区别

1. hash 路由：使用 URL 中的哈希部分（#）来表示路由状态
2. history 路由：使用 HTML5 History API 提供的 `pushState` 和 `replaceState` 方法来修改 URL，而不使用哈希部分

## 实现思路

1. hash 路由
   1. 对跳转链接设置为 `#xxx`，实现点击链接时修改 hash 值
   2. 监听浏览器的 `hashchange` 事件，当 hash 值发生变化时渲染对应的页面
2. history 路由
   1. 对跳转链接设置为 `/xxx`，实现点击链接时修改路由部分
   2. 对每个链接增加点击事件，点击时阻止其默认事件并使用 `pushState` 修改历史记录
   3. 监听浏览器的 `popstate` 事件，当历史记录发生变化时渲染对应的页面
   4. **注意**：history.pushState() 和 history.replaceState() 并不会触发 popstate 事件，而是在由 history.pushState() 或者 history.replaceState() 形成的历史节点中前进后退触发


## 优缺点

1. hash 路由：具有更好的兼容性，但 URL 不友好
2. history 路由：兼容性较差，需要配置服务器，但提供了更友好的 URL

## 问题

### history 路由下点击任意一个路由后刷新页面出现 404

1. 原因

   1. 在 SPA 中，所有的路由都应该指向同一个 HTML 文件，由前端的路由逻辑来处理页面变化
   2. hash 路由：点击任意一个路由后刷新页面不会出现 404，因为虽然刷新页面时路径为 `http://localhost:8080/#/xxx`，但请求服务器的路径为 `http://localhost:8080`，返回 index.html，浏览器通过解析后就会得到路由解析代码，然后将 `/#/xxx` 作为前台路由路径解析，显示出对应的界面
   3. history 路由：因为刷新页面时路径为  `http://localhost:8080/xxx`，同时 history 模式下会将这个路径请求服务器，也就是将本来应该作为前台路由路径的 `/xxx` 作为后台路由路径发送给了服务器，服务器没有对应的资源，于是出现 404

2. 解决

   1. 解决思路：确保无论用户请求的是哪个路由，服务器都返回同一个 HTML 文件

   2. 解决办法

      1. 方法一：配置 nginx

         ```
         location / {
         	try_files $uri $uri/ /index.html;
         }
         ```

      2. 方法二：配置 webpack

         ```
         const path = require('path')
         
         module.exports = {
           // ...其他配置
           output: {
             // ...其他配置
             publicPath: '/'
           },
           devServer: {
             historyApiFallback: true
           },
         }
         ```
