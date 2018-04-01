<img src="/showcase/logo.png" height=100>

# Phoenine

> A Vue.js project

通过 Vue，Vue-router，axios 以及 Element UI 搭建博客。Webpack 设置沿用 [Vue 官网示例](https://vuejs-templates.github.io/webpack/)。

**Demo:** [blog.phoenine.com](https://blog.phoenine.com)

**Demo详情:** [phoeninee/blog](https://github.com/phoeninee/blog)

## CSS

使用scss。

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

另外，为了方便样式复用，把通用的 CSS 分离出来放在 /src/style 目录底下。

## Extended Components

在使用 Element UI 的过程中，发现一些组件的样式不符合自己的设计，且又没办法通过简单的样式覆盖或者会造成无用的样式过多，因此自己另外写了一些组件，在目录 /src/extension 底下。

以实现的组件有：

1. button
2. card
3. catalogue
4. checkbox
5. collapse
6. icon
7. navbar
8. sidebar
9. tabs
10. tag

详情见 [src/extension](src/extension)

## Features

通过 server/config.json （在生产环境将会被直接复制到根目录）设置博客信息：

	{
	  // 显示在博客中的名字
	  "username": "Phoenine",
	  // github用户名
	  "gitUsername": "Phoeninee",
	  // 文章读取路径
	  "articleBasePath": "/source",
	  // about信息路径
	  "aboutMePath": "/about_me",
	  
	  // 主要图片的路径
	  "imgPaths": {
		// 头像
	    "avatar": "/static/img/avatar.png",
		// 读取github库的logo失败时，使用的图片
	    "default": "/static/img/logo.png",
		// home页面右侧logo图片
	    "logo": "/static/img/logo.png",
		// 主侧边栏header背景图片
	    "sidebar": "/static/img/bg1.jpg",
		// home页面左侧motto背景图片
	    "motto": "/static/img/bg2.jpg"
	  }
	}

### github信息

通过 config.json 中的 gitUsername，使用 git API 获得 git repository 的信息

### 文章编辑界面

简单的编辑功能，目前主要是用来生成文章的配置文件，相关格式见 [server/source](server/source/) 中的 source.json。目前只支持自动下载生成的文章（可选）以及相关配置文件。需要手动将这些信息放到相应设置的文章读取路径：

- 文章需要放在[文章读取路径] / [生成配置信息时的年份] / [相应的月份] /
 路径下，文章名需与你在配置文件中的名字一致。
- 文件配置信息需添加到 [文章读取路径] / source.json 文件中

### 数据储存

目前假定是通过本地存储。通过 config.json 设置数据读取路径（articleBasePath）。所有文章信息在该路径下的 source.json 存储，在 src/database/article.js 读取并分析 。未来如果需要改变数据读取来源，只需在 article.js 中修改处理代码（只要文章数据格式不变）。

### 留言界面（未完成）

之前已实现一个留言版，但目前已没使用，主要是界面改版，以及主要是由于未能找到存储留言数据的方式。已 src/database 中的文件做数据模拟。

## Develop

### 安装

	npm install
	
### 运行

	npm run dev
	
### 打包编译

	npm run build
	
### 查看编译报告

	npm run build --report

在dist文件夹下生成结果。
