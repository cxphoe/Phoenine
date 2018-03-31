import { AsyncDataset } from '../utils/data/data'
import { dateCompare } from '../utils/article'

export default class ArticleDatabase extends AsyncDataset {
  success(resp) {
    super.success(resp, data => data)
    this.processDataset()
  }

  processDataset() {
    let ds = this.dataset
    const cmp = (data1, data2) => {
      return dateCompare(data1.editedAt, data2.editedAt)
    }
    ds.sort(cmp)
  }

  getArticle(filename) {
    let ds = this.dataset
    let amount = ds.length
    for (let index = 0; index < amount; index++) {
      let data = ds[index]
      if (data.filename === filename) {
        return {
          index,
          data,
        }
      }
    }
    return null
  }

  getDatabaseStat() {
    const archiveStat = {}
    const categoryStat = {}
    const tagStat = {}

    this.dataset.forEach(data => {
      let c = data.category
      categoryStat[c] = c in categoryStat
        ? categoryStat[c] + 1
        : 1

      let ts = data.tags
      ts.forEach(t => {
        tagStat[t] = t in tagStat
          ? tagStat[t] + 1
          : 1
      })

      let d = data.editedAt.split('-')
      let year = d[0]
      let month = d[1]
      let yearArchive = archiveStat[year]
      if (yearArchive) {
        yearArchive[month] = month in yearArchive
          ? yearArchive[month] + 1
          : 1
      } else {
        archiveStat[year] = {}
        archiveStat[year][month] = 1
      }
    })

    let aStat = []
    for (let year in archiveStat) {
      let yearArchive = archiveStat[year]
      for (let month in yearArchive) {
        aStat.push([[year, month], yearArchive[month]])
      }
    }

    aStat.sort((x, y) => {
      let [ year1, month1 ] = x[0]
      let [ year2, month2 ] = y[0]
      return year1 === year2
        ? month2 - month1
        : year2 - year1
    })

    return {
      archiveStat: aStat,
      categoryStat,
      tagStat,
    }
  }
}
