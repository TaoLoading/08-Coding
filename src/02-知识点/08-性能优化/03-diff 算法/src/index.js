import h from './dom/h'
import patch from './dom/patch'

const container = document.getElementById('container')
const btn = document.getElementById('btn')

// 创建虚拟 DOM
const vnode1 = h('h1', { key: 1 }, 'vnode1')
const vnode2 = h('div', { key: 1 }, h('h1', {}, 'vnode2'))
const vnode3 = h('ul', {}, 'vnode3')
const vnode4 = h('ul', { key: 1 }, [
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'd' }, 'vnode4'),
  // h('li', { key: 'e' }, 'e')
])

const vnode5 = h('ul', { key: 1 }, [
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'e' }, 'e'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'd' }, 'vnode5'),
])

patch(container, vnode4)

btn.onclick = function () {
  // 替换 DOM
  patch(vnode4, vnode5)
}
