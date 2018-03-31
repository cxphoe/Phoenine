import axios from 'axios'
import path from 'path'
import { AsyncDataset } from './data'

const logoPath = '/master/showcase/logo.png'

const getRepoPath = function (gitName) {
  return `https://api.github.com/users/${gitName}/repos`
}

const contentBasePath = function (gitName) {
  return `https://raw.githubusercontent.com/${gitName}/`
}

const getContentUrl = function (gitName, repoName, filePath) {
  let res = path.join(contentBasePath(gitName), repoName, filePath)
  return res
}

const getRepoIntro = function (gitName) {
  return repo => {
    let projectData = {
      tags: [],
      name: repo.name,
      lang: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      homePage: repo.homepage,
      url: repo.html_url,
      description: repo.description,
      logo: getContentUrl(gitName, repo.name, logoPath),
    }

    axios.get(repo.languages_url)
      .then((response) => {
        let langs = Object.keys(response.data)
        projectData.tags.push(...langs)
      })

    return projectData
  }
}

const getAsyncReposIntro = function (gitName) {
  let repoPath = getRepoPath(gitName)
  return new AsyncDataset(repoPath, getRepoIntro(gitName))
}

export {
  getAsyncReposIntro,
}
