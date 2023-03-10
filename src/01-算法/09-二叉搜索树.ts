/**
 * 题目：求一个二叉搜索树中第 k 小的值
 * 
 * 思路：
 *    1. 对二叉搜索树进行中序遍历，得到一个从小到大顺序排列的数组
 *    2. 第 k 小值的数即为第 k 个数
 * 
 * 二叉树的遍历 (判断根在哪)：
 *    1. 前序遍历：root → left → right
 *    2. 中序遍历：left → root → right
 *    3. 后序遍历：left → right → root
 * 
 * 二叉搜索树 (Binary Search Tree, BST)：
 *    1. left(包括其后代).value <= root.value
 *    2. right(包括其后代).value => root.value
 *    3. 便于使用二分法进行快速查找
 * 
 * 平衡二叉搜索树 (BBST) 进行增删查时，时间复杂度都是 O(logn)，n 为节点数，logn 为树的高度
 * 
 * 红黑树：
 *    1. 一种自平衡二叉树
 *    2. 分为红/黑两种颜色，通过颜色转换来维持树的平衡
 *    3. 相对于普通二叉树，红黑树维持平衡的效率更高
 */

// 二叉树节点的类型
export interface TreeNode {
  value: number
  left: TreeNode | null
  right: TreeNode | null
}

// 模拟二叉树
const bst: TreeNode = {
  value: 5,
  left: {
    value: 3,
    left: {
      value: 2,
      left: null,
      right: null
    },
    right: {
      value: 4,
      left: null,
      right: null,
    }
  },
  right: {
    value: 7,
    left: {
      value: 6,
      left: null,
      right: null
    },
    right: {
      value: 8,
      left: null,
      right: null
    }
  }
}

const resArr: number[] = []

/**
 * 前序遍历
 * @param node 节点
 */
function preOrderTraverse(node: TreeNode | null) {
  if (node === null) {
    return
  }
  resArr.push(node.value)
  preOrderTraverse(node.left)
  preOrderTraverse(node.right)
}

/**
 * 中序遍历
 * @param node 节点
 */
function inOrderTraverse(node: TreeNode | null) {
  if (node === null) {
    return
  }
  inOrderTraverse(node.left)
  resArr.push(node.value)
  inOrderTraverse(node.right)
}

/**
 * 后序遍历
 * @param node 节点
 */
function postOrderTraverse(node: TreeNode | null) {
  if (node === null) {
    return
  }
  postOrderTraverse(node.left)
  postOrderTraverse(node.right)
  resArr.push(node.value)
}

// 遍历的功能测试
/* preOrderTraverse(bst)
console.log('前序遍历的结果：', resArr) */
/* inOrderTraverse(bst)
console.log('中序遍历的结果：', resArr) */
/* postOrderTraverse(bst)
console.log('后序遍历的结果：', resArr) */

/**
 * 求一个二叉搜索树中第 k 小的值
 * @param tree 二叉搜索树
 * @param k 第几个值
 * @returns 存在时返回
 */
export function getKValue(bst: TreeNode, k: number): number | null {
  inOrderTraverse(bst)
  return resArr[k - 1] || null
}

// 功能测试
console.log('此二叉搜索树中第 3 小的值为：', getKValue(bst, 3))
