<template>
  <div class="comment-editor">
    <div v-if="showExtraElt && note" class="mb1 gray6 f2">{{ note }}</div>
    <!-- debug component -->
    <el-input
      v-show="showExtraElt && debug"
      placeholder="请输入名字"
      v-model="user"
    ></el-input>
    <el-input
      type="textarea"
      placeholder="请输入评论内容，支持markdown语法"
      :rows="showExtraElt ? 8 : 2"
      class="comment-input"
      v-model="content"
      @focus="showAll = true"
    ></el-input>
    <div v-show="showExtraElt" class="flex mt2">
      <el-button
        type="primary"
        class="comment-editor-btn ml-auto bn disabled-btn"
        :disabled="!commentIsValid"
        @click="commentSubmit"
      >提交</el-button>
      <el-button
        v-show="collapsible"
        class="comment-editor-btn ml-auto bn gray6"
        @click="cancelEdit"
        plain
      >取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentEditor',

  data() {
    return {
      content: '',
      showAll: false,
      debug: true,
      user: '',
    }
  },

  props: {
    collapsible: Boolean,
    note: String,
    unfold: Boolean,
  },

  computed: {
    commentIsValid() {
      return this.content !== ''
    },

    showExtraElt() {
      return !this.collapsible || this.showAll || this.unfold
    },
  },

  methods: {
    commentSubmit() {
      let data = {
        date: new Date(),
        content: this.content,
        user: this.user,
      }
      this.$emit('submit', data)
      this.clearComment()
      this.showAll = false
    },

    clearComment() {
      this.content = ''
      this.user = ''
    },

    cancelEdit() {
      this.clearComment()
      this.showAll = false
      this.$emit('cancel-edit')
    },
  },
}
</script>

<style lang="scss">
.comment-editor {
  background-color: #fff;
  padding: .6rem 1rem;
  width: 100%;

  .comment-input input, .comment-input textarea {
    box-shadow: inset 0 0 1px 1px #eee;
    background-color: #fafbfc;

    &:focus {
      background-color: inherit;
    }
  }

  .comment-editor-btn {
    padding: .5rem 1rem;
  }
}

.disabled-btn:disabled {
  background-color: #ddd;

  &:hover {
    background-color: #ddd;
  }
}

.neg-mt {
  margin-top: -7px;
}
</style>
