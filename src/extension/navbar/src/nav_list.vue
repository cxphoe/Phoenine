<template>
  <ul
    class="ph-nav-list"
    :class="[
      alignClass,
      itemClass,
      ...hiddenClass,
    ]"
    :style="styleObj"
  >
    <slot></slot>
  </ul>
</template>

<script>
import navMixin from './nav_mixin'

export default {
  name: 'PhNavList',

  mixins: [navMixin],

  data() {
    return {
      activeIndex: 0,
      items: [],
    }
  },

  props: {
    value: {},
    align: String,
    type: String,
  },

  computed: {
    alignClass() {
      return {
        'ml-auto': ['right', 'center'].includes(this.align),
        'mr-auto': ['left', 'center'].includes(this.align),
      }
    },
    itemClass() {
      return {
        'ph-nav-list-plain': this.type === 'plain',
        'ph-nav-list-card': this.type === 'card',
      }
    },
    styleObj() {
      return {
        'border-bottom': this.type === 'card'
          ? '1px solid #aaa'
          : '',
      }
    },
  },

  methods: {
    forceCancel(item) {
      this.items[this.activeIndex].forceCancel()
      this.activeIndex = item.index
    },
    isPhNavItem(el) {
      return el.$options.componentName === 'PhNavItem'
    },
  },

  mounted() {
    let index = 0
    this.$children.forEach(c => {
      if (this.isPhNavItem(c)) {
        c.index = index++
        this.items.push(c)
      }
    })
  },
}
</script>

<style lang="scss">
.ph-nav-list {
  list-style: none;
  display: flex;
  padding-left: 0;
  margin-bottom: 0;
  flex-direction: row;
}

$nav-link-color: #52aac1;

.ph-nav-list-plain {
  .ph-nav-item {
    display: block;
    margin-top: auto;
    margin-bottom: auto;
    color: hsla(0, 0, 0, 0.4);
    font-weight: bold;
    padding: 1.25rem 1.5rem;
    border-bottom: 3px solid transparent;
    border-radius: 3px;

    &:hover {
      color: hsla(0, 0, 0, 0.7);
      border-bottom: 3px solid $nav-link-color;
    }
  }

  .ph-nav-item-active {
    color: hsla(0, 0, 0, 0.7);
    border-bottom: 3px solid $nav-link-color;
  }
}

.ph-nav-list-card {
  .ph-nav-item {
    padding: .5rem;
    position: relative;
    border-color: transparent;
    border-style: solid;
    border-radius: 4px 4px 0 0;
    background-color: transparent;

    &:hover {
      background-color: #f3f3f3;
    }
  }

  .ph-nav-item-active {
    top: 1px;
    border-width: 1px 1px 0 1px;
    border-color: #aaa;
    background-color: #fff !important;
  }
}

.mr-auto {
  margin-right: auto;
}

.ml-auto {
  margin-left: auto;
}

@media (max-width: 576px) {
  .ph-hidden-xs-down {
    display: none;
  }
}

@media (max-width: 768px) {
  .ph-hidden-sm-down {
    display: none;
  }
}

@media (max-width: 992px) {
  .ph-hidden-md-down {
    display: none;
  }
}

@media (max-width: 1200px) {
  .ph-hidden-lg-down {
    display: none;
  }
}

@media (min-width: 576px) {
  .ph-hidden-xs-up {
    display: none;
  }
}

@media (min-width: 768px) {
  .ph-hidden-sm-up {
    display: none;
  }
}

@media (min-width: 992px) {
  .ph-hidden-md-up {
    display: none;
  }
}

@media (min-width: 1200px) {
  .ph-hidden-lg-up {
    display: none;
  }
}
</style>
