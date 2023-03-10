/**
 * 存在一个按升序排列的链表，给你这个链表的头节点 head，请你删除所有重复的元素，使每个元素只出现一次，返回同样按升序排列的结果链表。
 *
 * 解题思路：因为链表是有序的，故重复元素一定相邻，遍历链表，当发现值相同的元素时，删除下个元素
 */

var deleteDuplicates = function (head) {
  // 声明 p，和 head 指向同一个链表
  let p = head
  while (p && p.next) {
    // 使用 p 对链表进行修改
    if (p.val === p.next.val) {
      p.next = p.next.next
    } else {
      p = p.next
    }
  }
  // 返回修改后的链表
  return head
}

// 测试
const a = { val: '1' }
const b = { val: '1' }
const c = { val: '2' }
const d = { val: '3' }
a.next = b
b.next = c
c.next = d
console.log(deleteDuplicates(a))
