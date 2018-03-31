import marked from 'marked'

const toMarked = function (text) {
  return marked(text)
}

const getSafeContent = function (text) {
  let reg = /(<script.*>.*<\/script>|<script.*\/>)/
  return text.replace(reg, '')
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

// convert format 'yyyy-mm-dd' into 'mm月 dd, yyyy'
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

// convert format 'yyyy-mm-dd' into '[yyyy, mm, dd]'
const convertDate = function (date) {
  return date.split('-').map(s => {
    return +s
  })
}

const dateCompare = function (date1, date2) {
  let [year1, month1, day1] = convertDate(date1)
  let [year2, month2, day2] = convertDate(date2)

  return year1 === year2
    ? month1 === month2
      ? day2 - day1
      : month2 - month1
    : year2 - year1
}

// retrieve headers(h1, h2, h3...) in html structure
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
  getSafeContent,
  getFrontLines,
  dateFormat,
  dateCompare,
  getmdCatalogue,
}
