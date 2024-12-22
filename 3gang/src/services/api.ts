interface User {
  id: string;
  money: number;
  level: number;
  items: UserItem[];
  lastUpdated: Date;
}

interface UserItem {
  id: number;
  itemId: number;
  type: string;
  purchaseDate: Date;
}

const API_URL = 'https://3gang-backend-production.up.railway.app';

export const api = {
  /**
   * Получение данных пользователя
   * @param telegramId - Telegram ID пользователя
   * @returns {Promise<User>}
   */
  async getUser(telegramId: string): Promise<User> {
    console.log('Запрос пользователя:', telegramId);
    try {
      const response = await fetch(`${API_URL}/users/${telegramId}`);
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Получены данные пользователя:', data);
      return data;
    } catch (error) {
      console.error('Ошибка получения пользователя:', error);
      throw error;
    }
  },

  /**
   * Обновление количества денег пользователя
   * @param telegramId - Telegram ID пользователя
   * @param money - Новое количество денег
   * @returns {Promise<void>}
   */
  async updateMoney(telegramId: string, money: number): Promise<void> {
    console.log('Обновление денег:', { telegramId, money });
    try {
      const response = await fetch(`${API_URL}/users/${telegramId}/money`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ money }),
      });
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Деньги обновлены:', data);
      return data;
    } catch (error) {
      console.error('Ошибка обновления денег:', error);
      throw error;
    }
  },

  /**
   * Покупка предмета
   * @param telegramId - Telegram ID пользователя
   * @param itemId - ID предмета
   * @param type - Тип предмета ('instrument', 'equipment', 'studio')
   * @param price - Цена предмета
   * @returns {Promise<boolean>}
   */
  async buyItem(telegramId: string, itemId: number, type: string, price: number): Promise<boolean> {
    console.log('Покупка предмета:', { telegramId, itemId, type, price });
    try {
      const response = await fetch(`${API_URL}/users/${telegramId}/buy-item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId, type, price }),
      });
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('Результат покупки:', data);
      return data.success || false;
    } catch (error) {
      console.error('Ошибка покупки предмета:', error);
      throw error;
    }
  },
};
