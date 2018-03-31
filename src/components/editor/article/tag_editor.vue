<template>
  <div class="tag-editor">
    <label>标签：</label>
    <ph-tag
      class="tag"
      v-for="(tag, index) in tags"
      :key="index"
      :content="tag"
      @close="handleClose"
      closable
      round
    />
    <span class="tag-adder">
      <input @keydown.enter="handleClick" v-model="content">
      <div
        class="tag-adder-icon"
        @click="handleClick"
      >
        <span>+</span>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'TagEditor',

  data() {
    return {
      content: '',
    }
  },

  props: {
    tags: Array,
  },

  methods: {
    handleClick() {
      let content = this.content.trim()
      if (content) {
        this.$emit('add-tag', content)
      }
      this.content = ''
    },

    handleClose(tag) {
      this.$emit('close-tag', tag)
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-editor {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: .8rem;

  label {
    margin: 0;
  }

  .tag {
    padding: 4px 5px 3px 7px;
    margin: 0 4px 0 0;
  }
}

.tag-adder {
  display: flex;
  align-items: center;
  border: 1px dashed #999;
  border-radius: 1rem;
  padding: .25rem .25rem .25rem .5rem;

  input {
    width: 60px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}

.tag-adder-icon {
  cursor: pointer;
  color: #fff;
  font-weight: 800;
  font-size: 20px;
  top: 0;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  position: relative;
  background-color: rgba($color-first, .7);
  user-select: none;

  &:hover {
    background-color: $color-first;
  }

  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
