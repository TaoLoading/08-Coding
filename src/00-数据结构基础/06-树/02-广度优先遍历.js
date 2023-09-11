/**
 * 广度优先遍历 (Breadth First Search，DFS)：当遍历节点时优先遍历当前节点和相邻节点，遍历完同级节点后再遍历下级节点
 *
 * 步骤：
 * 1. 新建一个队列，把根节点入队
 * 2. 把队头出队并访问
 * 3. 把队头的 children 依次入队
 * 4. 重复 2 和 3，直到队列为空
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
          val: '3-1-1',
          children: []
        }
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
        }
      ]
    }
  ]
}

const bfs = (root) => {
  // 1.新建一个队列，把根节点入队
  const q = [root]
  while (q.length > 0) {
    // 2.把队头出队并访问
    const n = q.shift()
    console.log(n.val)
    // 3.把队头的 children 依次入队
    n.children.forEach(child => {
      q.push(child)
    })
  }
}

bfs(tree)
