import axios from 'axios'

const getData = function (url, success, fail) {
  axios.get(url).then(response => {
    success(response)
  }).catch(error => {
    let message = error.message
    let reg = /\d{3}/
    let match = reg.exec(message)
    let errcode = match[0]
    fail(errcode, message)
  })
}

const getFilePath = function (gitName, path) {
  return path
}

const processConfig = function (config) {
  let gitUsername = config.gitUsername
  delete config.gitUsername

  if (gitUsername) {
    let bp = config.basePath = ''

    let imgPaths = config.imgPaths
    for (let key in imgPaths) {
      imgPaths[key] += bp
    }
  }

  return config
}

export {
  getData,
  getFilePath,
  processConfig,
}
