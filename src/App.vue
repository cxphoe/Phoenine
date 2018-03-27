<template>
  <div id="app">
    <div id="top"></div>
    <Sidebar/>
    <main class="app-main">
      <transition name="fade-slide-d" mode="out-in">
        <router-view/>
      </transition>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Sidebar from './components/sidebar'
import Footer from './components/footer'

export default {
  name: 'App',
  components: {
    Sidebar,
    Footer,
  },
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-text;
  background-color: #e9eaeb;

  .app-main {
    width: 100%;
    max-width: 900px;
    margin: 0 auto 10rem;
    padding-top: 10rem;

    @media screen and (max-width: 670px) {
      padding-top: 0;
    }
  }

  *::selection {
    background: #b3d4fc;
    text-shadow: none;
  }
}

body {
  font-family: $font-main;
}
</style>
