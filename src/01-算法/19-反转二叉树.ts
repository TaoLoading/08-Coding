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
 * 递归
 * @param root 
 * @returns 
 */
export function invertBinaryTree1(root: binaryTreeType | null): binaryTreeType | null {
  if (root === null) {
    return root
  }
  const left = invertBinaryTree1(root.left)
  const right = invertBinaryTree1(root.right)
  root.left = right
  root.right = left
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
console.log('原二叉树', binaryTree)
console.log('反转后', invertBinaryTree1(binaryTree))
