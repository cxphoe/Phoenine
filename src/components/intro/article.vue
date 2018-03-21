<template>
  <IntroTemplate link=/article>
    <span slot="header">文章 · Article</span>
    <Loading size="xl" v-if="dataset.length === 0"></Loading>
    <div
      slot="mobile"
      v-for="(data, index) in introSet"
      :key="index"
    >
      <ArticleCard
        v-bind="data"
        class="mr4"
        style="width: 18rem"
      ></ArticleCard>
    </div>
    <el-col
      class="shrink-xxs"
      v-for="(data, index) in introSet"
      :md="12" :sm="24"
      :key="index"
    >
      <ArticleCard
        v-bind="data"
      ></ArticleCard>
    </el-col>
  </IntroTemplate>
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
@media screen and (max-width: 575px) {
  .shrink-xxs {
    width: 95%;
    margin-left: 2.5%;
  }
}
</style>
