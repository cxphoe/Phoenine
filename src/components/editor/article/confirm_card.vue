<template>
  <div class="confirm-card">
    <div class="confirm-table-wrapper mh-auto mv-auto">
      <el-table :data="configData" class="confirm-table w-100 bg-white">
        <el-table-column prop="item" label="配置项" width="120" />
        <el-table-column prop="value" label="值" />
      </el-table>
      <div class="flex mt2 pull-right">
        <el-button plain @click="handleCancel">返回</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
const mappings = {
  title: '标题',
  img: '图片路径',
  filename: '文件名',
  category: '分类',
  brief: '摘要',
  tags: '标签',
}

export default {
  name: 'ConfirmCard',

  props: {
    form: Object,
    tags: Array,
    filename: String,
  },

  computed: {
    configData() {
      let form = this.form
      let tags = this.tags
      let filename = this.filename
      let data = []

      for (let key in form) {
        if (key in mappings && key !== 'filename') {
          data.push({
            item: mappings[key],
            value: form[key],
          })
        }
      }
      data.push({
        item: mappings['tags'],
        value: tags.join(', '),
      })
      data.push({
        item: mappings['filename'],
        value: filename,
      })

      return data
    },
  },

  methods: {
    handleCancel() {
      this.$emit('cancel')
    },

    handleSubmit() {
      this.$emit('submit')
    },
  },
}
</script>

<style lang="scss" scoped>
.confirm-card {
  position: fixed;
  display: flex;
  z-index: 5;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(#000, .5);
}

.confirm-table {
  padding: 1rem;
  border-radius: .25rem;
}

.confirm-table-wrapper {
  max-width: 800px;
  width: 95%;
}
</style>
