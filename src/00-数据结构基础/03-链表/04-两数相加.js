/**
 * 给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字，
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 */

var addTwoNumbers = function (l1, l2) {
  // 创建空节点
  const l3 = new ListNode(0)
  // 生成指针分别执行链表头部
  let p1 = l1
  let p2 = l2
  let p3 = l3
  // carry 为满十后进的值
  let carry = 0
  // 当链表不为空时进行循环
  while (p1 || p2) {
    let val1 = p1 ? p1.val : 0
    let val2 = p2 ? p2.val : 0
    // 计算相加后的值和进位数
    let val = val1 + val2 + carry
    carry = Math.floor(val / 10)
    // 将相加后的值放到空节点的最后一位，形成新链表
    p3.next = new ListNode(val % 10)
    // 将指针后移
    if (p1) p1 = p1.next
    if (p2) p2 = p2.next
    p3 = p3.next
    // 将进制数补上
    if (carry) {
      p3.next = new ListNode(carry)
    }
  }
  // 返回新链表
  return l3.next
}

// 时间复杂度是 O(n)，n 是循环时两个链表较长的一位
// 空间复杂度是 O(n)，n 是新链表的长度