const getHeaderTrees = function (headers, defaultData) {
  let list = []
  // stack 用来表示当前处理的目录级别信息
  let stack = []
  if (!headers || headers.length === 0) {
    return list
  }

  let index = 0
  if (headers[0].level !== 1) {
    stack.push({
      data: defaultData,
      children: [],
    })
  } else {
    index++
    stack.push({
      data: headers[0],
      children: [],
    })
  }

  let amount = headers.length
  for (; index < amount; index++) {
    let data = headers[index]
    let current = {
      data,
      children: []
    }

    let curLevel = data.level
    if (curLevel === 1 && stack[0]) {
      list.push(stack[0])
    }
    // 倒退到 level 所属的母目录级别
    stack.splice(curLevel - 1)

    // 当前所处目录级别
    let stackLevel = stack.length
    let parentIndex = stackLevel - 1
    while (parentIndex > 0 && !stack[parentIndex]) {
      parentIndex++
    }
    let parent = stack[parentIndex]
    if (parent) {
      parent.children.push(current)
    }

    for (
      let levelDiff = curLevel - stackLevel;
      levelDiff > 1;
      levelDiff--
    ) {
      stack.push(null)
    }
    stack.push(current)
  }

  list.push(stack[0])
  return list
}

export {
  getHeaderTrees,
}
