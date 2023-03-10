/**
 * 请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点。传入函数的唯一参数为 要被删除的节点。
 *
 * 题目难点：与平常在链表上删除节点不同的时，无法直接被删除节点的上个节点
 *
 * 解题思路：删除下一个节点，并在删除前将下一节点的值赋值到当前节点上
 */

var deleteNode = function (node) {
  node.val = node.next.val
  node.next = node.next.next
};

// 时间复杂度为 O(1)
// 空间复杂度为 O(1)