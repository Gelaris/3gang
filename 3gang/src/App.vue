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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #242424;
  padding: 1rem;
}

.stats {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  font-size: 1.5em;
  width: 100%;
}

.actions {
  margin-top: auto;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  width: 100%;
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
  .container {
    padding: 0.5rem;
  }
}
</style>
