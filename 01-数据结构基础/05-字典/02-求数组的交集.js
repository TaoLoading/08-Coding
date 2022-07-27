/**
 * 给定两个数组，编写一个函数来计算它们的交集
 */

var intersection = function (nums1, nums2) {
  const map = new Map()
  nums1.forEach(m => {
    map.set(m, true)
  })
  console.log(map)
  const result = []
  nums2.forEach(n => {
    if (map.get(n)) {
      result.push(n)
      map.delete(n)
    }
  })
  return result
}

// 时间复杂度是O(m+n)
// 空间复杂度是O(m)，虽然输入输出都是数组，但由于其不是临时变量，故不算在空间复杂度中。唯一的临时变量就是字典map