const { calculateEntropy, getStrengthLevel } = require('../src/entropy');

describe('calculateEntropy', () => {
  test('рассчитывает энтропию корректно для стандартного набора', () => {
    // 16 символов, 94 символа в наборе (все категории)
    const entropy = calculateEntropy(16, 94);
    expect(entropy).toBeCloseTo(104.87, 2);
  });

  test('рассчитывает энтропию для только строчных', () => {
    // 8 символов, 26 строчных
    const entropy = calculateEntropy(8, 26);
    expect(entropy).toBeCloseTo(37.6, 1);
  });

  test('возвращает 0 при длине 0', () => {
    expect(calculateEntropy(0, 94)).toBe(0);
  });

  test('возвращает 0 при пустом charset', () => {
    expect(calculateEntropy(10, 0)).toBe(0);
  });

  test('энтропия растёт с увеличением длины', () => {
    const e1 = calculateEntropy(8, 94);
    const e2 = calculateEntropy(16, 94);
    expect(e2).toBeGreaterThan(e1);
  });

  test('энтропия растёт с увеличением charset', () => {
    const e1 = calculateEntropy(10, 26);
    const e2 = calculateEntropy(10, 94);
    expect(e2).toBeGreaterThan(e1);
  });
});

describe('getStrengthLevel', () => {
  test('слабый при энтропии < 36', () => {
    expect(getStrengthLevel(30)).toEqual({ level: 'weak', label: 'Слабый', color: 'red' });
  });

  test('средний при энтропии 36-59', () => {
    expect(getStrengthLevel(50)).toEqual({ level: 'medium', label: 'Средний', color: 'yellow' });
  });

  test('сильный при энтропии 60-79', () => {
    expect(getStrengthLevel(70)).toEqual({ level: 'strong', label: 'Сильный', color: 'green' });
  });

  test('очень сильный при энтропии >= 80', () => {
    expect(getStrengthLevel(90)).toEqual({ level: 'very-strong', label: 'Очень сильный', color: 'bright-green' });
  });

  test('граничное значение 36 бит — средний', () => {
    expect(getStrengthLevel(36)).toEqual({ level: 'medium', label: 'Средний', color: 'yellow' });
  });

  test('граничное значение 60 бит — сильный', () => {
    expect(getStrengthLevel(60)).toEqual({ level: 'strong', label: 'Сильный', color: 'green' });
  });

  test('граничное значение 80 бит — очень сильный', () => {
    expect(getStrengthLevel(80)).toEqual({ level: 'very-strong', label: 'Очень сильный', color: 'bright-green' });
  });
});
