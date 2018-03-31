<template>
  <div>
    <Loading
      v-if="status === null"
      size="xl"
      class="mh-auto"
    ></Loading>
    <ErrorPage
      v-else-if="!success"
      :status="status"
      :statusText="message"
    ></ErrorPage>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
import Loading from '../utils/loading'
import ErrorPage from '../utils/error_page'
import { isSuccess } from '../../utils/data/data'

export default {
  name: 'IntroTemplate',

  props: {
    status: [Number, String, Object],
    message: [String],
    dataset: Array,
  },

  computed: {
    success() {
      return isSuccess(this.status)
    },
  },

  components: {
    Loading,
    ErrorPage,
  },
}
</script>
