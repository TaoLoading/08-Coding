/**
 * 中序遍历
 * 
 * 步骤：
 * 1.对根节点的左子树进行中序遍历
 * 2.访问根节点
 * 3.对根节点的右子树进行中序遍历
 */

const binaryTree = require('./03-二叉树')

const inorder = (root) => {
  if (!root) { return }
  inorder(root.left)
  console.log(root.val)
  inorder(root.right)
}

inorder(binaryTree)