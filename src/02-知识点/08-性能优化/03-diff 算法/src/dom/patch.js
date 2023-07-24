import createElement from './createElement'
import vnode from './vnode'
import patchSameVnode from './patchSameVnode'

/**
 * 替换节点
 * 比对新老节点，按照替换规则更新虚拟 DOM，转换为真实 DOM 后渲染到页面
 * 
 * @param {*} oldVnode 老节点
 * @param {*} newVnode 新节点
 */
export default function patch(oldVnode, newVnode) {
  // 1. 判断老节点是否为虚拟 DOM
  if (oldVnode.sel == undefined) {
    // 若老节点没有 sel 属性，则证明为真实 DOM，将其转换为虚拟 DOM 方便节点的替换
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    )
  }

  // 2. 判断否为同一个节点。依据：选择器相同、key 存在且相同
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key && oldVnode.key !== undefined) {
    console.log('新老节点为同一个节点')
    patchSameVnode(oldVnode, newVnode)
  } else {
    // 不为同一个节点，则暴力删除老节点创建新节点
    console.log('新老节点不为同一个节点')

    // 将虚拟 DOM 创建为真实 DOM
    const newVnodeElm = createElement(newVnode)
    // 获取老节点的真实 DOM 节点
    const oldVnodeElm = oldVnode.elm
    // 插入新节点并删除老节点
    if (oldVnodeElm && oldVnodeElm.parentNode && newVnodeElm) {
      oldVnodeElm.parentNode.insertBefore(newVnodeElm, oldVnodeElm)
      oldVnodeElm.parentNode.removeChild(oldVnodeElm)
    }
  }
}
