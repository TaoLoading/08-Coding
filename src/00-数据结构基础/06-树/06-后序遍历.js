/**
 * 后序遍历
 * 
 * 步骤：
 * 1. 对根节点的左子树进行后序遍历
 * 2. 对根节点的右子树进行后序遍历
 * 3. 访问根节点
 */

const binaryTree = require('./03-二叉树')

const postOrder = (root) => {
  if (!root) { return }
  postOrder(root.left)
  postOrder(root.right)
  console.log(root.val)
}

postOrder(binaryTree)
