<template>
  <transition name="fade-slide">
    <div class="project">
      <ProjectCompleteCard
        v-if="safeMode === 'complete'"
        v-bind="data"
      ></ProjectCompleteCard>
      <ProjectSimpleCard
        v-else
        v-bind="data"
      ></ProjectSimpleCard>
    </div>
  </transition>
</template>

<script>
import ProjectSimpleCard from './simple_card'
import ProjectCompleteCard from './complete_card'

export default {
  name: 'ProjectCard',

  props: {
    data: {
      type: Object,
      required: true,
    },
    mode: {
      type: String,
      default: 'complete',
    },
  },

  computed: {
    safeMode() {
      return this.mode === 'simple' ? 'simple' : 'complete'
    },
  },

  components: {
    ProjectSimpleCard,
    ProjectCompleteCard,
  },
}
</script>

<style lang="scss" scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all .5s;
}

.fade-slide-enter, .fade-slide-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

.fade-slide-move {
  transition: transform .5s;
}

.project {
  margin-bottom:20px;
  align-items: center;

  .ph-card {
    width: 16rem;
    margin: auto;
    border-color: transparent;
    border-radius: 10px;
    box-shadow: 0 5px 20px 1px #cccccc7e;

    &:hover {
      transition: 300ms;
      box-shadow: 0 10px 20px 2px #cccccc;
      transform: translateY(-5px);
    }
  }
}
</style>
