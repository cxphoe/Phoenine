<template>
  <div class="tc gray6">
    <h1>{{ status }}</h1>
    <p class="f4">{{ statusText }}</p>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',

  props: {
    status: [String, Number],
    statusText: String,
  },
}
</script>

<style lang="scss" scoped>
div {
  margin: 4rem 0;
}

h1 {
  font-size: 4rem;
}
</style>
