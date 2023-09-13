/**
 * [] == ![] 打印为 true，原因是发生了类型转换：
 * 1. 逻辑非运算符 ! 优先级高，且 ! 会尝试将操作数转换为布尔值并取其相反值，
 *    在配合 ! 使用时， [] 被视为一个真值，取其相反值就是 false
 * 2. [] 经过类型转换后变为 '' 空字符串，此时表达式变为：'' == false
 * 3. 进一步类型转换，'' 变为 false，此时表达式变为：false == false，故输出为 true
 */

console.log('[] == ![]', [] == ![]) // true
console.log('[] === ![]', [] === ![]) // false
