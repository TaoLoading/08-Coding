/**
 * 给定一个整数数组nums和一个整数目标值target，请你在该数组中找出 和为目标值target的那两个整数，并返回它们的数组下标，
 * 你可以假设每种输入只会对应一个答案。但是数组中同一个元素在答案里不能重复出现。
 * 
 * 编程思路：遍历数组得到数组中的每个值，通过计算得到它和目标值的差值，
 *          定义一个字典，字典中元素的key为数组中的值，value为它的下标，
 *          查询字典，当字典中存在差值时则说明两数之和为目标值，输出下标，
 *          不存在则将该遍历到的值和它的下标存入字典中，进行循环查询
 */

var twoSum = function (nums, target) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const m = nums[i]
    const n = target - m
    if (map.has(n)) {
      return [map.get(n), i]
    } else {
      map.set(m, i)
    }
  }
}

// 时间复杂度是O(n)
// 空间复杂度是O(n)
