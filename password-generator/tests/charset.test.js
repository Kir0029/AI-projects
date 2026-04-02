const { buildCharset, getSimilarChars, LOWERCASE, UPPERCASE, DIGITS, SYMBOLS, SIMILAR_CHARS } = require('../src/charset');

describe('getSimilarChars', () => {
  test('возвращает строку с похожими символами', () => {
    expect(getSimilarChars()).toBe(SIMILAR_CHARS);
  });
});

describe('buildCharset', () => {
  test('по умолчанию включает все категории', () => {
    const { charset, categories } = buildCharset();
    expect(categories.length).toBe(4);
    expect(charset).toContain('a');
    expect(charset).toContain('A');
    expect(charset).toContain('0');
    expect(charset).toContain('!');
  });

  test('исключает строчные при lowercase: false', () => {
    const { charset, categories } = buildCharset({ lowercase: false });
    expect(categories.length).toBe(3);
    expect(charset).not.toContain('a');
    expect(charset).toContain('A');
  });

  test('исключает заглавные при uppercase: false', () => {
    const { charset } = buildCharset({ uppercase: false });
    expect(charset).not.toContain('A');
    expect(charset).toContain('a');
  });

  test('исключает цифры при digits: false', () => {
    const { charset } = buildCharset({ digits: false });
    expect(charset).not.toContain('0');
    expect(charset).toContain('a');
  });

  test('исключает спецсимволы при symbols: false', () => {
    const { charset } = buildCharset({ symbols: false });
    expect(charset).not.toContain('!');
    expect(charset).toContain('a');
  });

  test('исключает похожие символы при excludeSimilar: true', () => {
    const { charset } = buildCharset({ excludeSimilar: true });
    for (const char of SIMILAR_CHARS) {
      expect(charset).not.toContain(char);
    }
  });

  test('бросает ошибку когда все категории отключены', () => {
    expect(() => buildCharset({ lowercase: false, uppercase: false, digits: false, symbols: false }))
      .toThrow('Выберите хотя бы одну категорию символов');
  });

  test('возвращает корректные категории', () => {
    const { categories } = buildCharset({ lowercase: true, uppercase: false, digits: true, symbols: false });
    expect(categories).toEqual([LOWERCASE, DIGITS]);
  });
});
