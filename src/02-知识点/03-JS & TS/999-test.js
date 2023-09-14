function isCycle(obj) {
  const set = new Set()

  const cycle = (o) => {
    if (typeof o === 'object' && o !== null) {
      if (set.has(o)) {
        return true
      }
      set.add(o)
      for (const key in o) {
        if (cycle(o[key])) {
          return true
        }
      }
    }
    return false
  }
  return cycle(obj)
}

const obj = {
  name: 'John',
  age: 20,
  friend: {
    name: 'Tom',
    age: 22,
    friend: null
  }
}

obj.friend.friend = obj
console.log('isCycle', isCycle(obj))
