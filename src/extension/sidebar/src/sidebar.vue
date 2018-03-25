<template>
  <div
    ref="ph-sidebar"
    class="ph-sidebar"
    :class="{ cover: (open && cover) }"
    @click="handleLayerClick"
  >
    <ph-menu-icon
      class="ph-sidebar-icon"
      v-model="open"
    ></ph-menu-icon>
    <aside
      ref="aside"
      class="ph-sidebar-content"
      :class="{ open: open }"
      @click="handleAsideClick"
    >
      <slot></slot>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'PhSidebar',

  componentName: 'PhSidebar',

  data() {
    return {
      open: true,
    }
  },

  props: {
    closable: Boolean,
    cover: Boolean,
  },

  methods: {
    handleItemClick() {
      this.open = false
      this.$emit('item-click')
    },

    handleLayerClick(ev) {
      if (ev.target === this.$el) {
        this.open = false
      }
    },

    handleAsideClick(ev) {
      if (ev.target === this.$refs.aside) {
        this.$emit('aside-click')
      }
    },
  },

  created() {
    this.$on('__item-click', this.handleItemClick)
  },
}
</script>

<style lang="scss">
$open-width: 280px;
$open-width-md: 16pc;

.ph-sidebar {
  transition: .5s;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;

  &.cover {
    width: 100%;
    background-color: rgba(0, 0, 0, .3);
  }
}

.ph-sidebar-icon {
  position: absolute;
  left: 1.5rem;
  top: 2.3rem;
  z-index: 1001;
}

.ph-sidebar-content {
  transition: .5s;
  position: absolute;
  box-shadow: 2px 0 15px rgba(0, 0, 0,.35);
  top: 0;
  bottom: 0;
  width: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  z-index: 1000;

  &.open, & > * {
    width: $open-width;

    @media screen and (max-width: 768px) {
      & {
        width: $open-width-md;
      }
    }
  }

  & > * {
    overflow: hidden;
  }

  &::-webkit-scrollbar {
    width: .35rem;
    background-color: #f7f8f9;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: .5rem;
    background-color: #b9b8b8;
  }

  &::-webkit-scrollbar-track {
    border-radius: .25rem;
  }
}
</style>
