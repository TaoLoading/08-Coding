# 前端安全

## XSS（跨站脚本攻击）

### 定义

XSS 攻击是指攻击者通过在网页中注入恶意脚本，当用户浏览该页时，嵌入其中的脚本会被执行，从而实现攻击目的

### 防范措施

1. **内容安全策略（CSP）**：CSP 是一个额外的安全层，用于通过定义哪些类型的资源（如脚本、样式表、图片等）可以从哪里加载，减少 XSS 攻击的风险
2. **沙盒化预览**：使用`<iframe>`标签的`sandbox`属性可以为预览创建一个沙盒环境。这样，即使用户输入了恶意脚本，它也无法访问父页面的 DOM 或执行某些关键操作
3. **输出编码**：在输出数据到浏览器时，对其进行编码，以确保不会被解释为脚本

## CSRF（跨站请求伪造）

### 定义

攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的

### 防范措施

1. **使用 Token**：在表单或者用户的会话中加入一个随机产生的 token，只有知道这个 token 的请求才会被服务器接受
2. **检查 Referer 头**：验证请求是否来自合法的源
