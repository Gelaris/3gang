interface User {
  money: number;
  level: number;
}

const API_URL = 'https://3gang-backend-production.up.railway.app';

export const api = {
  async getUser(telegramId: string): Promise<User> {
    console.log('Запрос пользователя:', telegramId);
    try {
      const response = await fetch(`${API_URL}/users/${telegramId}`);
      const data = await response.json();
      console.log('Получены данные:', data);
      return data;
    } catch (error) {
      console.error('Ошибка получения пользователя:', error);
      throw error;
    }
  },

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
      const data = await response.json();
      console.log('Деньги обновлены:', data);
      return data;
    } catch (error) {
      console.error('Ошибка обновления денег:', error);
      throw error;
    }
  }
} 