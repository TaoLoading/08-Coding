import vnode from './vnode'

/**
 * 创建虚拟 DOM
 * 主要实现就是根据传入的参数类型，结合 vnode() 去构建虚拟 DOM 的 js 对象
 *
 * @param {*} sel 元素选择器
 * @param {*} data 元素属性
 * @param {*} params 文字/子节点/新的 h()
 * @returns 虚拟 DOM
 */
export default function h(sel, data, params) {
  // 检查参数个数，当前手写 diff 算法仅支持 3 个参数
  if (arguments.length !== 3) {
    return new Error('当前手写 diff 算法仅支持 3 个参数')
  }

  if (typeof params === 'string' || typeof params === 'number') {
    // 1. params 为基本数据类型，直接转换为虚拟 DOM
    return vnode(sel, data, undefined, params, undefined)
  } else if (Array.isArray(params)) {
    // 2. params 为数组时，则该元素有子元素
    let children = []
    for (let item of params) {
      if (!(typeof item === 'object' && item.hasOwnProperty('sel'))) {
        throw new Error('参数类型错误')
      }
      children.push(item)
    }
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof params === 'object' && params.hasOwnProperty('sel')) {
    // 3. params 为对象时且含有 sel 属性时，则证明是新的 h() 函数
    const children = [params]
    return vnode(sel, data, children, undefined, undefined)
  } else {
    throw new Error('参数类型错误')
  }
}
