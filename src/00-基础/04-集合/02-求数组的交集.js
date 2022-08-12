/**
 * 给定两个数组，编写一个函数来计算它们的交集
 * 
 * 编程思路：
 * 求交集：先将一个数组去重，再通过过滤的方式得到与第二个数组相同的数
 */

var intersection = function (nums1, nums2) {
  return [...new Set(nums1)].filter(n => nums2.includes(n))
}

// 时间复杂度是O(m*n)
// 空间复杂度是O(m)，m是去重后的nums1数组