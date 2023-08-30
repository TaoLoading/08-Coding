# 涉及正则的方法

## 创建正则的方法

RegExp 构造函数：用于创建一个正则表达式对象

```js
const regex = new RegExp(pattern)
```

## 校验正则的方法

1. test()：检测字符串中是否存在匹配的内容，返回布尔值

   ```js
   const isMatch = regex.test(str)
   ```

2. exec()：在字符串中查找匹配的内容，并返回一个包含匹配信息的数组

   ```js
   const matchArray = regex.exec(str)
   ```

## 字符串相关方法

1. match()：在字符串中查找匹配的内容，并返回一个包含匹配信息的数组

   ```js
   const result = str.match(regex)
   ```

2. search()：在字符串中查找匹配的内容，并返回第一个匹配的索引

   ```js
   const index = str.search(regex)
   ```

3. replace()：在字符串中查找匹配的内容，将匹配到的内容替换为指定内容，并返回新的字符串

   ```js
   const newStr = str.replace(regex, replacement)
   ```

4. split()：使用正则表达式作为分隔符，将字符串分割成数组，并返回分割后的数组

   ```js
   const splitArray = str.split(regex)
   ```
