<template>
  <el-dialog
    :title="title"
    :visible.sync="visiable"
    :width="width"
  >
    <Comment
      v-for="(comment, index) in comments"
      v-bind="comment"
      :key="index"
      :commentList="commentList"
      :baseTime="baseTime"
      checkDisabled
    ></Comment>
  </el-dialog>
</template>

<script>
import Comment from './comment'
import { isMobile } from '../../util'

export default {
  name: 'CommentDialog',

  props: {
    title: String,
    comments: Array,
    dialogVisible: Boolean,
    commentList: Object,
    baseTime: Date,
  },

  computed: {
    visiable: {
      get() {
        return this.dialogVisible
      },

      set(newVal) {
        // 触发 .sync 绑定属性的更新
        this.$emit('update:dialogVisible', newVal)
      }
    },
    width() {
      return isMobile() ? '100%' : '50%'
    }
  },

  components: {
    Comment,
  },
}
</script>

<style>

</style>
