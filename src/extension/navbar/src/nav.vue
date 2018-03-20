<template>
  <nav class="ph-navbar">
    <slot></slot>
  </nav>
</template>

<script>
export default {
  name: 'PhNav',
}
</script>

<style lang="scss">
.ph-navbar {
  position: relative;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}

.ph-navbar-brand {
  display: inline-block;
  margin-top: auto;
  margin-bottom: auto;
  padding-top: .5rem;
  padding-bottom: .5rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
}

$nav-link-color: #52aac1;

.ph-nav-link {
  display: block;
  margin-top: auto;
  margin-bottom: auto;
  color: hsla(0, 0, 0, 0.4);
  font-weight: bold;
  padding: 1.25rem 1.5rem;
  border-bottom: 3px solid transparent;
  border-radius: 3px;

  &:hover {
    text-decoration: none;
    color: hsla(0, 0, 0, 0.7);
    border-bottom: 3px solid $nav-link-color;
  }
}
</style>
