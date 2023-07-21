import createElement from './createElement'
import updateChildren from './updateChildren'

/**
 * 处理新老节点为同一个节点时的情况
 * 
 * @param {*} oldVnode 老节点
 * @param {*} newVnode 新节点
 */
export default function patchVnode(oldVnode, newVnode) {
  // 判断新节点是否有子节点
  if (newVnode.children == undefined || newVnode.children.length === 0) {
    if (newVnode.text !== oldVnode.text) {
      // 当新节点没有子节点且文本不相同时，直接替换文本
      oldVnode.elm.innerText = newVnode.text
    }
  } else {
    // 判断老节点是否有子节点
    if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
      // 新老节点都有子节点。diff 核心 (最复杂)
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
    } else {
      // 老节点没有子节点时，将老节点清空并完成新节点的添加
      oldVnode.elm.innerHTML = ''
      for (let item of newVnode.children) {
        let childDom = createElement(item)
        oldVnode.elm.appendChild(childDom)
      }
    }
  }
}
