<template>
  <ul class="ph-navbar-nav" :class="[alignClass, ...hiddenClass]">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'PhNavList',

  props: {
    hiddenUp: String,
    hiddenDown: String,
    align: {
      type: String,
    },
  },

  computed: {
    alignClass() {
      return {
        'ml-auto': ['right', 'center'].includes(this.align),
        'mr-auto': ['left', 'center'].includes(this.align),
      }
    },

    hiddenClass() {
      let sizes = ['lg', 'md', 'sm', 'xs']
      return ['Up', 'Down'].map(type => {
        let size = this['hidden' + type]
        return sizes.includes(size)
          ? `ph-hidden-${size}-${type.toLowerCase()}`
          : ''
      })
    }
  }
}
</script>

<style>
.ph-navbar-nav {
  list-style: none;
  display: flex;
  padding-left: 0;
  margin-bottom: 0;
  flex-direction: row;
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
