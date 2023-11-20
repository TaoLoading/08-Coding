/**
 * 将虚拟 DOM 创建为真实 DOM
 *
 * @param {*} vnode 虚拟 DOM
 * @returns 真实 DOM
 */
export default function createElement(vnode) {
  // 1. 依据虚拟 DOM 创建真实 DOM
  let domNode = document.createElement(vnode.sel)
  // 2. 判断内部是否有子节点
  if (vnode.children == undefined || vnode.children.length === 0) {
    // 2.1 无子节点，直接创建文本节点
    domNode.innerText = vnode.text
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 2.2 内部有子节点，则通过递归创建子节点
    for (let item of vnode.children) {
      let childDom = createElement(item)
      domNode.appendChild(childDom)
    }
  }

  // 3. 补充 elm 属性
  vnode.elm = domNode

  return domNode
}
