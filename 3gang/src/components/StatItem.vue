<template>
  <div class="stat-item">
    <img :src="`/images/${icon}`" :alt="icon" class="stat-icon" />
    <span class="stat-value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  value: number
}

defineProps<Props>()
</script>

<style scoped>
.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.stat-item:hover {
  transform: scale(1.05);
}

.stat-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.stat-value {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .stat-icon {
    width: 28px;
    height: 28px;
  }
  
  .stat-value {
    font-size: 1.5rem;
  }
}
</style> 