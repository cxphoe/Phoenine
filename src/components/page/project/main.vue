<template>
  <main class="flex flex-column pa4 w-100">
    <div class="mb3">
      <header class="flex flex-column flex-row-ns justify-between-ns
        items-center-ns bb bw2 b-gray2 pb3 mb3">
        <h1 class="mt-0 mb-0 f5 fw6">
          All {{ projects.length }} projects
        </h1>
      </header>
      <div class="flex flex-row flex-wrap items-center">
        <ph-tag
          v-for="(tag, index) in selectedTags"
          :key="index"
          :content="tag"
          @close="handleClose"
          closable
        ></ph-tag>
      </div>
    </div>
    <section class="flex flex-row ma0 pa0 flex-wrap">
      <ProjectCard
        class="w-25-lg w-33-md w-50-sm w-100-xs"
        v-for="(data, index) in matchedProjects"
        :key=index
        v-bind=data
      ></ProjectCard>
    </section>
  </main>
</template>

<script>
import ProjectCard from '../../card/project'

export default {
  name: 'PageMain',

  props: {
    selectedTags: {
      type: Array,
      required: true,
    },

    projects: {
      type: Array,
      required: true,
    },
  },

  computed: {
    matchedProjects() {
      let tags = this.selectedTags
      return tags.length
        ? this.projects.filter(p => {
          return tags.every(tag => {
            return p.tags.indexOf(tag) >= 0
          })
        })
        : this.projects
    },
  },

  methods: {
    handleClose(name) {
      this.$emit('cancel-tag', name)
    },
  },

  components: {
    ProjectCard,
  },
}
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1330px) {
  .w-25-lg {
    width: 25%;
  }
}

@media screen and (max-width: 1330px)
              and (min-width: 886px)
{
  .w-33-md {
    width: 33.33333%;
  }
}

@media screen and (max-width: 886px)
              and (min-width: 600px)
{
  .w-50-sm {
    width: 50%;
  }
}

@media screen and (max-width: 600px)
{
  .w-100-xs {
    width: 100%;
  }
}
</style>
