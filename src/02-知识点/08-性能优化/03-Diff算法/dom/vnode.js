/**
 * 构造虚拟 DOM 的 js 对象
 * 
 * @param {*} sel 元素选择器
 * @param {*} data 元素属性
 * @param {*} children 子节点
 * @param {*} text 文本
 * @param {*} elm 对应的 DOM 元素
 * @returns 虚拟 DOM 的 js 对象
 */
export default function vnode(sel, data, children, text, elm) {

  const key = data.key
  return {
    sel,
    data,
    children,
    text,
    elm,
    key
  }
}
