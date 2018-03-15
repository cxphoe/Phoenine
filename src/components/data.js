import axios from 'axios'
import marked from 'marked'

const userName = 'phoeninee'

const repoPath = `https://api.github.com/users/${userName}/repos`
const contentBasePath = `https://raw.githubusercontent.com/${userName}/`
const logoPath = '/master/showcase/logo.png'
const readmePath = '/master/README.md'

const repoBasePath = `https://api.github.com/repos/${userName}/`

const getContentUrl = function (repoName, filePath) {
  return contentBasePath + repoName + filePath
}

const getProjectIntro = function (repo) {
  let projectData = {
    tags: [],
    name: repo.name,
    lang: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    homePage: repo.homepage,
    url: repo.html_url,
    description: repo.description,
    logo: getContentUrl(repo.name, logoPath),
  }

  axios.get(repo.languages_url)
    .then((response) => {
      let langs = Object.keys(response.data)
      projectData.tags.push(...langs)
    })

  return projectData
}

const getProjectDetail = function (data, repo) {
  let name = repo.name
  data.description = repo.description
  data.logo = getContentUrl(name, logoPath)
  data.lang = repo.language
  data.url = repo.html_url
  data.homePage = repo.homepage

  axios.get(getContentUrl(name, readmePath))
    .then((response) => {
      data.doc = marked(response.data)
      console.log(data)
    })
}

const getAsyncProjectsIntro = function () {
  let dataset = []
  axios.get(repoPath)
    .then((response) => {
      response.data.forEach((repo) => {
        if (repo.has_pages) {
          dataset.push(getProjectIntro(repo))
        }
      })
    })
  return dataset
}

const getAsyncProjectDetail = function (name) {
  // 初始化数据
  let data = {
    name,
    logo: '',
    lang: '',
    description: '',
    doc: '',
    contentPath: contentBasePath + name + '/master/',
  }
  let path = repoBasePath + name

  axios.get(path)
    .then((response) => {
      getProjectDetail(data, response.data)
    })

  return data
}

export {
  getAsyncProjectsIntro,
  getAsyncProjectDetail,
}
