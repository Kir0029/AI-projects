const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

const SIMILAR_CHARS = '0Ool1I';

/**
 * Получить список похожих символов
 * @returns {string} Строка с похожими символами
 */
function getSimilarChars() {
  return SIMILAR_CHARS;
}

/**
 * Построить итоговый набор символов с учётом опций
 * @param {Object} options
 * @param {boolean} options.lowercase - Включить строчные
 * @param {boolean} options.uppercase - Включить заглавные
 * @param {boolean} options.digits - Включить цифры
 * @param {boolean} options.symbols - Включить спецсимволы
 * @param {boolean} options.excludeSimilar - Исключить похожие символы
 * @returns {{ charset: string, categories: string[] }} Набор символов и активные категории
 */
function buildCharset({ lowercase = true, uppercase = true, digits = true, symbols = true, excludeSimilar = false } = {}) {
  const categories = [];

  if (lowercase) categories.push(LOWERCASE);
  if (uppercase) categories.push(UPPERCASE);
  if (digits) categories.push(DIGITS);
  if (symbols) categories.push(SYMBOLS);

  if (categories.length === 0) {
    throw new Error('Выберите хотя бы одну категорию символов');
  }

  let charset = categories.join('');

  if (excludeSimilar) {
    const similarSet = new Set(SIMILAR_CHARS);
    charset = charset.split('').filter(char => !similarSet.has(char)).join('');
  }

  // Проверка что после исключения похожих символов остались символы
  if (charset.length === 0) {
    throw new Error('Не осталось символов после исключения похожих');
  }

  return { charset, categories };
}

module.exports = {
  LOWERCASE,
  UPPERCASE,
  DIGITS,
  SYMBOLS,
  SIMILAR_CHARS,
  getSimilarChars,
  buildCharset
};
