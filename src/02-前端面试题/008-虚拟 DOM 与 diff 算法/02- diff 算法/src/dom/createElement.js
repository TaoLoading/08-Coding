/**
 * 将虚拟节点创建为 dom 节点
 */

export default function createElement(vnode) {
  // 创建节点
  let domNode = document.createElement(vnode.sel)
  // 判断内部是否有子节点
  if (vnode.children == undefined) {
    // 内部没有子节点，则将字符串赋值
    domNode.innerText = vnode.text
  } else if (Array.isArray(vnode.children)) {
    // 内部有子节点，则通过递归创建子节点
    for (let item of vnode.children) {
      let childDom = createElement(item)
      domNode.appendChild(childDom)
    }
  }

  // 补充 elm 属性
  vnode.elm = domNode

  return domNode
}