<template>
  <button
    class="ph-tag"
    :class="classObj"
    type="button"
    :style="styleObj"
    @click="handleClick"
  >
    {{ content }}
    <i v-if="closable" class="fas fa-times-circle"></i>
  </button>
</template>

<script>
export default {
  name: 'PhTag',

  data() {
    return {
      classObj: {
        'ph-tag-default': !this.plain,
        'ph-tag-round': this.round,
        'ph-tag-plain': this.plain,
        'hover-bg-danger': this.closable,
      },
    }
  },

  props: {
    content: {
      type: String,
      required: true,
    },
    closable: Boolean,
    styleObj: Object,
    plain: Boolean,
    round: Boolean,
  },

  methods: {
    handleClick(event) {
      this.closable && this.$emit('close', this.content)
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss">
$tag-default-color: #495057;

.ph-tag {
  cursor: pointer;
  font-weight: 600;
  font-size: .8rem;
  padding: .25rem .5rem;
  line-height: 1;
  margin-bottom: .25rem;
}

.ph-tag-default {
  border-style: none;
  color: white;
  background-color: $tag-default-color;
}

.ph-tag-round {
  border-radius: 1rem;
}

.ph-tag-plain {
  border: 1px solid $tag-default-color;
  background-color: transparent;
  color: $tag-default-color;
}

.ph-tag + .ph-tag {
  margin-left: .5rem;
}

.ph-tag:focus {
  outline-style: none;
}

.hover-bg-danger:hover {
  background-color: #fa5252;
  color: #fff;
  border-style: none;
}
</style>
