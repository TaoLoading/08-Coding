# ref 和 reactive 的区别

1. 定义响应式数据：ref 可以处理所有类型的值；reactive 只能处理对象类型。当 ref 中接收的是对象类型的值时，其内部依然使用 reactive 实现响应式
2. 读取响应式数据：在 js 中，读取 ref 返回的响应式数据需要加上`.value`；读取 reactive 返回的响应式数据则不需要加
3. 解构响应式数据：解构 ref 返回的响应式数据时返回的数据依然是响应式的；reactive 解构出来的数据不是响应式的
4. 实现原理：ref 内部封装一个 RefImpl 类，并设置`get value/set value`，拦截用户对值的访问，从而实现响应式；reactive 内部使用 Proxy 代理传入对象并拦截该对象各种操作（trap），从而实现响应式
