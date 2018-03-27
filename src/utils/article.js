import marked from 'marked'

const toMarked = function (text) {
  return marked(text)
}

const getFrontLines = function (text, lines) {
  let maxIndex = text.length
  for (var index = 0; lines > 0 && index < maxIndex; index++) {
    if (text[index] === '\n') {
      lines--
    }
  }
  return text.substring(0, index)
}

const dateFormat = function (date) {
  let reg = /^(\d{1,4})-(\d{1,2})-(\d{1,2})$/
  let match = reg.exec(date)
  if (!match) {
    throw new Error('usage: dateFormat("yyyy-mm-dd")')
  }
  let year = +match[1]
  let month = +match[2]
  let day = +match[3]
  return `${month}月 ${day < 10 ? '0' + day : day}, ${year}`
}

export {
  toMarked,
  getFrontLines,
  dateFormat,
}
