<template>
  <div id="app">
    <div id="top"></div>
    <Sidebar/>
    <main class="app-main">
      <transition name="fade-slide-d" mode="out-in">
        <router-view/>
      </transition>
    </main>
    <Footer ref="footer"/>
    <ph-button
      id="to-top"
      @click="scrollToTop"
    >
      <i class="fas fa-angle-up"></i>
    </ph-button>
  </div>
</template>

<script>
import Sidebar from './components/sidebar'
import Footer from './components/footer'
import { scrollTo } from './utils/position'

export default {
  name: 'App',

  methods: {
    handleScroll() {
      let {
        $top,
        $toTop,
        $footer,
      } = this
      let bottom = $top.getBoundingClientRect().bottom
      $toTop.style.right = bottom < -300 ? '1.25rem' : ''

      let b = $footer.getBoundingClientRect()
      let footerToBottom = window.innerHeight - b.top
      let hitFooter = footerToBottom >= $toTop.dataset.middle

      let s = $toTop.style
      s.position = hitFooter ? 'absolute' : ''
      s.bottom = hitFooter
        ? `${b.height - $toTop.offsetHeight / 2}px`
        : ''
    },

    getToTopMiddle() {
      let b = this.$toTop.getBoundingClientRect()
      this.$toTop.dataset.middle = 25 + b.height / 2
    },

    scrollToTop() {
      scrollTo(this.$top)
    },
  },

  components: {
    Sidebar,
    Footer,
  },

  mounted() {
    this.$top = document.querySelector('#top')
    this.$toTop = document.querySelector('#to-top')
    this.$footer = this.$refs.footer.$el
    this.getToTopMiddle()
    window.onscroll = this.handleScroll
  },
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-text;
  background-color: #e9eaeb;
  position: relative;

  .app-main {
    width: 100%;
    max-width: 900px;
    margin: 0 auto 6rem;
    padding-top: 10rem;

    @media screen and (max-width: 670px) {
      padding-top: 0;
    }
  }

  *::selection {
    background: #b3d4fc;
    text-shadow: none;
  }

  #to-top {
    transition: right .1s;
    position: fixed;
    bottom: 25px;
    right: -42px;
    padding: 1.25rem;
    font-size: 1.25rem;
    color: #fff;
    background-color: $color-first;

    &:hover {
      background-color: rgba($color-first, .9);
    }
  }
}

body {
  font-family: $font-main;
}
</style>
