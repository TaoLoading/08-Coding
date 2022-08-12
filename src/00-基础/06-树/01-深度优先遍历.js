/**
 * 深度优先遍历(Depth First Search，DFS)：当遍历节点时尽可能深的遍历其子节点，遍历完全部子节点后再对其相邻接点进行类似遍历
 *
 * 步骤：
 * 1.访问根节点
 * 2.对根节点的children依次进行深度优先遍历
 */

const tree = {
  val: '1',
  children: [
    {
      val: '2-1',
      children: [
        {
          val: '3-1-1',
          children: []
        },
        {
          val: '3-1-2',
          children: []
        },
      ]
    },
    {
      val: '2-2',
      children: [
        {
          val: '3-2-1',
          children: []
        },
        {
          val: '3-2-2',
          children: []
        },
      ]
    },
  ]
}

const dfs = (root) => {
  console.log(root.val)
  // root.children.forEach((child) => { dfs(child) })
  root.children.forEach(dfs)
}

dfs(tree)