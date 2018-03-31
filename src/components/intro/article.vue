<template>
  <IntroTemplate
    class="pv4 ph2"
    :status="status"
    :message="message"
  >
    <ArticlePreviewCard
      v-for="(data, index) in introSet"
      v-bind="data"
      :key="index"
    ></ArticlePreviewCard>
  </IntroTemplate>
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
