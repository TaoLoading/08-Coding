# 数据持久化

## cookie

### 使用

```js
// 设置 cookie
document.cookie = 'username=John Doe; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/'

// 获取 cookies
const cookies = document.cookie

// 删除 cookie
document.cookie = 'username=John Doe; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/'
```

### 部分属性

1. expires：过期时间
2. path：指定 cookie 应该发送到服务器的 URL 路径
3. domain：指定了哪些域名下的请求包含这个 cookie
4. secure：secure 是一个标记，指示 cookie 只应通过安全的 HTTPS 连接发送到服务器。例如 `document.cookie = 'user=John Doe; secure; path=/'`

## localStorage/sessionStorage

### 使用

```js
// 设置数据
localStorage.setItem('key', 'value')

// 获取数据
let value = localStorage.getItem('key')

// 删除数据
localStorage.removeItem('key')

// 清除所有数据
localStorage.clear()
```

## localStorage/sessionStorage/cookie 之间的区别

1. 作用范围
   1. localStorage、cookie：数据在同一浏览器且同一域名下的所有页面之间共享
   2. sessionStorage：每个页面都有独立的 sessionStorage 空间，同一浏览器且同一域名下页面的 sessionStorage 不共享
2. 存储量
   1. localStorage、sessionStorage：存储空间较大，与浏览器相关，一般是 5-10 兆
   2. cookie：存储空间较小，与浏览器相关，一般是 4KB
3. 存储时效
   1. localStorage：除非手动删除，否则永久存在
   2. sessionStorage：仅在会话期间存在，会话结束后（窗口或标签页关闭）会被销毁
   3. cookie：可设置过期时间，自定义销毁时间

## indexedDB

### 介绍

indexedDB 是一种在浏览器中存储大量结构化数据的 API，允许创建、读取、修改和删除存储在用户的浏览器中的数据库。主要具有以下特征：

1. 大容量存储：相比于 localStorage，indexedDB 提供了更大的存储空间
2. 异步操作：IndexedDB 操作是异步的，不会阻塞浏览器
3. 支持事务：操作是基于事务的，可以执行复杂的读写操作，并保证数据完整性
4. 索引和查询：可以为对象仓库中的数据创建索引，这使得查询更加高效
5. 版本控制：当数据库结构变更时，可以通过版本控制轻松管理数据迁移

### 核心概念

1. 对象仓库：类似关系数据库中的表，是数据存储的主要单位。每个对象仓库可以存储大量数据项
2. 索引：于快速检索对象仓库中的数据，可以根据一个或多个属性创建
3. 事务：所有的读写操作都需要在事务的上下文中进行，确保数据的一致性和完整性

### 使用

```js
// 打开数据库
let openRequest = indexedDB.open('myDatabase', 1)

// 创建或升级数据库
openRequest.onupgradeneeded = function (event) {
  // 获取数据库实例
  let db = openRequest.result

  // 检查是否已存在名为 'books' 的对象仓库，如果没有，则创建它
  if (!db.objectStoreNames.contains('books')) {
    db.createObjectStore('books', { keyPath: 'id' })
  }
}

// 打开数据库成功
openRequest.onsuccess = function (event) {
  let db = openRequest.result
  // 可以在此处进行后续操作
}

// 打开数据库失败
openRequest.onerror = function (event) {
  console.error('Error opening database:', event.target.errorCode)
}

// 创建事务并获取对象仓库
let transaction = db.transaction('books', 'readwrite')

// 事务成功
transaction.oncomplete = function (event) {
}

// 事务失败
transaction.onerror = function (event) {
}

// 获取 'books' 对象仓库
let store = transaction.objectStore('books')

// 添加数据到对象仓库
let book = { id: 1, title: 'Quidditch Through the Ages', author: 'Kennilworthy Whisp' }
store.add(book)

// 从对象仓库中读取数据
let getRequest = store.get(1)
getRequest.onsuccess = function (event) {
  console.log('Book:', getRequest.result)
}

// 在对象仓库中创建索引
store.createIndex('by_title', 'title', { unique: true })

// 使用索引进行数据查询
let index = store.index('by_title')
let query = index.get('Quidditch Through the Ages')
query.onsuccess = function (event) {
  console.log('Found book:', query.result)
}

// 关闭数据库
db.close()
```
