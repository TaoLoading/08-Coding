# 执行上下文

## 概念

* 抽象的概念
* 代表了代码的执行环境，包括：变量、函数、对象、this 的内存空间以及执行期间创建的相关信息

## 分类

1. 全局执行上下文：在页面加载时创建的，默认是全局对象 window，只有一个
2. 函数执行上下文：每当调用一个函数都会创建一个函数执行上下文，含函数的参数、局部变量、函数声明以及对外部变量的引用。当函数执行完毕，函数执行上下文被销毁
3. eval() 函数执行上下文：当调用 eval() 函数的时候，就会产生一个 eval() 函数执行上下文

## 执行上下文的创建步骤

1. 创建变量对象：变量对象包括函数的参数、函数声明和变量声明
2. 创建作用域链：作用域链保证了执行上下文中的变量和函数的有序访问
3. 确定 this 指向
4. 执行代码
