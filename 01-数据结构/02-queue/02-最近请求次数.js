/**
 * 计算3000ms以内的请求次数
 * 如：
 * 输入： inputs = [[], [1], [100], [3001], [3002]] =>> 即分别在1毫秒、100毫秒、3001毫秒和3002毫秒发出请求
 * 输出： [null, 1, 2, 3, 3] =>> 即最初1次，100毫秒时两次，同理。注意在3001毫秒时发送了3次，因为采取闭区间，即[0, 3000]、[1, 3001]...
 * */

var RecentCounter = function () {
  this.queue = []
};

RecentCounter.prototype.ping = function (t) { // t为发起请求的时间
  this.queue.push(t)
  // 当队列头部元素不在[t-3000, t]范围内时，移出头部元素
  while (this.queue[0] < t - 3000) {
    this.queue.shift()
  }
  // 计算队列的长度，即处于[t-3000, t]范围内元素的个数，结果即最近的请求次数
  return this.queue.length
};

// 时间复杂度是O(n)，因为存在一个while循环，n为需要被提出队列的请求个数
// 空间复杂度是O(n)，因为存在一个queue队列，n为请求的次数