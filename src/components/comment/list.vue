<template>
  <div class="comment-list">
    <div class="comment-list-header">
      <span>{{ header }}</span>
      <span class="f2 ml2 gray5">· {{ dataset.length }}条评论</span>
    </div>
    <ul class="comment-list-body">
      <div id="__editor-ctn">
        <CommentEditor
          class="left-0-sm-down b-up-ddd"
          :collapsible="true"
          :note="commentNote"
          :unfold="showEditor"
          :class="{
            'fixed-bottom': editorBottomed,
            'ph-container-wo-xl': editorBottomed,
          }"
          @submit="handleSubmit"
          @cancel-edit="handleCancel"
        ></CommentEditor>
      </div>
      <div v-if="emptyCmtList" class="tc pa5">
        <h3 class="gray3">还没有评论</h3>
      </div>
      <template v-else>
        <Comment
          v-for="(comment, cid, index) in commentList"
          v-bind="comment"
          :key="index"
          :cid="cid"
          :baseTime="baseTime"
          :commentList="commentList"
          @reply="handleReply"
          @check-convr="handleCheckConvr"
          @check-replys="handleCheckReplys"
        ></Comment>
      </template>
    </ul>
    <CommentDialog
      title="查看对话"
      :dialogVisible.sync="convrDialog.visible"
      :comments="convrDialog.comments"
      :commentList="commentList"
      :baseTime="baseTime"
    ></CommentDialog>
    <CommentDialog
      title="查看回复"
      :dialogVisible.sync="replysDialog.visible"
      :comments="replysDialog.comments"
      :commentList="commentList"
      :baseTime="baseTime"
    ></CommentDialog>
  </div>
</template>

<script>
import Comment from './comment'
import CommentEditor from './editor'
import CommentDialog from './dialog'
import { getBottomEdgeScreenTop } from '../../util'
import { getWholeConvr } from './util'

export default {
  name: 'CommentList',

  data() {
    return {
      showEditor: false,
      baseTime: new Date(),
      // editorContainerScreenBottom
      edrCtnrScrBot: null,
      replyTargetData: null,
      // conversation
      convrDialog: {
        visible: false,
        comments: null,
      },
      replysDialog: {
        visible: false,
        comments: null,
      },
    }
  },

  props: {
    dataset: Object,
    header: {
      type: String,
      default: '评论'
    },
  },

  computed: {
    commentList() {
      return this.dataset.comments
    },

    editorBottomed() {
      let e = this.edrCtnrScrBot
      return e !== null && e <= window.innerHeight
    },

    commentNote() {
      let data = this.replyTargetData
      return data ? `回复"${data.user}"中...` : '正在评论中...'
    },

    emptyCmtList() {
      return this.dataset.length === 0
    }
  },

  methods: {
    handleScroll(event) {
      this.edrCtnrScrBot = getBottomEdgeScreenTop(this.editorCtnr)
    },

    handleReply(targetID, user) {
      this.replyTargetData = {
        targetID,
        user,
      }
      this.showEditor = true
    },

    handleSubmit(data) {
      if (this.replyTargetData) {
        data.replyTargetID = this.replyTargetData.targetID
        this.showEditor = false
        this.replyTargetData = null
      }
      this.$emit('submit', data)
      this.baseTime = new Date()
    },

    handleCancel() {
      this.showEditor = false
      this.replyTargetData = null
    },

    handleCheckConvr(cid) {
      let cd = this.convrDialog
      let clist = this.commentList
      let comments = getWholeConvr(cid, clist)
      cd.comments = comments
      cd.visible = true
    },

    handleCheckReplys(cid) {
      let rd = this.replysDialog
      let clist = this.commentList
      let self = clist[cid]
      let replys = self.replys.map(id => {
        return clist[id]
      })

      rd.comments = [self, ...replys]
      rd.visible = true
    },
  },

  components: {
    Comment,
    CommentEditor,
    CommentDialog,
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    // this.editorContainer
    this.editorCtnr = document.querySelector('#__editor-ctn')
  },
}
</script>

<style lang="scss">
.comment-list {
  margin: 2rem 0 8rem;
}

.comment-list-body {
  padding: 0;
  list-style: none;
}

.comment-list-header {
  font-size: 1.5rem;
  margin-bottom: .5rem;
}

.comment-button {
  background-color: #eef7f9;
  border-radius: .5rem;
  font-size: .8rem;
}

@media screen and (max-width: 576px) {
  .left-0-sm-down {
    left: 0;
  }
}

.b-up-ddd {
  border-top: 1px solid #ddd;
}
</style>
