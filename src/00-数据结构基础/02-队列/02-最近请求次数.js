/**
 * 计算 3000ms 以内的请求次数
 * 如：
 * 输入：inputs = [[], [1], [100], [3001], [3002]] =>> 即分别在 1 毫秒、100 毫秒、3001 毫秒和 3002 毫秒发出请求
 * 输出： [null, 1, 2, 3, 3] =>> 即最初 1 次，100 毫秒时两次，同理。注意在 3001 毫秒时发送了 3 次，因为采取闭区间，即 [0, 3000]、[1, 3001]...
 * */

var RecentCounter = function () {
  this.queue = []
};

RecentCounter.prototype.ping = function (t) { // t 为发起请求的时间
  this.queue.push(t)
  // 当队列头部元素不在 [t-3000, t] 范围内时，移出头部元素
  while (this.queue[0] < t - 3000) {
    this.queue.shift()
  }
  // 计算队列的长度，即处于 [t-3000, t] 范围内元素的个数，结果即最近的请求次数
  return this.queue.length
};

// 时间复杂度是 O(n)，因为存在一个 while 循环，n 为需要被提出队列的请求个数
// 空间复杂度是 O(n)，因为存在一个 queue 队列，n 为请求的次数
