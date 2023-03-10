/**
 * 广度优先遍历：先访问离根节点最近的子节点
 * 
 * 步骤：
 * 1.新建一个队列，把根节点入队
 * 2.把队头出队并访问
 * 3.把队头的没访问过的相邻节点入队
 * 4.重复 2 和 3，直到队列为空
 */

// 使用邻接表标识图
const graph = {
  0: [1, 2],
  1: [2],
  2: [0, 3],
  3: [3]
}

const bfs = (start) => {
  const visited = new Set()
  // 2.将起始节点加入 visited 队列
  visited.add(start)
  // 此处为从节点 2 开始遍历
  const q = [start]
  while (q.length) {
    // 1.队头出队
    const n = q.shift()
    console.log(n)
    // visited.add(n)
    graph[n].forEach(c => {
      // 4.将没访问过的节点的子节点依次入队
      if (!visited.has(c)) {
        q.push(c)
        // 3.将没访问过的节点入队
        visited.add(n)
      }
    })
  }
}

bfs(2)
/**
 * 注：将 visited.add(n) 放到下方是为了防止出现部分节点存在于队列未进行遍历时，而将其推入 visited 的情况
 *     此时起始节点未存在与 visited 中，故在开头将其推入 visited
 */