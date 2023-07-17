/**
 * 使用链表按照指定路径获取 JSON 对象的节点值
 */

const JSON = {
  a: { b: { c: 1 } },
  d: { e: 2 }
}
const path = ['a', 'b', 'c']

let p = JSON
path.forEach(k => {
  p = p[k]
})
console.log(p)
