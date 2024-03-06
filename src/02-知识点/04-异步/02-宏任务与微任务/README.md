# 宏任务与微任务

## 为什么区分同步任务和异步任务

JS 引擎是单线程的，如果将全部任务都放到一个队列中会造成阻塞，例如比较耗时的操作，区分同步任务和异步任务可以避免队列的阻塞

## 为什么区分宏任务和微任务

区分宏任务和微任务是为了给异步任务的执行增加优先级选项，确保异步任务更稳定高效的执行

## 分类

1. 宏任务：定时器、postMessage、MessageChannel、I/O 操作、script（整体代码块）、setImmediate（Node 环境）
2. 微任务：Promise（then/catch/finally，注意不包含 pending 状态）、MutationObserver（浏览器环境，监听 DOM 变化的回调函数）、process.nextTick（Node 环境）

## 理解 script 整体代码块是宏任务

实际上如果同时存在两个 script 代码块，会首先在执行第一个 script 代码块中的同步代码，如果这个过程中创建了微任务并进入了微任务队列，第一个 script 同步代码执行完之后，会首先去清空微任务队列，再去开启第二个 script 代码块的执行

## 优先级

微任务的优先级高于宏任务。具体执行顺序见“03-Event Loop”文件
