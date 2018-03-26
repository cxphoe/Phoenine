import CommentDatabase from './comment'

class ArticleDatabase extends CommentDatabase {
  constructor() {
    super()
    this.currentID = 1
    this.database = [
      {
        articleID: 1,
        title: 'Phoenine博客网站',
        editedAt: new Date(2018, 1, 30, 3, 5),
        views: 0,
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
        commentCurID: 0,
        commentAmount: 0,
        comments: {},
      },
    ]
  }

  nextAvailID() {
    return ++this.currentID
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
}

export default ArticleDatabase.instance()
