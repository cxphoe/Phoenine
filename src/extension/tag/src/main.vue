<template>
  <button
    class="ph-tag"
    :class="{ 'hover-bg-danger': closable }"
    type="button"
    :style="styleObj"
    @click="handleClick">
    {{ content }}
    <i v-if="closable" class="fas fa-times-circle"></i>
  </button>
</template>

<script>
export default {
  name: 'PhTag',

  props: {
    content: {
      type: String,
      required: true,
    },
    closable: Boolean,
    styleObj: Object,
  },

  methods: {
    handleClick(event) {
      this.closable && this.$emit('close', this.content)
    }
  }
}
</script>

<style>
.ph-tag {
  cursor: pointer;
  border-radius: 1rem;
  border-style: none;
  background-color: #495057;
  color: white;
  font-weight: 600;
  font-size: .8rem;
  padding: .25rem .5rem;
  line-height: 1;
  margin-bottom: .25rem;
}

.ph-tag + .ph-tag {
  margin-left: .5rem;
}

.ph-tag:focus {
  outline-style: none;
}

.hover-bg-danger:hover {
  background-color: #fa5252;
}
</style>
