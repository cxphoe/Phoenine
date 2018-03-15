<img src="/showcase/logo.png" height=50>

# Phoenine

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

另外，为了方便样式复用，把通用的 CSS 分离出来放在 /src/style 目录底下。

## Extended Components

在使用 Element UI 的过程中，发现一些组件的样式不符合自己的设计，且又没办法通过简单的样式覆盖或者会造成无用的样式过多，因此自己另外写了一些组件，在目录 /src/extension 底下。

以实现的组件有：

1. card
2. checkbox
	1. singleton
	2. group
3. navbar
	1. list
	2. item
4. tag

## Features

- [x] 通过git API获得git repository的信息
- [ ] 登陆界面
- [ ] 留言界面
- [ ] 文章编辑界面
- [ ] 数据储存

## Developing

### 安装

	npm install
	
### 运行

	npm run dev
	
### 打包编译

	npm run build
	
### 查看编译报告

	npm run build --report

在dist文件夹下生成结果。