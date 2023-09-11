# JS 的数据类型

## 基本数据类型

1. String

2. Number

3. Boolean

4. Null

5. Undefined

6. Symbol

   1. 意义：代表唯一的值

   2. 作用：创建唯一的值，比如对象属性名的创建，确保属性名的唯一性

   3. 使用

      ```js
      const uniqueSymbol = Symbol('description')
      const obj = {
        [uniqueSymbol]: 'This is a unique symbol property'
      }
      console.log(obj[uniqueSymbol]) // This is a unique symbol property
      
      
      const uniqueSymbol1 = Symbol('description')
      const uniqueSymbol2 = Symbol('description')
      console.log(uniqueSymbol1 === uniqueSymbol2) // false
      ```

7. BigInt：

   1. 意义：大于 2^53 - 1 的整数

   2. 作用：解决 JS 中数字精度有限的问题

   3. 使用

      ```js
      // 使用 n 后缀来创建 BigInt，或者使用 BigInt() 构造函数
      const bigIntValue1 = 1234567890123456789012345678901234567890n
      const bigIntValue2 = BigInt('1234567890123456789012345678901234567890')
      ```


## 引用数据类型

1. Object 