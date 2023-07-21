import h from './dom/h'
import patch from './dom/patch'

const container = document.getElementById('container')
const btn = document.getElementById('btn')

// 创建虚拟 DOM
const vnode1 = h('h1', {}, '你好')
const vnode2 = h('div', {}, h('h1', {}, '你好'))
const vnode3 = h('ul', {}, [
  h('li', {}, 'a'),
  h('li', {}, 'b'),
  h('li', {}, 'c'),
  h('li', {}, '天若有情天亦老')
])
const vnode4 = h('ul', { key: 1 }, [
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'd' }, 'd'),
  // h('li', { key: 'e' }, 'e')
])

const vnode5 = h('ul', { key: 2 }, [
  h('li', { key: 'b' }, 'b'),
  h('li', { key: 'e' }, 'e'),
  h('li', { key: 'c' }, 'c'),
  h('li', { key: 'a' }, 'a'),
  h('li', { key: 'd' }, 'd'),
])

btn.onclick = function () {
  // 替换 DOM
  patch(container, vnode1)
  // patch(vnode4, vnode5)
}
