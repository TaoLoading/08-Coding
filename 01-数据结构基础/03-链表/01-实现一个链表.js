/* JavaScript没有链表，但可以使用Object模拟出链表 */

const a = { val: 'a' }
const b = { val: 'b' }
const c = { val: 'c' }
const d = { val: 'd' }
// 使用next将每个object进行连接
a.next = b
b.next = c
c.next = d

// 遍历链表
let point = a
while (point) {
  console.log(point.val)
  point = point.next
}

// 插入元素
const e = { val: 'e' }
c.next = e
e.next = d

// 删除元素
c.next = d