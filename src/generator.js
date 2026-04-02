const crypto = require('crypto');
const { buildCharset, SIMILAR_CHARS, LOWERCASE, UPPERCASE, DIGITS, SYMBOLS } = require('./charset');

/**
 * Получить случайное число от 0 до max-1 используя rejection sampling
 * Это устраняет bias (смещение) при неравномерном распределении
 * @param {number} max - Верхняя граница (не включительно)
 * @returns {number} Случайное число
 */
function secureRandom(max) {
  if (max <= 0) throw new Error('max должен быть больше 0');
  if (max === 1) return 0;

  const limit = Math.floor(0xFFFFFFFF / max) * max;

  while (true) {
    const buffer = crypto.randomBytes(4);
    const num = buffer.readUInt32BE(0);
    if (num < limit) {
      return num % max;
    }
  }
}

/**
 * Сгенерировать один пароль заданной длины
 * @param {number} length - Длина пароля
 * @param {string} charset - Набор символов
 * @returns {string} Сгенерированный пароль
 */
function generatePassword(length, charset) {
  if (length < 1) {
    throw new Error('Длина пароля должна быть больше 0');
  }
  if (!charset || charset.length === 0) {
    throw new Error('Набор символов не может быть пустым');
  }

  const passwordChars = [];
  for (let i = 0; i < length; i++) {
    passwordChars.push(charset[secureRandom(charset.length)]);
  }
  return passwordChars.join('');
}

/**
 * Сгенерировать пароль с гарантией хотя бы одного символа из каждой категории
 * @param {number} length - Длина пароля
 * @param {Object} options
 * @param {string[]} options.categories - Массив строк-категорий символов
 * @param {boolean} options.excludeSimilar - Исключить похожие символы
 * @returns {string} Сгенерированный пароль
 */
function generateSecurePassword(length, { categories, excludeSimilar = false }) {
  if (length < categories.length) {
    throw new Error('Длина пароля меньше количества выбранных категорий');
  }

  const { charset } = buildCharset({
    lowercase: categories.some(c => c === LOWERCASE),
    uppercase: categories.some(c => c === UPPERCASE),
    digits: categories.some(c => c === DIGITS),
    symbols: categories.some(c => c === SYMBOLS),
    excludeSimilar
  });

  const passwordChars = getGuaranteedCategoryChars(categories, excludeSimilar);

  fillRemainingChars(passwordChars, length, charset);
  shuffleArray(passwordChars);

  return passwordChars.join('');
}

/**
 * Получить гарантированные символы из каждой категории
 */
function getGuaranteedCategoryChars(categories, excludeSimilar) {
  const similarSet = excludeSimilar ? new Set(SIMILAR_CHARS) : null;
  const passwordChars = [];

  for (const category of categories) {
    const filtered = excludeSimilar
      ? category.split('').filter(c => !similarSet.has(c)).join('')
      : category;

    if (filtered.length > 0) {
      passwordChars.push(filtered[secureRandom(filtered.length)]);
    }
  }

  return passwordChars;
}

/**
 * Заполнить оставшуюся длину случайными символами
 */
function fillRemainingChars(passwordChars, length, charset) {
  for (let i = passwordChars.length; i < length; i++) {
    passwordChars.push(charset[secureRandom(charset.length)]);
  }
}

/**
 * Перемешать массив на месте (Fisher-Yates)
 */
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = secureRandom(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/**
 * Сгенерировать несколько паролей
 * @param {number} count - Количество паролей
 * @param {number} length - Длина каждого пароля
 * @param {Object} options - Опции генерации
 * @returns {string[]} Массив паролей
 */
function generatePasswords(count, length, options) {
  const passwords = [];
  for (let i = 0; i < count; i++) {
    passwords.push(generateSecurePassword(length, options));
  }
  return passwords;
}

module.exports = {
  secureRandom,
  generatePassword,
  generateSecurePassword,
  generatePasswords
};
