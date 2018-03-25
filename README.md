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
3. collapse
	1. collapse
	2. collapse-item
4. icon
	1. arrow-icon
	2. menu-icon
5. navbar
	1. nav
	2. list
	3. item
6. sidebar
	1. sidebar
	2. sidebar-divider
	3. sidebar-item
	4. sidebar-list
7. tabs
	1. tabs
	2. tab-pane
8. tag

## Features

- [x] 通过git API获得git repository的信息
- [x] 登陆界面：暂时没有用户数据获取的功能
- [x] 留言界面
- [ ] 文章编辑界面
- [ ] 数据储存：暂时通过本地缓存模拟，在/database目录底下

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