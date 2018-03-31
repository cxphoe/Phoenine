<template>
  <div class="ph-card">
    <template
      v-if="$slots.media"
      @click="handleMediaClick"
    >
      <slot name="media"></slot>
    </template>
    <div
      class="ph-card__header"
      :class="{ plain: plain }"
      :style="headerStyle"
      v-if="$slots.header || header"
    >
      <slot name="header">{{ header }}</slot>
    </div>
    <div
      class="ph-card__body"
      :class="{ plain: plain }"
      :style="bodyStyle"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhCard',

  props: {
    header: String,
    headerStyle: Object,
    bodyStyle: Object,
    plain: Boolean,
    router: Boolean,
  },

  computed: {
    mediaLink() {
      let medias = this.$slots.media
      if (!medias) {
        return null
      }

      let media = medias[0]
      let children = media.children
      for (let c of children) {
        if (c.tag === 'a' || c.tag.indexOf('router-link') > -1) {
          return this.router ? c.elm.pathname : c.elm.href
        }
      }
      return null
    },
  },

  methods: {
    handleMediaClick() {
      let link = this.mediaLink
      if (link) {
        if (this.router) {
          this.$router.push(link)
        } else {
          window.location = this.mediaLink
        }
      }
    },
  },

  mounted() {
    let mediaSlot = this.$slots.media
    if (mediaSlot) {
      let $el = mediaSlot[0].elm
      $el.className += ' ph-card__media'
      $el.onclick = this.handleMediaClick
    }
  },
}
</script>

<style lang="scss">
.ph-card__media {
  flex-grow: 1;
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  cursor: pointer;

  background-color: #52aac1;
  background-repeat: repeat;
  background-position: 50% 50%;
  background-size: cover;
  background-origin: padding-box;
  background-attachment: scroll;
  box-sizing: border-box;
}

.ph-card__header, .ph-card__body {
  padding: 1rem 1.25rem;

  &.plain {
    padding: 0;
  }
}

.ph-card {
  display: flex;
  flex-direction: column;
  font-size: 1pc;
  font-weight: 400;
  min-height: 200px;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  margin: 0 .5rem 2rem;
  padding: 0;
  border-radius: 3px;
  background-color: #fff;
  box-shadow:
    0 2px 2px 0 rgba(0,0,0,.14),
    0 3px 1px -2px rgba(0,0,0,.2),
    0 1px 5px 0 rgba(0,0,0,.12);
}
</style>
