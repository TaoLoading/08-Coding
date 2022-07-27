/**
 * 中序遍历
 * 
 * 步骤：
 * 1.对根节点的左子树进行中序遍历
 * 2.访问根节点
 * 3.对根节点的右子树进行中序遍历
 */

const binaryTree = require('./03-二叉树')

// 递归
/* const inorder = (root) => {
  if (!root) { return }
  inorder(root.left)
  console.log(root.val)
  inorder(root.right)
} */

// 非递归
/**
 * 编程思路：
 * 通过递归方式的代码可得，当根节点不为空时，首先对其全部左子树节点进行遍历，
 * 所以采用指针指向根节点，让其左子树入栈并改变指针指向到其左子树节点，重复此操作栈内全部为当前根节点的左子树节点，
 * 弹出头部节点后，将指针指向当前节点的右节点，开始新一轮压栈操作
 * 
 */
const inorder = (root) => {
  if (!root) { return }
  const stack = []
  let p = root
  while (stack.length || p) {
    // 将全部左子树节点入栈
    while (p) {
      stack.push(p)
      p = p.left
    }
    const n = stack.pop()
    console.log(n.val)
    p = n.right
  }
}

inorder(binaryTree)