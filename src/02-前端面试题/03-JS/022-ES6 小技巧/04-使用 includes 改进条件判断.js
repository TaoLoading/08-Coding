/**
 * 使用 includes 改进条件判断
 */

if (
  type == 1 ||
  type == 2 ||
  type == 3 ||
  type == 4 ||
  type == 5
) {
}

const condition = [1, 2, 3, 4, 5]

if (condition.includes(type)) {
  //...
}

