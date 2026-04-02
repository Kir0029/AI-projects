/**
 * Рассчитать энтропию пароля в битах
 * Формула: entropy = length * log2(charset_size)
 * @param {number} length - Длина пароля
 * @param {number} charsetSize - Размер набора символов
 * @returns {number} Энтропия в битах
 */
function calculateEntropy(length, charsetSize) {
  if (length <= 0 || charsetSize <= 0) {
    return 0;
  }
  return Math.round(length * Math.log2(charsetSize) * 100) / 100;
}

/**
 * Получить уровень сложности пароля по энтропии
 * @param {number} entropy - Энтропия в битах
 * @returns {{ level: string, label: string, color: string }}
 */
function getStrengthLevel(entropy) {
  if (entropy < 36) {
    return { level: 'weak', label: 'Слабый', color: 'red' };
  }
  if (entropy < 60) {
    return { level: 'medium', label: 'Средний', color: 'yellow' };
  }
  if (entropy < 80) {
    return { level: 'strong', label: 'Сильный', color: 'green' };
  }
  return { level: 'very-strong', label: 'Очень сильный', color: 'bright-green' };
}

module.exports = {
  calculateEntropy,
  getStrengthLevel
};
