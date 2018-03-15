<template>
  <div>
    <div id="home-head">
      <img class="" alt="Phoenine" src="static/img/bg.png">
    </div>
    <ProjectIntro :dataset=projects :showAmount=4></ProjectIntro>
    <ArticleIntro :dataset=articles :showAmount=4></ArticleIntro>
  </div>
</template>

<script>
import ProjectIntro from '../intro/project'
import ArticleIntro from '../intro/article'
import { getAsyncProjectsIntro } from '../data.js'

export default {
  name: 'Home',
  data: function () {
    return {
      projects: getAsyncProjectsIntro(),
      articles: [
        {
          title: 'CSAPP',
          info: 'computer system from a programmer\'s prospective',
          articleTags: [
            'csapp', 'cs',
          ],
          updateDate: new Date(),
        },
        {
          title: 'SICP',
          info: 'solution of sicp',
          articleTags: [
            'sicp',
          ],
          updateDate: new Date(),
        },
      ],
    }
  },
  components: {
    ProjectIntro,
    ArticleIntro,
  }
}
</script>

<style lang="scss" scoped>
#home-head {
  text-align: center;
  background-color: #FFF;

  img {
    max-width: 100%;
    height: auto;
  }
}
</style>
