import axios from 'axios'

const getData = function (url, success, fail) {
  axios.get(url).then(response => {
    success(response)
  }).catch(error => {
    console.log(error)
    let message = error.message
    let reg = /\d{3}/
    let match = reg.exec(message)
    let errcode = match[0]
    fail(errcode, message)
  })
}

const isSuccess = function (status) {
  let s = +status
  return (s >= 200 && s < 300) || s === 304
}

class AsyncDataset {
  constructor(path, processData = data => data) {
    this.status = null
    this.message = ''
    this.dataset = []
    this.getDataset(path, processData)
  }

  getDataset(path, processData) {
    getData(path, resp => {
      this.success(resp, processData)
    }, this.fail)
  }

  success(resp, processData) {
    this.status = resp.status
    let dataset = resp.data
    for (let data of dataset) {
      this.dataset.push(processData(data))
    }
  }

  fail(errcode, message) {
    this.status = errcode
    this.message = message
  }
}

export {
  getData,
  isSuccess,
  AsyncDataset,
}
