import { describe, expect, it } from 'vitest'
import { invertBinaryTree1, invertBinaryTree2 } from './19-反转二叉树'

describe('反转二叉树', () => {
  it('正常', () => {
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
    const res = invertBinaryTree2(binaryTree)
    expect(res).toEqual({
      val: '1',
      left: {
        val: '2-2',
        left: {
          val: '3-2-2',
          left: null,
          right: null
        },
        right: {
          val: '3-2-1',
          left: null,
          right: null
        }
      },
      right: {
        val: '2-1',
        left: {
          val: '3-1-2',
          left: null,
          right: null
        },
        right: {
          val: '3-1-1',
          left: null,
          right: null
        }
      }
    })
  })
  it('空二叉树', () => {
    const res = invertBinaryTree2(null)
    expect(res).toBeNull()
  })
})
