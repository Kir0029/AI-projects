const { buildCharset } = require('./charset');
const { generatePasswords } = require('./generator');
const { calculateEntropy, getStrengthLevel } = require('./entropy');

const DEFAULTS = {
  length: 16,
  lowercase: true,
  uppercase: true,
  digits: true,
  symbols: true,
  excludeSimilar: false,
  count: 1,
  showEntropy: false,
  quiet: false
};

const FLAGS = {
  '--length': { type: 'number', key: 'length' },
  '--no-lowercase': { type: 'flag', key: 'lowercase', value: false },
  '--no-uppercase': { type: 'flag', key: 'uppercase', value: false },
  '--no-digits': { type: 'flag', key: 'digits', value: false },
  '--no-symbols': { type: 'flag', key: 'symbols', value: false },
  '--exclude-similar': { type: 'flag', key: 'excludeSimilar', value: true },
  '--count': { type: 'number', key: 'count' },
  '--entropy': { type: 'flag', key: 'showEntropy', value: true },
  '--quiet': { type: 'flag', key: 'quiet', value: true },
  '--help': { type: 'action', action: 'help' },
  '-h': { type: 'action', action: 'help' }
};

function parseArgs(args) {
  const options = { ...DEFAULTS };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    const flag = FLAGS[arg];

    if (!flag) {
      console.error(`Неизвестный флаг: ${arg}`);
      console.error('Используйте --help для справки');
      process.exit(1);
    }

    if (flag.type === 'action') {
      printHelp();
      process.exit(0);
    }

    if (flag.type === 'number') {
      const val = parseInt(args[++i], 10);
      if (isNaN(val)) {
        console.error(`Ошибка: ${arg} требует числовое значение`);
        process.exit(1);
      }
      options[flag.key] = val;
    } else {
      options[flag.key] = flag.value;
    }
  }

  return options;
}

function validateOptions(options) {
  const errors = [];

  if (options.length < 4) errors.push('Минимальная длина пароля: 4');
  if (options.length > 128) errors.push('Максимальная длина пароля: 128');
  if (options.count < 1) errors.push('Минимальное количество паролей: 1');
  if (options.count > 100) errors.push('Максимальное количество паролей: 100');
  if (!options.lowercase && !options.uppercase && !options.digits && !options.symbols) {
    errors.push('Выберите хотя бы одну категорию символов');
  }

  if (errors.length > 0) {
    throw new Error(errors.join('\n'));
  }
}

function printHelp() {
  console.log(`
Password Generator CLI

Использование: node src/index.js [опции]

Опции:
  --length N          Длина пароля (4-128, по умолчанию 16)
  --no-lowercase      Исключить строчные буквы
  --no-uppercase      Исключить заглавные буквы
  --no-digits         Исключить цифры
  --no-symbols        Исключить спецсимволы
  --exclude-similar   Исключить похожие символы (0, O, l, 1, I)
  --count N           Количество паролей (1-100, по умолчанию 1)
  --entropy           Показать расчёт энтропии
  --quiet             Вывести только пароль
  --help, -h          Показать эту справку

Примеры:
  node src/index.js
  node src/index.js --length 24 --no-symbols
  node src/index.js --count 5 --entropy
  node src/index.js --length 32 --exclude-similar --quiet
`);
}

function displayPasswords(passwords, options, charsetLength) {
  if (options.quiet) {
    passwords.forEach(p => console.log(p));
    return;
  }

  passwords.forEach((password, index) => {
    const label = options.count > 1 ? `\nПароль ${index + 1}:` : '\nСгенерированный пароль:';
    console.log(label);
    console.log(password);

    if (options.showEntropy) {
      const entropy = calculateEntropy(options.length, charsetLength);
      const strength = getStrengthLevel(entropy);
      console.log(`Энтропия: ${entropy} бит`);
      console.log(`Сложность: ${strength.label}`);
    }
  });

  console.log(`\nДлина: ${options.length} | Набор символов: ${charsetLength}`);
}

function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);

  try {
    validateOptions(options);
  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
    process.exit(1);
  }

  const { charset, categories } = buildCharset({
    lowercase: options.lowercase,
    uppercase: options.uppercase,
    digits: options.digits,
    symbols: options.symbols,
    excludeSimilar: options.excludeSimilar
  });

  const passwords = generatePasswords(options.count, options.length, {
    categories,
    excludeSimilar: options.excludeSimilar
  });

  displayPasswords(passwords, options, charset.length);
}

if (require.main === module) {
  main();
}

module.exports = { parseArgs, validateOptions, printHelp };
