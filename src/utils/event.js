const preventDefault = function (ev) {
  ev = ev || window.event
  if (ev.preventDefault) {
    ev.preventDefault()
  }
  ev.returnValue = false
}

const scrollEvents = ['mousewheel']

const disableScroll = function (element) {
  scrollEvents.forEach(ev => {
    element.addEventListener(ev, preventDefault, {
      passive: false,
    })
  })
}

const enableScroll = function (element) {
  scrollEvents.forEach(ev => {
    element.removeEventListener(ev, preventDefault)
  })
}

export {
  disableScroll,
  enableScroll,
}
