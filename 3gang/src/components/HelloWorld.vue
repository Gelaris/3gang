<template>
  <div class="game-interface">
    <header class="stats">
      <StatItem icon="icon-money.png" :value="gameStats.money" />
      <StatItem icon="icon-star.png" :value="gameStats.level" />
    </header>

    <main class="character-section">
      <img 
        src="/images/character.png" 
        alt="Character" 
        class="character" 
        @click="handleCharacterClick"
      />
    </main>

    <footer class="actions">
      <GameButton 
        v-for="action in actions" 
        :key="action.id"
        :icon="action.icon"
        @click="handleAction(action.id)"
      />
    </footer>

    <ShopModal 
      :is-open="isShopOpen"
      :money="gameStats.money"
      :items="shopItems"
      @close="isShopOpen = false"
      @buy="handleBuyItem"
    />
    <ShopModal 
      :is-open="isEquipmentOpen"
      :money="gameStats.money"
      :items="equipmentItems"
      @close="isEquipmentOpen = false"
      @buy="handleBuyItem"
    />
    <ShopModal 
      :is-open="isStudioOpen"
      :money="gameStats.money"
      :items="studioItems"
      @close="isStudioOpen = false"
      @buy="handleBuyItem"
    />
  </div>
</template>




<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '../services/api'
import StatItem from './StatItem.vue'
import GameButton from './GameButton.vue'
import ShopModal from './ShopModal.vue'
import tg.initData from "https://telegram.org/js/telegram-web-app.js"

const TELEGRAM_ID = ref<string | null>(null);

interface GameStats {
  money: number
  level: number
}

const gameStats = ref<GameStats>({
  money: 0,
  level: 1
})

console.log('Компонент инициализируется');

async function onMounted(telegramId: string) {
  try {
    const user = await api.getUser(telegramId);
    console.log('Пользователь загружен:', user);
  } catch (error) {
    console.error('Ошибка загрузки пользователя:', error);
  }
}

const isShopOpen = ref(false)
const isEquipmentOpen = ref(false)
const isStudioOpen = ref(false)

const shopItems = ref([
  {
    id: 1,
    name: "Микрофон",
    icon: "icon-mic.png",
    price: 100
  },
  {
    id: 2,
    name: "Гитара",
    icon: "icon-guitar.png",
    price: 200
  }
])

const equipmentItems = ref([
  {
    id: 3,
    name: "Усилитель",
    icon: "icon-amp.png",
    price: 300
  },
  {
    id: 4,
    name: "Педаль эффектов",
    icon: "icon-pedal.png",
    price: 150
  }
])

const studioItems = ref([
  {
    id: 5,
    name: "Студийные мониторы",
    icon: "icon-monitors.png",
    price: 500
  },
  {
    id: 6,
    name: "Аудиоинтерфейс",
    icon: "icon-interface.png",
    price: 400
  }
])

const actions = ref([
  {
    id: 'instruments',
    icon: 'icon-button1.png',
    handler: () => { isShopOpen.value = true }
  },
  {
    id: 'equipment',
    icon: 'icon-button2.png',
    handler: () => { isEquipmentOpen.value = true }
  },
  {
    id: 'studio',
    icon: 'icon-button3.png',
    handler: () => { isStudioOpen.value = true }
  }
])

const handleAction = (actionId: string) => {
  const action = actions.value.find((a) => a.id === actionId);
  action?.handler();
};

const handleCharacterClick = async () => {
  if (!TELEGRAM_ID.value) {
    console.error('Telegram ID отсутствует.');
    return;
  }

  gameStats.value.money += 1;
  try {
    console.log('Сохраняем новое значение денег:', gameStats.value.money);
    await api.updateMoney(TELEGRAM_ID.value, gameStats.value.money);
    console.log('Деньги успешно сохранены');
  } catch (error) {
    console.error('Ошибка сохранения денег:', error);
  }
};

const handleBuyItem = async (item: any) => {
  if (!TELEGRAM_ID.value) {
    console.error('Telegram ID отсутствует.');
    return;
  }

  if (gameStats.value.money >= item.price) {
    gameStats.value.money -= item.price;

    try {
      const success = await api.buyItem(TELEGRAM_ID.value, item.id, item.type, item.price);
      if (success) {
        console.log(`Предмет куплен: ${item.name}`);
      } else {
        console.log('Недостаточно средств.');
      }
    } catch (error) {
      console.error('Ошибка покупки предмета:', error);
    }
  }
};

onMounted(async () => {
  try {
    // Проверяем доступность Telegram Web App API
    if (!(window as any).Telegram?.WebApp) {
      console.error('Telegram Web App API недоступен.');
      return;
    }

    // Инициализация Telegram Web App API
    const tg = (window as any).Telegram.WebApp;
    tg.ready(); // Уведомляем Telegram, что приложение готово

    const user = tg.initDataUnsafe?.user;
    if (user && user.id) {
      TELEGRAM_ID.value = String(user.id);
      console.log('Telegram ID:', TELEGRAM_ID.value);

      try {
        // Отправляем initData на сервер для создания/получения данных пользователя
        const userData = await api.initUser(tg.initData);
        if (userData) {
          gameStats.value.money = userData.money || 0;
          gameStats.value.level = userData.level || 1;
          console.log('Данные пользователя загружены:', userData);
        } else {
          console.error('Пользователь не найден или не был создан.');
        }
      } catch (apiError) {
        console.error('Ошибка загрузки данных пользователя:', apiError);
        // Обработайте ошибку (например, показать пользователю сообщение об ошибке)
      }
    } else {
      console.error('Пользовательские данные отсутствуют в Telegram контексте.');
    }
  } catch (error) {
    console.error('Ошибка инициализации Telegram API:', error);
  }
});

</script>

<style scoped>
.game-interface {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: min(430px, 100vw);
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  border: 2px solid red; /* Временно для визуализации */
}

.stats {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.character-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  margin-bottom: 20px;
  border: 2px solid green; /* Временно для визуализации */
}

.character {
  max-height: 60vh;
  width: auto;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.1s ease;
}

.character:active {
  transform: scale(0.95);
}

.actions {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .game-interface {
    padding: 10px;
    width: 100vw;
  }
  
  .character {
    max-height: 50vh;
  }
  
  .actions {
    gap: 5px;
    padding: 5px;
  }
}
</style>
