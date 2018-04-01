import { disableScroll, enableScroll } from './event'
import { isMobile } from './util'

const checkEl = function (el, caller) {
  if (!(el instanceof HTMLElement)) {
    throw new Error(`usage: ${caller}([HTMLElement])`)
  }
}

// 得到元素上边距离顶部的 offsetTop
const getAboveEdgeOffsetTop = function (element) {
  checkEl(element, 'getAboveEdgeOffsetTop')
  let parent = element.offsetParent
  let offsetTop = element.offsetTop

  while (parent !== null) {
    offsetTop += parent.offsetTop
    parent = parent.offsetParent
  }
  return offsetTop
}

// 得到元素底边距离可视窗口上边的距离
const getBottom = function (element) {
  checkEl(element, 'getBottom')
  return element.getBoundingClientRect().bottom
}

const getScrollTop = function () {
  let t = document.documentElement || document.body.parentNode
  return (typeof t.scrollTop === 'number' ? t : document.body).scrollTop
}

const scrollTo = function (el) {
  checkEl(el, 'scrollTo')
  const fps = 60
  // 滚动的时间
  const interval = 0.4

  // 需要滚动的距离
  let dist = el.getBoundingClientRect().top
  const step = dist / (fps * interval)

  isMobile() ? mobileScrollTo(dist) : pcScrollTo(dist, step, fps)
}

const pcScrollTo = function (distance, step, fps) {
  let astep = Math.abs(step)
  let st = getScrollTop()
  let oldst = st

  function loop() {
    setTimeout(() => {
      var adist = Math.abs(distance)
      // 确保页面滚动到固定的位置
      if (adist < astep) {
        window.scrollBy(0, distance - 10)
        enableScroll(window)
      } else {
        distance -= step
        window.scrollBy(0, step)
        st = getScrollTop()
        // scrollTop 不变就说明页面已滚动到顶部或底部
        if (st === oldst) {
          enableScroll(window)
          return
        }
        oldst = st
        loop()
      }
    }, 1000 / fps)
  }

  disableScroll(window)
  loop()
}

const mobileScrollTo = function (distance, step) {
  window.scrollBy(0, distance - 10)
}

export {
  getAboveEdgeOffsetTop,
  getBottom,
  getScrollTop,
  scrollTo,
}
