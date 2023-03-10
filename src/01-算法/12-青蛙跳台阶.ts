/**
 * 题目：青蛙跳台阶，每次可跳 1 级或 2 级，问调到 n 级台阶共有几种方式？
 * 
 * 分析：
 *  1. 跳到 1 级，有 1 种方式 f(1) = 1
 *  2. 跳到 2 级，有 2 种方式 f(2) = 2
 *  3. 跳到 n 级，f(n) = f(n - 1) + f(n - 2)
 * 
 * 求解方式与斐波那契数列完全一致
 */