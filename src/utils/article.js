import marked from 'marked'

const toMarked = function (text) {
  return marked(text)
}

const getFrontLines = function (text, lines) {
  const lineReg = /.*[\r\n]/g
  let res = []
  for (
    var match = lineReg.exec(text);
    match && lines > 0;
    match = lineReg.exec(text), lines--
  ) {
    res.push(match[0])
  }
  return res.join('')
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

const getmdCatalogue = function (html, lowestLevel) {
  const lowest = lowestLevel || 2
  const headerReg = /<h(\d+) id="(.*)">(.*)<\/h\1>/g

  let res = []
  for (
    var match = headerReg.exec(html);
    match;
    match = headerReg.exec(html)
  ) {
    let level = +match[1]
    if (level <= lowest) {
      res.push({
        level,
        id: match[2],
        title: match[3],
      })
    }
  }
  return res
}

export {
  toMarked,
  getFrontLines,
  dateFormat,
  getmdCatalogue,
}
