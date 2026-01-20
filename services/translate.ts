
/**
 * Translation service using LibreTranslate.
 * Providing localized translation for Yemeni context.
 */
export class TranslateService {
  private apiUrl = 'https://libretranslate.de/translate';

  /**
   * Translates text between Arabic and English.
   */
  async translate(text: string, toArabic: boolean = true): Promise<string> {
    try {
      const source = toArabic ? 'en' : 'ar';
      const target = toArabic ? 'ar' : 'en';

      const res = await fetch(this.apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          q: text,
          source: source,
          target: target,
          format: 'text',
          api_key: '' // Optional for public mirrors
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) {
        throw new Error('Translation service unavailable');
      }

      const data = await res.json();
      return data.translatedText || 'فشلت الترجمة.';
    } catch (error) {
      console.error('LibreTranslate Error:', error);
      // Fallback to a simple message or local dictionary if available
      return 'خطأ في الاتصال بخدمة الترجمة. يرجى التحقق من اتصال الإنترنت.';
    }
  }
}

export const translateService = new TranslateService();
