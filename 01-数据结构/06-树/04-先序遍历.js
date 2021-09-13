/**
 * 先序遍历
 * 
 * 步骤：
 * 1.访问根节点
 * 2.对根节点的左子树进行先序遍历
 * 3.对根节点的右子树进行先序遍历
 */

const binaryTree = require('./03-二叉树')

const preorder = (root) => {
  if (!root) { return }
  console.log(root.val)
  preorder(root.left)
  preorder(root.right)
}

preorder(binaryTree)