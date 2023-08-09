# Axios 取消请求

## 步骤

1. 发请求时携带取消令牌
2. 在需要取消时（如路由离开时 beforeRouteLeave）调用方法取消所有携带取消令牌的请求

## 用法

```js
const source = axios.CancelToken.source()

axios.get('/api/a', {
  // 取消令牌
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('请求已取消', thrown.message)
  }
})

axios.get('/api/b', {
  // 取消令牌
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('请求已取消', thrown.message)
  }
})

// 取消请求
source.cancel()
```

