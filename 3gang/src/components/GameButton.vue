<template>
  <button 
    class="game-button" 
    @click="$emit('click')"
    @mouseenter="playHoverSound"
    @click.native="playClickSound"
  >
    <img :src="`/images/${icon}`" :alt="icon" class="button-icon" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  icon: string
}

defineProps<Props>()
defineEmits<{
  (e: 'click'): void
}>()

// Можно добавить звуки позже
const playHoverSound = () => {
  // TODO: Добавить звук при наведении
}

const playClickSound = () => {
  // TODO: Добавить звук при клике
}
</script>

<style scoped>
.game-button {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.game-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.button-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .game-button {
    padding: 8px;
  }
  
  .button-icon {
    width: 24px;
    height: 24px;
  }
}
</style>