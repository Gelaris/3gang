<template>
  <div class="container">
    <img src="/images/bg.png" class="background" alt="background" />
    <HelloWorld />
  </div>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';

</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.background {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  width: auto;
  object-fit: contain;
  z-index: -1;
}

@media screen and (max-width: 768px) {
  .background {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
