/**
 * 题目：反转单向链表
 * 
 * 数组是联系存储，链表是非连续存储，这就导致：
 * 1. 数组查询快，插入和删除慢
 * 2. 链表查询慢，插入和删除快
 */

/**
 * 链表节点类型
 * @value 当前值
 * @next 下一个节点
 */
interface LinkListNodeType {
  value: number
  next?: LinkListNodeType
}

// 创建单向链表
export function createLinkList(arr: number[]): LinkListNodeType {
  if (arr.length === 0) {
    throw new Error('传入的数组为空')
  }
  // 定义一个节点，并赋值为最后一个节点的值。便于从后向前查找整个链表
  let curNode: LinkListNodeType = {
    value: arr[arr.length - 1]
  }
  // 只有一个元素时则直接返回
  if (arr.length === 1) {
    return curNode
  }
  // 倒序遍历数组其他节点并继续赋值
  for (let i = arr.length - 2; i >= 0; i--) {
    curNode = {
      value: arr[i],
      next: curNode
    }
  }
  return curNode
}

// 反转单向链表
export function reverseLinkList(linkListNode: LinkListNodeType): LinkListNodeType {
  // 定义三个指针，分别是上一下节点、当前节点、下一个节点。下一个节点初始值赋linkListNode
  let prevNode: LinkListNodeType | undefined = undefined
  let curNode: LinkListNodeType | undefined = undefined
  let nextNode: LinkListNodeType | undefined = linkListNode

  // 以nextNode为主遍历链表。当nextNode存在时执行，即执行到倒数第二个节点
  while (nextNode) {
    // 第一个元素时，删除其next
    if (curNode && !prevNode) {
      delete curNode.next
    }

    // 反转指针
    if (curNode && prevNode) {
      curNode.next = prevNode
    }

    // 指针整体向后移动一位
    prevNode = curNode
    curNode = nextNode
    nextNode = nextNode?.next
  }

  // 对最后一个节点进行处理。因为其没有nextNode
  curNode!.next = prevNode

  return curNode!
}

// 功能测试
const arr = [100, 200, 300]
console.log('该链表是', createLinkList(arr))
console.log('反转后的链表是', reverseLinkList(createLinkList(arr)))
