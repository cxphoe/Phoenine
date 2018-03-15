<template>
  <div class="ph-card">
    <div
      class="ph-card--header"
      :style="headerStyle"
      v-if="$slots.header || header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="ph-card--body" :style="bodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhCard',

  props: ['header', 'headerStyle', 'bodyStyle'],
}
</script>

<style>
.ph-card--header, .ph-card--body {
  padding: 1rem 1.25rem;
}

.ph-card {
  padding: 0;
  border-radius: 6px;
  background-color: #fff;
  box-shadow: 0 5px 20px 1px #cccccc7e;
}
</style>
