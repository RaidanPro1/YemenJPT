
/**
 * Telegram Notification Service for YemenJPT
 * Token: 8034114294:AAEQuVu5Zq6EnefvTUaR1c4psrgaqAPY0KY
 */
export class NotificationService {
  private botToken = '8034114294:AAEQuVu5Zq6EnefvTUaR1c4psrgaqAPY0KY';
  // Default Chat ID for system notifications (Should be updated via Admin Panel)
  private defaultChatId = '663363402'; 

  /**
   * Sends a message to the Telegram Bot.
   */
  async notify(message: string): Promise<void> {
    try {
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: this.defaultChatId,
          text: `🚨 [YemenJPT System Alert]\n\n${message}`,
          parse_mode: 'HTML'
        })
      });
    } catch (error) {
      console.error('Telegram Notification Failed:', error);
    }
  }
}

export const notificationService = new NotificationService();
