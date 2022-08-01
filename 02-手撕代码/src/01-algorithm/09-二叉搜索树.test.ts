import { TreeNode, getKValue } from './09-二叉搜索树'

describe('二叉搜索树', () => {
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

  it('正常情况', () => {
    const res = getKValue(bst, 3)
    expect(res).toBe(4)
  })

  it('k 不再正常范围之内', () => {
    const res1 = getKValue(bst, 0)
    expect(res1).toBeNull()

    const res2 = getKValue(bst, 1000)
    expect(res2).toBeNull()
  })
})