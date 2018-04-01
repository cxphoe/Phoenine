<template>
  <IntroTemplate
    class="mv4 mh2 flex of-auto slim-scrollbar of-scroll-touch"
    :status="status"
    :message="message"
  >
    <RepositoryCard
      class="mr3"
      v-for="(data, index) in introSet"
      v-bind="data"
      :key="index"
    ></RepositoryCard>
  </IntroTemplate>
</template>

<script>
import RepositoryCard from '../card/repository'
import { generateIntroObj } from './util'

export default generateIntroObj({
  name: 'RepositoryIntro',

  components: {
    RepositoryCard,
  },
})
</script>
