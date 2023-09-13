const s = new Set()

// 增
s.add('val1')
s.add('val2')
s.add('val3')

// 删
s.delete('val2')

// 查
console.log('查', s.has('val2'))
