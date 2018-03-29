<template>
  <div class="article-intro">
    <Loading size="xl" v-if="dataset.length === 0"></Loading>
    <ArticlePreviewCard
      v-for="(data, index) in introSet"
      v-bind="data"
      :key="index"
    ></ArticlePreviewCard>
  </div>
</template>

<script>
import ArticlePreviewCard from '../card/article/preview'
import { generateIntroObj } from './util'

export default generateIntroObj({
  name: 'ArticleIntro',

  components: {
    ArticlePreviewCard,
  },
})
</script>

<style lang="scss" scoped>
.article-intro {
  padding: 1.5rem .5rem;
}
</style>
