import CommentDatabase from './comment'

class ArticleDatabase extends CommentDatabase {
  constructor() {
    super()
    this.currentID = 1
    this.database = [
      {
        filename: 'ph-blog-site',
        img: '/static/img/bg4.jpg',
        title: 'Phoenine博客网站',
        editedAt: '2018-2-28',
        articleTags: ['vue', 'elementUI'],
        category: '技术',
        content: `# Phoenine

> A Vue.js project

通过 Vue 以及 Element UI 搭建博客。Webpack 设置沿用 Vue 官网示例。

## Vue Router

通过 Vue Router 开发导航栏。

## CSS

利用 sass 将 color 以及 font-family 抽离成单独的文件，存放在 /src/sass-global 目录底下，并利用 sass-resources-loader 插件加载到全局。

将 /build/util.js 中 cssLoaders 的返回中加入 sass-resources-loader:

    return {
      css: generateLoaders(),
      postcss: generateLoaders(),
      less: generateLoaders('less'),
      sass: generateLoaders('sass', { indentedSyntax: true }),
      scss: generateLoaders('sass').concat({
        loader: 'sass-resources-loader',
        options: {
          resources: ['src/sass-global/*.scss']
        }
      }),
      ...
    }

另外，为了方便样式复用，把通用的 CSS 分离出来放在 /src/style 目录底下。`,
      },
      {
        filename: 'lalala',
        img: '/static/img/bg3.jpg',
        title: 'Phoenine博客网站',
        editedAt: '2018-3-25',
        articleTags: ['scss', 'vue'],
        category: '项目',
        content: `> A Vue.js project
        
通过 Vue 以及 Element UI 搭建博客。Webpack 设置沿用 Vue 官网示例。

## Vue Router

通过 Vue Router 开发导航栏。

## CSS

利用 sass 将 color 以及 font-family 抽离成单独的文件，存放在 /src/sass-global 目录底下，并利用 sass-resources-loader 插件加载到全局。

将 /build/util.js 中 cssLoaders 的返回中加入 sass-resources-loader:`,
      },
    ]
  }

  nextAvailID() {
    return ++this.currentID
  }

  getData(filename) {
    let db = this.database
    for (let index = 0; index < db.length; index++) {
      let data = db[index]
      if (filename === data.filename) {
        return {
          index,
          data,
        }
      }
    }
    return null
  }

  createDataset() {
    let newID = this.nextAvailID()
    let extendAttrs = {
      title: '',
      createdAt: '',
      views: 0,
      tags: [],
      content: '',
    }
    super.createDataset(newID, extendAttrs)
  }

  updateDataset(data) {
    let ds = this.getDataset()
    // 只更新dataset中存在的键，避免传入其他不相关的键
    for (let key in data) {
      if (key in ds) {
        ds[key] = data[key]
      }
    }
  }

  getDatabaseStat() {
    const archiveStat = {}
    const categoryStat = {}
    const tagStat = {}

    this.database.forEach(a => {
      let c = a.category
      categoryStat[c] = c in categoryStat
        ? categoryStat[c] + 1
        : 1

      let ts = a.articleTags
      ts.forEach(t => {
        tagStat[t] = t in tagStat
          ? tagStat[t] + 1
          : 1
      })

      let d = a.editedAt.split('-')
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

export default ArticleDatabase.instance()
