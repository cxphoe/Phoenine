<template>
  <IntroTemplate link=/article>
    <span slot="header">文章 · Article</span>
    <el-col
      class="shrink-xxs"
      v-for="(data, index) in introSet"
      :sm=12 :xs=24
      :key=index>
      <ArticleCard
        v-bind=data
      ></ArticleCard>
    </el-col>
  </IntroTemplate>
</template>

<script>
import ArticleCard from '../card/article'
import { generateIntroObj } from './util'
import IntroTemplate from './tmpl'

export default generateIntroObj({
  name: 'HomeArticleIntro',
  components: {
    IntroTemplate,
    ArticleCard,
  },
})
</script>

<style lang="scss" scoped>
@media screen and (max-width: 575px) {
  .shrink-xxs {
    width: 95%;
    margin-left: 2.5%;
  }
}
</style>
