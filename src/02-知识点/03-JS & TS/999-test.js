const prototypeObj = {
  property1: 'value1',
  property2: 'value2',
  method1: function () {
  }
}
const obj2 = Object.create(prototypeObj)
console.log('===', obj2.__proto__)
