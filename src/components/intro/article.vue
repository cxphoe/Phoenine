<template>
  <div class="article-intro">
    <Loading size="xl" v-if="dataset.length === 0"></Loading>
    <ArticleCard
      v-for="(data, index) in introSet"
      v-bind="data"
      :key="index"
    ></ArticleCard>
  </div>
</template>

<script>
import ArticleCard from '../card/article'
import { generateIntroObj } from './util'

export default generateIntroObj({
  name: 'ArticleIntro',

  components: {
    ArticleCard,
  },
})
</script>

<style lang="scss" scoped>
.article-intro {
  margin: 1.5rem .5rem;
}
</style>
