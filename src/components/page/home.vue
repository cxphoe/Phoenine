<template>
  <div>
    <div class="head">
      <img alt="Phoenine" src="static/img/bg.png">
    </div>
    <ProjectIntro :dataset=projects :showAmount=4></ProjectIntro>
    <ArticleIntro :dataset=articles :showAmount=4></ArticleIntro>
  </div>
</template>

<script>
import ProjectIntro from '../intro/project'
import ArticleIntro from '../intro/article'
import { getAsyncProjectsIntro } from '../data.js'
import articleDatabase from '../../database/article'

export default {
  name: 'Home',
  data: function () {
    return {
      projects: getAsyncProjectsIntro(),
      articles: articleDatabase.database,
    }
  },

  components: {
    ProjectIntro,
    ArticleIntro,
  },
}
</script>

<style lang="scss" scoped>
.head {
  text-align: center;
  background-color: #FFF;

  img {
    max-width: 100%;
    height: auto;
  }
}
</style>
