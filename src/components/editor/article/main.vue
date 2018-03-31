<template>
  <div class="article-editor">
    <div class="mb2 f2 fw6 color-first editor-header">
      <span>
        此编辑器用来生成文件的配置文件，生成之后自动下载。请自行将下载文件放到相应的目录下。
        输入内容以及标签可选。如需要直接使用已经编辑好的文件，请确保文件名与表中的文件名一致。
      </span>
      <el-button
        class="ml2"
        size="mini"
        type="primary"
        @click="submitForm('form')"
      >生成</el-button>
    </div>
    <el-form role="form" ref="form" :model="form" :rules="rules">
      <el-row :gutter="20">
        <el-col :sm="12">
          <el-form-item prop="title">
            <el-input
              size="small"
              v-model="form.title"
              placeholder="标题"
              aria-placeholder="标题"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12">
          <el-form-item prop="filename">
            <el-input
              size="small"
              v-model="form.filename"
              placeholder="保存的文件名"
              aria-placeholder="保存的文件名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12">
          <el-form-item prop="category">
            <el-input
              size="small"
              v-model="form.category"
              placeholder="分类"
              aria-placeholder="分类"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="12">
          <el-form-item prop="img">
            <el-input
              size="small"
              v-model="form.img"
              placeholder="图片地址可选（链接或绝对地址）"
              aria-placeholder="图片地址"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="brief">
        <el-input
          v-model="form.brief"
          type="textarea"
          placeholder="摘要"
          aria-placeholder="摘要"
        ></el-input>
      </el-form-item>
      <TagEditor
        :tags="tags"
        @add-tag="addTag"
        @close-tag="closeTag"
      ></TagEditor>
      <el-tabs type="border-card">
        <el-tab-pane label="编辑">
          <el-form-item prop="content">
            <el-input
              v-model="form.content"
              type="textarea"
              placeholder="内容"
              aria-placeholder="内容"
              :rows="30"
            ></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="预览">
          <div class="markdown-body" v-html="markedHtml">lalal</div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import { toMarked, getSafeContent } from '../../../utils/article'
import TagEditor from './tag'

export default {
  name: 'ArticleEditor',

  data() {
    return {
      form: {
        img: '',
        title: '',
        filename: '',
        category: '',
        brief: '',
        content: '',
      },
      tags: [],
      rules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur',
          },
        ],
        filename: [
          {
            required: true,
            message: '请输入保存的文件名',
            trigger: 'blur',
          },
        ],
        category: [
          {
            required: true,
            message: '请输入分类',
            trigger: 'blur',
          },
        ],
        brief: [
          {
            required: true,
            message: '请输入摘要',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  computed: {
    markedHtml() {
      let safe = getSafeContent(this.form.content)
      return toMarked(safe)
    },
  },

  methods: {
    addTag(tag) {
      if (this.tags.includes(tag)) {
        this.$message({
          type: 'warn',
          message: `标签${tag}已存在`,
        })
      } else {
        this.tags.push(tag)
      }
    },

    closeTag(tag) {
      let index = this.tags.indexOf(tag)
      this.tags.splice(index, 1)
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.generateFile()
          this.$message({
            type: 'info',
            message: '生成文件成功',
          })
          this.resetForm()
        } else {
          this.$message({
            type: 'error',
            message: '生成文件失败',
          })
        }
      })
    },

    resetForm() {
      for (let key in this.form) {
        this.form[key] = ''
      }
      this.tags = []
    },

    generateFile() {
      let { filename, content } = this.form
      let configInfo = this.generateConfig()
      console.log(configInfo)
      this.saveFile(configInfo, filename + '.json')

      if (content.length !== 0) {
        this.saveFile(content, filename + '.md')
      }
    },

    generateTime() {
      let time = new Date()
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      return { year, month, day }
    },

    generateConfig() {
      let time = this.generateTime()
      let { img, title, brief, category } = this.form
      let tags = this.tags
      let path = this.generateConfigFilePath(time)

      let config = {
        img,
        title,
        brief,
        editedAt: Object.values(time).join('-'),
        category,
        tags,
        path,
      }
      return JSON.stringify(config)
    },

    generateConfigFilePath(time) {
      let filename = this.form.filename
      let {
        basePath,
        articleBasePath,
      } = this.getGlobalConfig()
      if (articleBasePath) {
        basePath += `/${articleBasePath}`
      }
      let archiveDate = time.year + '/' + time.month
      let path = [
        basePath,
        archiveDate,
        filename + '.md',
      ].join('/')
      console.log(path)
      return path
    },

    saveFile(text, filename) {
      let file = new File([text], filename, {
        type: 'text/plain',
      })
      FileSaver.saveAs(file)
    },
  },

  components: {
    TagEditor,
  },
}
</script>

<style lang="scss" scoped>
.article-editor {
  border: 2px dashed #ddd;
  border-radius: .5rem;
  padding: 1rem;
  min-height: 25pc;

  textarea {
    font-family: $font-main;
  }

  .editor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.color-first {
  color: $color-first;
}

.markdown-body {
  min-height: 10pc;
}
</style>
