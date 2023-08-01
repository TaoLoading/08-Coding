import patchSameVnode from './patchSameVnode'
import createElement from './createElement'

/**
 * 处理新老节点为同一个节点且都有子节点时的情况
 * 1. 定义四个指针
 * 2. 遍历节点，按照规则对节点进行查找。匹配规则时（为同一个节点），修改指针并进行替换
 * 3. 匹配规则时，不再继续按照其他规则查找
 * 
 * @param {*} parentElm 真实 DOM 节点
 * @param {*} oldCh 老节点的子节点
 * @param {*} newCh 新的子节点
 */
export default function updateChildren(parentElm, oldCh, newCh) {
  /**
   * 规则：
   * 1. 老前 VS 新前。匹配则老前指针++，新前指针++；老前节点后移，新前节点后移
   * 2. 老后 VS 新后。匹配则老后指针--，新后指针--；老后节点前移，新后节点前移
   * 3. 老前 VS 新后。匹配则老前指针++，新后指针--；将老前节点移动到老后之后
   * 4. 老后 VS 新前。匹配则老后指针--，新前指针++；将老后节点移动到老前之前
   * 5. 不满足前 4 种条件时，在剩余老节点中遍历查找新前指向节点
   *    1. 存在，则将该节点移动到老前之前
   *    2. 不存在，则创建该节点到老前之前
   * 6. 不满足前五种条件时，创建新节点，新前指针++
   * 7. 当新老节点个数不一样时，对比指针位置判断添加或删除
   *    1. 新节点有剩余节点时 - 添加：依次将剩余节点插入到新后之后
   *    2. 老节点有剩余节点时 - 删除：依次将剩余节点删除
   * 
   * 移动节点使用的 insertBefore()
   */

  let oldStartIdx = 0 // 老前的指针
  let newStartIdx = 0 // 新前的指针
  let oldEndIdx = oldCh.length - 1 // 老后的指针
  let newEndIdx = newCh.length - 1 // 新后的指针

  let oldStartVnode = oldCh[0] // 老前的子节点
  let newStartVnode = newCh[0] // 新前的子节点
  let oldEndVnode = oldCh[oldEndIdx] // 老后的子节点
  let newEndVnode = newCh[newEndIdx] // 新后的子节点

  // 判断两个节点是否为同一个
  function sameVnode(vNode1, vNode2) {
    return (vNode1.key === vNode2.key && vNode1.sel === vNode2.sel)
  }

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 首先对判断是否为 undefined
    // 这是因为在情况 5 中，将处理过的节点设置为了 undefined
    if (oldStartVnode == undefined) {
      oldStartVnode = oldCh[++oldStartIdx]
    }
    if (oldEndVnode == undefined) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 情况一：老前 VS 新前
      console.log('情况 1，老前 = 新前')
      patchSameVnode(oldStartVnode, newStartVnode)
      if (newStartVnode) {
        newStartVnode.elm = oldStartVnode?.elm
      }
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // 情况二：老后 VS 新后
      console.log('情况 2，老后 = 新后')
      patchSameVnode(oldEndVnode, newEndVnode)
      if (newEndVnode) {
        newEndVnode.elm = oldEndVnode?.elm
      }
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // 情况三：老前 VS 新后
      console.log('情况 3，老前 = 新后')
      patchSameVnode(oldStartVnode, newEndVnode)
      if (newEndVnode) {
        newEndVnode.elm = oldEndVnode?.elm
      }
      // 将老前节点移动到老后之后
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // 情况四：老后 VS 新前
      console.log('情况 4，老后 = 新前')
      patchSameVnode(oldEndVnode, newStartVnode)
      if (newStartVnode) {
        newStartVnode.elm = oldEndVnode?.elm
      }
      // 将老后节点移动到老前之前
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // 情况五：在剩余老节点中遍历查找新前指向节点

      // 1. 创建对象存取老节点
      const keyMap = {}
      for (let i = oldStartIdx; i < oldEndIdx; i++) {
        const key = oldCh[i]?.key
        if (key) {
          keyMap[key] = i
        }
      }

      // 2. 在该对象上查找新前指向的新节点是否存在
      let idxInOld = keyMap[newStartVnode.key]

      if (idxInOld) {
        // 3-1. 存在，则将该节点移动到老前之前
        console.log('情况 5-1，老其他 = 新前')
        const existNode = oldCh[idxInOld]
        patchSameVnode(existNode, newStartVnode)
        // 3-1-1. 处理过的节点在老节点中设置为 undefined
        oldCh[idxInOld] = undefined
        // 3-1-2. 把该节点移动到老前指向节点的前面
        parentElm.insertBefore(existNode.elm, oldStartVnode.elm)
      } else {
        // 3-2. 不存在，则创建该节点到老前之前
        console.log('情况 5-2，不存在')
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm)
      }
      // 新前指针++
      newStartVnode = newCh[++newStartIdx]
    }
  }

  /**
   * 跳出循环则说明出现两种情况：
   * 1. newStartIdx <= newEndIdx，此时为新增节点
   * 2. oldStartIdx <= oldEndIdx，此时为删除节点
   */
  if (newStartIdx <= newEndIdx) {
    // 新增
    console.log('新节点还有剩余节点，此时为新增')

    // 插入的参考节点，新后之后
    const before = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null

    // 依次将剩余节点插入到新后之后
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      parentElm.insertBefore(createElement(newCh[i]), before)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    // 删除
    console.log('老节点还有剩余节点，此时为删除')

    // 依次将剩余节点删除
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      parentElm.removeChild(oldCh[i].elm)
    }
  }
}
