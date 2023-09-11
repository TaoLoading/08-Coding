/**
 * 给定一个字符串 s，请你找出其中不含有重复字符的最长子串的长度
 * 注意求的是最长子串，例如输入：s = "pwwkew"，输出：3。因为无重复字符的最长子串是"wke"不是"pwke"，所以其长度为 3。
 * 
 * 编程思路：
 * 1. 定义左右两个指针生成一个滑动窗口，该窗口用于剪切字符串，两个指针起始点为最初元素
 * 2. 定义一个字典用于保存右指针指向的元素和对应的下标
 * 3. 右指针不断向右进行加 1 移动，若下一个元素不存在字典中，则将其和其下标进行保存
 * 4. 若下一个元素存在字典中，则证明遇到重复元素，记录下左右指针之间的距离 (由于起始点是 0 注意加 1)，即不重复字符串的个数，并将左指针移动到重复字符的下一位。
 *    注意此时没有对左指针直接进行加 1，因为如果 (TODO)
 */

const lengthOfLongestSubstring = function (s) {
  let l = 0
  let res = 0
  const map = new Map()
  for (let r = 0; r < s.length; r++) {
    if (map.has(s[r]) && map.get(s[r]) >= l) {
      l = map.get(s[r]) + 1
    }
    res = Math.max(res, r - l + 1)
    map.set(s[r], r)
  }
  return res
}

let result = lengthOfLongestSubstring('abcabcbb')
console.log(result)
