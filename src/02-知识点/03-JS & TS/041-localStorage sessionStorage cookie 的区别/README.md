# localStorage sessionStorage cookie 的区别

1. 作用范围
   * localStorage、cookie：数据在同一浏览器且同一域名下的所有页面之间共享
   * sessionStorage：每个页面都有独立的 sessionStorage 空间，同一浏览器且同一域名下页面的 sessionStorage 不共享
2. 存储量
   * localStorage、sessionStorage：存储空间较大，与浏览器相关，一般是几兆
   * cookie：存储空间较小，与浏览器相关，一般是几千字节
3. 存储时效
   * localStorage：除非手动删除，否则永久存在
   * sessionStorage：仅在会话期间存在，会话结束后（窗口或标签页关闭）会被销毁
   * cookie：可设置过期时间，自定义销毁时间
