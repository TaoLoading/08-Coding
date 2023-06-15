/*
<div>
  <span></span>
    <ul>
      <li></li>
      <li></li>
    </ul>
</div>

转换为：

{
  tag: 'DIV',
  children: [
      { tag: 'SPAN', children: [] },
      {
          tag: 'UL',
          children: [
              { tag: 'LI', children: [] },
              { tag: 'LI', children: [] }
          ]
      }
  ]
}
*/

function domToTree(dom) {
  const obj = {}
  obj.tag = dom.tagName
  obj.children = []
  dom.childNodes.forEach(child => obj.children.push(domToTree(child)))
  return obj
}
