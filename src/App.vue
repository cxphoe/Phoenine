<template>
  <div id="app">
    <Nav/>
    <transition name="fade-slide" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Nav from './components/sidebar'

export default {
  name: 'App',
  components: {
    Nav,
  },
}
</script>

<style lang="scss">
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all .5s;
}

.fade-slide-enter, .fade-slide-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

.fade-slide-move {
  transition: transform .5s;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-text;
}

body {
  font-family: $font-main;
}
</style>
