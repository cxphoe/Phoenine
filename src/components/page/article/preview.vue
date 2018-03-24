<template>
  <div>
    <ArticleDetail
      v-for="(data, index) in dataset"
      v-bind="data"
      :key="index"
    ></ArticleDetail>
  </div>
</template>

<script>
import ArticleDetail from '../../detail/article'

export default {
  name: 'ArticalPagePreivew',

  data () {
    return {}
  },

  props: {
    dataset: Array,
  },

  components: {
    ArticleDetail,
  },
}
</script>

<style>

</style>
