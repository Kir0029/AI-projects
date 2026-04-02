const { buildCharset } = require('../src/charset');
const { generateSecurePassword, generatePasswords } = require('../src/generator');
const { LOWERCASE, UPPERCASE, DIGITS, SYMBOLS } = require('../src/charset');

describe('Edge-кейсы: валидация', () => {
  test('минимальная длина (4) работает', () => {
    const password = generateSecurePassword(4, {
      categories: [LOWERCASE, DIGITS]
    });
    expect(password.length).toBe(4);
  });

  test('максимальная длина (128) работает', () => {
    const password = generateSecurePassword(128, {
      categories: [LOWERCASE, UPPERCASE, DIGITS, SYMBOLS]
    });
    expect(password.length).toBe(128);
  });

  test('одна категория символов', () => {
    const password = generateSecurePassword(10, {
      categories: [LOWERCASE]
    });
    expect(password.length).toBe(10);
    for (const char of password) {
      expect(LOWERCASE).toContain(char);
    }
  });

  test('exclude-similar оставляет минимум символов', () => {
    const { charset } = buildCharset({ excludeSimilar: true });
    expect(charset.length).toBeGreaterThan(0);
  });
});

describe('Edge-кейсы: распределение', () => {
  test('генерация 100 паролей даёт уникальные результаты', () => {
    const passwords = generatePasswords(100, 16, {
      categories: [LOWERCASE, DIGITS]
    });
    const unique = new Set(passwords);
    expect(unique.size).toBe(100);
  });

  test('перемешивание работает (символы не всегда в начале)', () => {
    let lowercaseAtStart = 0;
    for (let i = 0; i < 50; i++) {
      const password = generateSecurePassword(10, {
        categories: [LOWERCASE, UPPERCASE, DIGITS]
      });
      if (LOWERCASE.includes(password[0])) {
        lowercaseAtStart++;
      }
    }
    // Не все пароли должны начинаться со строчной (перемешивание работает)
    expect(lowercaseAtStart).toBeLessThan(45);
  });
});

describe('Edge-кейсы: безопасность', () => {
  test('не используется Math.random', () => {
    const fs = require('fs');
    const path = require('path');
    const generatorCode = fs.readFileSync(path.join(__dirname, '../src/generator.js'), 'utf8');
    expect(generatorCode).not.toContain('Math.random');
  });

  test('используется crypto.randomBytes', () => {
    const fs = require('fs');
    const path = require('path');
    const generatorCode = fs.readFileSync(path.join(__dirname, '../src/generator.js'), 'utf8');
    expect(generatorCode).toContain('crypto.randomBytes');
  });
});

describe('Edge-кейсы: граничные значения count', () => {
  test('count=1 работает', () => {
    const passwords = generatePasswords(1, 16, {
      categories: [LOWERCASE]
    });
    expect(passwords.length).toBe(1);
  });

  test('count=100 работает', () => {
    const passwords = generatePasswords(100, 8, {
      categories: [DIGITS]
    });
    expect(passwords.length).toBe(100);
    passwords.forEach(p => expect(p.length).toBe(8));
  });
});
