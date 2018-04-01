<template>
  <transition name="fade-slide-d">
    <div class="bg-white pa3 shadow--4dp">
      <ArticleEditor></ArticleEditor>
    </div>
  </transition>
</template>

<script>
import ArticleEditor from '../editor/article/article_editor'

export default {
  name: 'EditorPage',

  components: {
    ArticleEditor,
  },
}
</script>
