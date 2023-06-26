let str = '1abc123ASD cbd asd12A'

/**
 * concat()
 * 作用：拼接字符串
 * 备注：不会改变原字符串
 */
/* console.log(str.concat('hi'))
console.log(str) */

/**
 * indexOf()
 * 作用：查询字符串第 1 次出现的位置，有则返回第 1 次出现的下标，无则返回 -1
 * 参数：第 2 个参数是起始位置
 * 备注：不会改变原字符串
 */
/* console.log(str.indexOf('12'))
console.log(str.indexOf('12', 22)) */

/**
 * replace()
 * 作用：替换字符串
 * 备注：不会改变原字符串
 */
/* console.log(str.replace(/12/g, '**'))
console.log(str) */

/**
 * slice()
 * 作用：截取字符串
 * 参数：1. 第 1 个参数为起始位置，第 2 个参数为结束位置
 *       2. 当第 2 个参数大于第 1 个参数时，会返回 1 个空串
 *       3. 当只传入 1 个参数时，是截取起始到最后的位置
 *       4. 当传入负数时，表示从后倒数截取。如如果传入 -3，则表示倒数第 3 个字符
 * 备注：不会改变原字符串
 */
/* console.log(str.slice(6, -2))
console.log(str) */

/**
 * split()
 * 作用：分割字符串为数组
 * 参数：1. 当传入的参数存在于字符串中，则以该参数为分隔符，分隔字符串为数组
 *       2. 当传入的参数不存在时，则将整个字符串作为数组的 1 个元素
 * 备注：不会改变原字符串
 */
console.log(str.split('12'))
console.log(str.split(','))
console.log(str)
