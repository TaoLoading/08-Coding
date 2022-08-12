/**
 * 先序遍历
 * 
 * 步骤：
 * 1.访问根节点
 * 2.对根节点的左子树进行先序遍历
 * 3.对根节点的右子树进行先序遍历
 */

const binaryTree = require('./03-二叉树')

// 递归
/* const preorder = (root) => {
  if (!root) { return }
  console.log(root.val)
  preorder(root.left)
  preorder(root.right)
} */

// 非递归
const preorder = (root) => {
  if (!root) { return }
  const stack = [root]
  while (stack.length) {
    const n = stack.pop()
    console.log(n.val)
    // 因为栈结构是先进后出，且后续需要先让左子树节点出栈，故先右子树节点入栈再左节点出栈
    if (n.right) stack.push(n.right)
    if (n.left) stack.push(n.left)
  }
}

preorder(binaryTree)