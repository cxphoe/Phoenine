const getSafeContent = function (text) {
  let reg = /(<script.*>.*<\/script>|<script.*\/>)/
  return text.replace(reg, '')
}

export {
  getSafeContent,
}
