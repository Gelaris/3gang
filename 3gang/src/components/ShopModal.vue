<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-content">
      <header class="modal-header">
        <h2>Магазин</h2>
        <button class="close-button" @click="$emit('close')">×</button>
      </header>
      
      <div class="modal-body">
        <!-- Здесь будут товары -->
        <div class="shop-items">
          <div v-for="item in items" :key="item.id" class="shop-item">
            <img :src="`/images/${item.icon}`" :alt="item.name" />
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">${{ item.price }}</span>
            <button 
              class="buy-button"
              :disabled="money < item.price"
              @click="$emit('buy', item)"
            >
              Купить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ShopItem {
  id: number
  name: string
  icon: string
  price: number
}

interface Props {
  isOpen: boolean
  money: number
  items: ShopItem[]
}

defineProps<Props>()
defineEmits<{
  (e: 'close'): void
  (e: 'buy', item: ShopItem): void
}>()
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #2a2a2a;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #3a3a3a;
}

.modal-header h2 {
  color: white;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.modal-body {
  padding: 20px;
}

.shop-items {
  display: grid;
  gap: 15px;
}

.shop-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #3a3a3a;
  border-radius: 8px;
}

.shop-item img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.item-name {
  flex: 1;
  color: white;
}

.item-price {
  color: #4CAF50;
  font-weight: bold;
}

.buy-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.buy-button:disabled {
  background: #666;
  cursor: not-allowed;
}
</style>