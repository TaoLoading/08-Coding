# Array Set Map 的区别

## Array

1. Array 中的元素可重复
2. Array 中的元素是有序的，可以通过索引访问
3. 适用于通过索引访问和修改元素的场景

## Set

1. Set 中的元素唯一，会自动过滤重复项
2. Array 中的元素是无序的，不可通过索引访问
3. add() 添加、has() 查询、delete() 删除、clear() 全部清空
4. 适用于去重和快速检查元素是否存在的场景

## Map

1. Map 类似 Object，不过是以键值对的形式存储数据，其中 key 可以是任意类型
2. set() 添加键值对、has() 查询键是否存在、get() 获取值、size() 获取键值对数量、delete() 删除、clear() 全部清空
3. 适用于需要存储和查询键值对，且键不仅限于字符串的场景