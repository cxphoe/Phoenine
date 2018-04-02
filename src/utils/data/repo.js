import axios from 'axios'
import { AsyncDataset } from './data'

const getRepoPath = function (gitName) {
  return `https://api.github.com/users/${gitName}/repos`
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
