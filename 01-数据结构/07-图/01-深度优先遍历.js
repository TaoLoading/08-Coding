/**
 * 深度优先遍历：尽可能深的搜索图的分支
 * 
 * 步骤：
 * 1.访问根节点
 * 2.对根节点的没访问过的相邻接点挨个进行深度优先遍历
 */

// 使用邻接表标识图
const graph = {
  0: [1, 2],
  1: [2],
  2: [0, 3],
  3: [3]
}

const visited = new Set() // 已经遍历过的元素的集合
const dfs = () => {
  console.log(n)
  visited.add(n)
  // 获取相邻接点
  graph[n].forEach(c => {
    if (!visited.has(c)) {
      // 当相邻节点未被遍历时，对其进行遍历
      dfs(c)
    }
  })
}

// 从节点2开始进行遍历
dfs(2)