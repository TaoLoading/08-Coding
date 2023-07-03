# hash 路由和 history 路由

## 区别

1. hash 路由：使用 URL 中的哈希部分（#）来表示路由状态
2. history 路由：使用 HTML5 History API 提供的 `pushState` 和 `replaceState` 方法来修改 URL，而不使用哈希部分

## 实现原理

1. hash 路由：通过监听浏览器的 `hashchange` 事件，当 URL 的哈希部分发生变化时，执行相应的回调函数来更新页面
2. history 路由：通过监听 `popstate` 事件，获取 URL 的变化，使用 HTML5 History API 提供的 `pushState` 和 `replaceState` 方法来更新页面

## 优缺点

1. hash 路由：具有更好的兼容性，但 URL 不友好
2. history 路由：兼容性较差，需要配置服务器，但提供了更友好的 URL

## 问题

1. history 路由下点击任意一个路由后刷新页面出现 404

   1. 原因

      1. 在 SPA 中，所有的路由都应该指向同一个 HTML 文件，由前端的路由逻辑来处理页面变化
      2. hash 路由：点击任意一个路由后刷新页面不会出现 404，因为虽然刷新页面时路径为 `http://localhost:8080/#/xxx`，但请求服务器的路径为 `http://localhost:8080`，返回 index.html，浏览器通过解析后就会得到路由解析代码，然后将 `/#/xxx` 作为前台路由路径解析，显示出对应的界面
      3. history 路由：因为刷新页面时路径为  `http://localhost:8080/xxx`，同时 history 模式下会将这个路径请求服务器，也就是将本来应该作为前台路由路径的 `/xxx` 作为后台路由路径发送给了服务器，服务器没有对应的资源，于是出现 404

   2. 解决

      1. 解决思路：确保无论用户请求的是哪个路由，服务器都返回同一个 HTML 文件

      2. 解决办法：

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

            

