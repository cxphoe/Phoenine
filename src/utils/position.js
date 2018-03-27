// 得到元素上边距离顶部的 offsetTop
const getAboveEdgeOffsetTop = function (element) {
  if (!(element instanceof HTMLElement)) {
    throw new Error('usage: getAboveEdgeOffsetTop([HTMLElement])')
  }
  let parent = element.offsetParent
  let offsetTop = element.offsetTop
  while (parent !== null) {
    console.log(parent.clientTop)
    offsetTop += parent.offsetTop
    parent = parent.offsetParent
  }
  return offsetTop
}

// 得到元素底边距离可视窗口上边的距离
const getBottomEdgeScreenTop = function (element) {
  if (!(element instanceof HTMLElement)) {
    throw new Error('usage: getBottomEdgeScreenTop([HTMLElement])')
  }
  return element.getBoundingClientRect().bottom
}

const getScrollTop = function () {
  let t = document.documentElement || document.body.parentNode
  return (typeof t.scrollTop === 'number' ? t : document.body).scrollTop
}

export {
  getAboveEdgeOffsetTop,
  getBottomEdgeScreenTop,
  getScrollTop,
}
