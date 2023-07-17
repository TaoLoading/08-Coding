/**
 * 题目：
 * 反转二叉树
 */

interface binaryTreeType {
  val: string
  left: binaryTreeType | null
  right: binaryTreeType | null
}

/**
 * 使用递归
 * @param root 二叉树的根节点
 * @returns 反转后的二叉树
 */
export function invertBinaryTree1(root: binaryTreeType | null): binaryTreeType | null {
  if (root === null) {
    return root
  }

  const temp = root.left
  root.left = root.right
  root.right = temp
  invertBinaryTree1(root.left)
  invertBinaryTree1(root.right)

  return root
}

const binaryTree = {
  val: '1',
  left: {
    val: '2-1',
    left: {
      val: '3-1-1',
      left: null,
      right: null
    },
    right: {
      val: '3-1-2',
      left: null,
      right: null
    }
  },
  right: {
    val: '2-2',
    left: {
      val: '3-2-1',
      left: null,
      right: null
    },
    right: {
      val: '3-2-2',
      left: null,
      right: null
    }
  }
}

/**
 * 使用广度优先遍历的思路。广度优先遍历体现在层级遍历上，先同级，再子级
 * @param root 二叉树的根节点
 * @returns 反转后的二叉树
 */
export function invertBinaryTree2(root: binaryTreeType | null): binaryTreeType | null {
  if (root === null) {
    return root
  }

  // 1. 新建队列，根节点入队列
  const queue: binaryTreeType[] = [root]
  while (queue.length > 0) {
    // 2. 依次去除节点，并交换左右子节点
    const current = queue.shift()!
    const temp = current.left
    current.left = current.right
    current.right = temp

    // 3. 对子节点进行处理
    if (current.left !== null) {
      queue.push(current.left)
    }
    if (current.right !== null) {
      queue.push(current.right)
    }
  }

  return root
}

console.log('原二叉树', binaryTree)
// console.log('反转后', invertBinaryTree1(binaryTree))
console.log('反转后', invertBinaryTree2(binaryTree))
