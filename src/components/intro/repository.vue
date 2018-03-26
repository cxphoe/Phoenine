<template>
  <div class="repository-intro slim-scrollbar">
    <Loading size="xl" v-if="dataset.length === 0"></Loading>
    <RepositoryCard
      class="mr3"
      v-for="(data, index) in introSet"
      v-bind="data"
      :key="index"
    ></RepositoryCard>
  </div>
</template>

<script>
import RepositoryCard from '../card/repository'
import { generateIntroObj } from './util'
import ErrorPage from '../utils/error_page'

export default generateIntroObj({
  name: 'RepositoryIntro',

  components: {
    RepositoryCard,
    ErrorPage,
  },
})
</script>

<style lang="scss" scoped>
.repository-intro {
  margin: 1.5rem .5rem;
  display: flex;
  overflow: auto;
}
</style>
