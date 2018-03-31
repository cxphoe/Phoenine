<template>
  <main class="flex flex-column pa4 w-100 shadow--4dp">
    <div class="mb3">
      <header class="flex flex-column flex-row-ns justify-between-ns
        items-center-ns bb bw2 b-gray2 pb3 mb3">
        <h1 class="mt-0 mb-0 f5 fw6">
          All {{ repos.length }} repositorys
        </h1>
        <div>
          <el-tooltip placement="top" content="complete版本">
            <el-button
              class="p-pick-btn"
              :class="{ 'p-pick-btn-active': mode === 'complete' }"
              @click="mode = 'complete'"
            >
              <i class="fas fa-th"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip placement="top" content="simple版本">
            <el-button
              class="p-pick-btn"
              :class="{ 'p-pick-btn-active': mode === 'simple' }"
              @click="mode = 'simple'"
            >
              <i class="fas fa-th-list"></i>
            </el-button>
          </el-tooltip>
        </div>
      </header>
      <div class="flex flex-row flex-wrap items-center">
        <el-tooltip
          placement="top"
          v-for="(tag, index) in selectedTags"
          :key="index"
          :content="`remove ${tag} filter`"
        >
          <ph-tag
            :content="tag"
            @close="handleClose"
            closable
            round
          ></ph-tag>
        </el-tooltip>
      </div>
    </div>
    <Loading v-if="status === null" size="xl" />
    <ErrorPage v-else-if="!success" :status="status" :statusText="message" />
    <section v-else class="flex flex-row ma0 pa0 flex-wrap">
      <RepositoryCard
        class="w-33-md w-50-sm w-100-xs"
        v-for="(data, index) in matchedRepos"
        v-bind="data"
        :key="index"
      ></RepositoryCard>
    </section>
  </main>
</template>

<script>
import Loading from '../../utils/loading'
import ErrorPage from '../../utils/error_page'
import RepositoryCard from '../../card/repository'
import { isSuccess } from '../../../utils/data/data'

export default {
  name: 'PageMain',

  data() {
    return {
      mode: 'complete',
    }
  },

  props: {
    selectedTags: {
      type: Array,
      required: true,
    },
    status: [Number, String, Object],
    message: String,
    repos: {
      type: Array,
      required: true,
    },
  },

  computed: {
    matchedRepos() {
      let tags = this.selectedTags
      return tags.length
        ? this.repos.filter(p => {
          return tags.every(tag => {
            return p.tags.indexOf(tag) >= 0
          })
        })
        : this.repos
    },

    success() {
      return isSuccess(this.status)
    },
  },

  methods: {
    handleClose(name) {
      this.$emit('cancel-tag', name)
    },
  },

  components: {
    Loading,
    ErrorPage,
    RepositoryCard,
  },
}
</script>

<style lang="scss" scoped>
.p-pick-btn {
  border: none;
  padding: .1rem;
  background-color: transparent;
  font-size: 1.25rem;

  &:focus {
    outline: none;
  }
}

.p-pick-btn-active {
  color: $color-first;
}

@media screen and (min-width: 886px)
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
