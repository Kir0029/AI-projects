const { secureRandom, generatePassword, generateSecurePassword, generatePasswords } = require('../src/generator');
const { LOWERCASE, UPPERCASE, DIGITS, SYMBOLS } = require('../src/charset');

describe('secureRandom', () => {
  test('возвращает число в диапазоне [0, max)', () => {
    for (let i = 0; i < 100; i++) {
      const result = secureRandom(10);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    }
  });

  test('возвращает 0 при max=1', () => {
    expect(secureRandom(1)).toBe(0);
  });
});

describe('generatePassword', () => {
  test('генерирует пароль заданной длины', () => {
    const password = generatePassword(16, 'abc');
    expect(password.length).toBe(16);
  });

  test('генерирует пароль только из указанных символов', () => {
    const password = generatePassword(20, 'abc');
    for (const char of password) {
      expect('abc').toContain(char);
    }
  });

  test('бросает ошибку при длине < 1', () => {
    expect(() => generatePassword(0, 'abc')).toThrow('Длина пароля должна быть больше 0');
  });

  test('бросает ошибку при пустом charset', () => {
    expect(() => generatePassword(10, '')).toThrow('Набор символов не может быть пустым');
  });
});

describe('generateSecurePassword', () => {
  test('генерирует пароль заданной длины', () => {
    const password = generateSecurePassword(16, {
      categories: [LOWERCASE, UPPERCASE, DIGITS, SYMBOLS]
    });
    expect(password.length).toBe(16);
  });

  test('содержит хотя бы один символ из каждой категории', () => {
    const password = generateSecurePassword(10, {
      categories: [LOWERCASE, UPPERCASE, DIGITS]
    });
    expect(/[a-z]/.test(password)).toBe(true);
    expect(/[A-Z]/.test(password)).toBe(true);
    expect(/[0-9]/.test(password)).toBe(true);
  });

  test('бросает ошибку когда длина меньше количества категорий', () => {
    expect(() => generateSecurePassword(2, {
      categories: [LOWERCASE, UPPERCASE, DIGITS, SYMBOLS]
    })).toThrow('Длина пароля меньше количества выбранных категорий');
  });

  test('исключает похожие символы при excludeSimilar: true', () => {
    const password = generateSecurePassword(20, {
      categories: [LOWERCASE, UPPERCASE, DIGITS],
      excludeSimilar: true
    });
    for (const char of '0Ool1I') {
      expect(password).not.toContain(char);
    }
  });
});

describe('generatePasswords', () => {
  test('генерирует указанное количество паролей', () => {
    const passwords = generatePasswords(5, 16, {
      categories: [LOWERCASE, DIGITS]
    });
    expect(passwords.length).toBe(5);
    passwords.forEach(p => expect(p.length).toBe(16));
  });

  test('все пароли уникальны', () => {
    const passwords = generatePasswords(100, 32, {
      categories: [LOWERCASE, UPPERCASE, DIGITS, SYMBOLS]
    });
    const unique = new Set(passwords);
    expect(unique.size).toBe(100);
  });
});
