# 🤖 AI Projects by Kirill Kiselev.

**AI Security Engineer | LLM Red Team | Threat Intelligence Analyst**
📍 Анапа | Telegram: [@kir029](https://t.me/kir029) 

---

## 🛡️ About Me

AI Security Engineer с 5-летним бэкграундом в **Threat Intelligence** и поведенческом анализе. Специализируюсь на тестировании LLM на уязвимости (**Prompt Injection, Jailbreaking**) и создании защищённых AI-агентов.

**Ключевая ценность:** объединяю техническую экспертизу (Python, RAG, n8n) с пониманием когнитивных искажений и методов социальной инженерии — это позволяет проектировать LLM-системы, устойчивые к манипуляциям на уровне архитектуры.

### Мой подход к AI Security:
- **Offensive:** Red Teaming, adversarial prompt engineering, выявление векторов атак
- **Defensive:** LLM Guardrails, secure RAG, input/output validation
- **Intelligence:** Threat Modeling (STRIDE), OSINT, UEBA (User & Entity Behavior Analytics)

> *"Безопасность LLM — это не про патчи. Это про понимание того, как мыслит атакующий."*

---

## 🕵️ Threat Intelligence Background (5 years)

**Threat Intelligence Analyst | State Analytical Center (NDA)**

- Анализ и верификация информации из **700+ источников** одновременно: cross-reference, выявление паттернов дезинформации
- Подготовка **50+ аналитических отчетов** ежемесячно: финансовые угрозы, информационные операции, персональные риски
- Работа с реляционными БД (**SQL, Supabase**) и аналитическими инструментами
- OSINT-расследования полного цикла, digital footprint analysis

### Применение в AI Security:
- **Prompt Injection defense** → навыки выявления манипуляций и дезинформации
- **RAG data quality** → фильтрация и валидация датасетов / баз знаний
- **Adversarial testing** → понимание когнитивных искажений для конструирования сложных jailbreak-запросов
- **Threat Modeling** → оценка рисков на уровне архитектуры AI-систем

---

## 🔐 Security & Compliance Skills

**LLM Security:**
- Prompt Injection defense (direct/indirect)
- Jailbreaking techniques (DAN, roleplay, encoding bypass)
- OWASP Top 10 for LLM Applications
- Red Teaming (manual + automated)
- LLM Guardrails (NeMo Guardrails, Guardrails AI)

**Threat Modeling & Analysis:**
- STRIDE methodology
- Attack tree analysis for AI systems
- UEBA (User & Entity Behavior Analytics)
- OSINT & digital footprint analysis
- Risk assessment (CVSS-like scoring)

**Data Privacy & Compliance:**
- GDPR, 152-ФЗ compliance
- Secure API design
- Data poisoning prevention
- PII detection & masking
- Secure key management (.env, Vault)

**Security Tooling:**
- Rate limiting, CORS policies
- Input validation & sanitization
- JWT auth + refresh tokens
- Logging, monitoring, alerting

---

## ⚙️ Technical Skills

**AI / LLM / RAG:**
- OpenAI API, OpenRouter, Anthropic Claude, local models (Ollama)
- Prompt Engineering (System Prompts, Few-Shot, adversarial)
- RAG architecture: vector DBs (Chroma, Supabase), long-term memory (>360 days)
- LangChain, LlamaIndex, Model Context Protocol (MCP)

**Python & Automation:**
- Python (core): Asyncio, FastAPI, REST API, web scraping (BeautifulSoup)
- n8n (self-hosted via Docker): security-focused workflow orchestration
- Automation: PyInstaller, cron, Telegram Bot API

**Infrastructure & DevOps:**
- Docker, self-hosted deployment, isolated environments
- PostgreSQL, Supabase, SQLite, Redis
- Git, GitHub, Linux CLI, bash scripting, CI/CD basics

**Languages:**
- Python (intermediate), Dart (intermediate), JavaScript/TypeScript (basic)
- Russian (native), English (B1)

---

## 📁 Проекты
### 📱 BioFlow — Биохакинг-трекер (Flutter, 2026)
**[github.com/Kir0029/BioFlow](https://github.com/Kir0029/BioFlow)** | 4 продакшн-релиза, 130 автотестов

**Stack:** Flutter 3.38, Dart 3.12, Riverpod (code-gen), Isar DB (NoSQL)

Offline-first мобильное приложение для трекинга здоровья. Проект-демонстрация инженерной дисциплины и security-first подхода к обработке персональных данных.

**Ключевые факты:**
- **130 автотестов** (Unit + Widget + Integration, TDD)
- Clean Architecture + Repository Pattern + MVVM
- Локальный AI: корреляционный анализ (сон↔энергия, вода↔настроение) без API
- Полная автономность: работает в авиарежиме, без интернета

**🔐 Security considerations:**
- 100% изоляция данных: хранение в локальной Isar DB, никаких внешних API
- Отсутствие трекеров (Firebase, Amplitude, etc.) — no telemetry
- Экспорт/импорт JSON для личного архива
- Бесследная очистка истории за конкретный год
- No ads, no analytics, no third-party SDKs
- Проект демонстрирует privacy-by-design подход, применимый к sensitive data в AI-системах
✓ Готов к публикации в Google Play (уже есть в RuStore и AppGallery)

---

### 🌐 Portfolio Landing — Fullstack лендинг (Vite + TS, 2026)
**[github.com/Kir0029/landing](https://github.com/Kir0029/landing)** | Test Task

Высокопроизводительный одностраничный лендинг-портфолио с AI-чатом и Canvas-анимацией.

**Стек:**
- Frontend: Vite 6, TypeScript 5.8, Vanilla JS/TS, Modern CSS
- Backend: Netlify Functions (Serverless, Node.js)
- AI: Google Gemini API (gemini-3.1-flash-lite)
- Почта: Resend API

**Ключевые достижения:**
✓ Кастомная Canvas-анимация частиц с динамическим цветом (считывает CSS-переменные)
✓ Rate limiting (3 req/min) + валидация на бэкенде + graceful fallback в offline
✓ AI-чат с управлением контекстом и детальным SYSTEM_PROMPT
✓ HTML-шаблоны писем с reply-to заголовком
(Это было как тестовое задание)

### 💰 Crypto-Scanner — Real-time Market Anomaly Detection
**Stack:** Python, Asyncio, Bybit API, Telegram API, SQLite, PyInstaller

Асинхронный бот для real-time мониторинга волатильности и объёмов на Bybit (750+ USDT-пар). Мультитаймфрейм анализ (1H + 15M + 4H) с индикаторами RSI, MACD, EMA, ATR, Open Interest.

**Результат:**
- Полный цикл сканирования: ~20 секунд
- Доставка алерта в Telegram: <2 секунд
- Скоринг сигналов 1-5 ⭐ по 7 факторам
- Две версии: локальная (.exe с SQLite) + серверная (Ubuntu VPS, 24/7 systemd)

**🔐 Security considerations:**
- Безопасное хранение API-ключей через `.env` (не в коде)
- Rate limiting для защиты от DDoS и API-abuse
- Лицензирование через Google Sheets (защита от несанкционированного распространения)
- Изоляция данных: SQLite локально, данные не покидают устройство пользователя
- Serverless-версия: secrets через systemd env, no hardcoded credentials

[🔗 GitHub](https://github.com/Kir0029/CryptoScanner)

**Статус:** 🔒 Commercial (продается)

![Crypto Bot1](screenshots/crypto-bot-1.png)
![Crypto Bot2](screenshots/crypto-bot-2.png)
![Crypto Bot3](screenshots/crypto-bot-3.png)

---

### 📰 AI News Aggregator — Intelligent Media Digest
**Stack:** n8n, RSS parsing (Tavily), LLM summarization, cron, Telegram

Автоматизация сбора и обработки новостей из 100+ источников. LLM-фильтрация информационного шума и суммаризация ключевых смыслов.

**Результат:**
- Экономия ~45 минут в день на чтение аналитики
- Сокращение времени поиска информации на ~70%
- Ежедневная рассылка в 08:00 без участия человека

**🔐 Security considerations:**
- Санитизация RSS-фидов (защита от malicious payloads в XML)
- Валидация URL источников (whitelist подход)
- Безопасная обработка внешних данных: no eval(), no dynamic code execution
- Rate limiting для RSS-запросов (защита от ban на источниках)

**Статус:** ✅ Работает ежедневно

![News Bot](screenshots/news-bot-1.png)
![News Bot](screenshots/news-bot-2.png)

---

### 🤖 AI English Assistant — LLM Tutor with Long-term Memory
**Stack:** n8n (self-hosted), OpenAI API, Supabase, Telegram Bot API, RAG

ИИ-агент с кастомной RAG-архитектурой и удержанием памяти диалога >360 дней. Адаптивное объяснение правил на базе психологических триггеров.

**Результат:**
- Точность контекстных ответов: ~97%
- 8+ тестовых пользователей, улучшение усвоения материала на ~15%
- Обработка голосовых сообщений
- Интеграция с Supabase: автосохранение прогресса, статистика, spaced repetition

**🔐 Security considerations:**
- Валидация пользовательского ввода (защита от malformed input)
- Защита от Prompt Injection через строго структурированные System Prompts
- Фильтрация небезопасного контента в ответах LLM (content moderation layer)
- Изоляция пользовательских данных в Supabase с row-level security
- Обработка голосовых: санитизация аудио перед отправкой в LLM

![English AI1](screenshots/english-ai-1.png)
![English AI2](screenshots/english-ai-2.png)

---

### 💬 AI IT Support Dashboard — Internal Help Assistant
**Stack:** Python, Streamlit, OpenRouter (DeepSeek V4 Flash)

Мини-дашборд с AI-ассистентом для внутренней IT-поддержки. История чатов, поиск, стриминг ответов в реальном времени.

**Результат:**
- Специализация бота строго на IT-вопросах (domain restriction)
- Поддержка нескольких сессий с изоляцией данных
- Современная темная тема, адаптивная верстка

**🔐 Security considerations:**
- Обработка ошибок API без утечки stack trace в UI
- Защита от crashed-flow (graceful degradation)
- Изоляция сессий пользователей (no cross-session data leak)
- Безопасное хранение истории чатов в локальном JSON (без внешних сервисов)
- Domain restriction: system prompt блокирует ответы на не-IT вопросы

---

### 💳 Wallet API — Secure E-Wallet Backend
**Stack:** Python, FastAPI, PostgreSQL, JWT

RESTful API для управления электронным кошельком с фокусом на безопасность финансовых транзакций.

**Результат:**
- Аутентификация через JWT с refresh tokens
- CRUD операции для транзакций и балансов
- Валидация бизнес-логики на уровне сервиса

**🔐 Security considerations:**
- JWT auth: access + refresh tokens, short-lived access (15 min)
- Защита от SQL injection через параметризованные запросы (SQLAlchemy ORM)
- Rate limiting на критичных endpoints (login, transfer)
- CORS policies (whitelist origins)
- Input validation через Pydantic schemas
- Хранение паролей: bcrypt с salt
- Audit logging всех финансовых операций

---

## 🎓 Education & Certifications

**Higher Education:**
- **Moscow International University** — Faculty of Psychology
  - *Specialization:* Behavioral Psychology
  - *Application in AI Security:* cognitive bias modeling, social engineering defense, UX design for AI agents

**Certifications:**
- **AI Agents: n8n + Make** — GORA Academy (2025-2026)
  - Multi-step AI scenarios, RAG, deployment, debugging
- **QA Engineer / Test Automation** — Udemy (2025)
  - Test design, bug tracking, pytest (применяю при отладке AI-агентов)

**Currently learning:**
- OWASP Top 10 for LLM Applications
- LLM Red Teaming methodologies (HackTricks, PortSwigger research)
- MITRE ATLAS (ATT&CK for AI systems)
- LangChain security patterns & NeMo Guardrails

## 🛠 Tech Stack

| Категория | Технологии |
|-----------|-----------|
| **Mobile** | Flutter, Dart, Riverpod, Isar DB, go_router |
| **Backend** | Python, REST API, Webhooks, Netlify Functions |
| **AI/LLM** | OpenAI API, Google Gemini, OpenRouter, RAG, embeddings |
| **Automation** | n8n (self-hosted), Docker, cron |
| **Database** | Supabase (PostgreSQL), Isar (NoSQL), Google Sheets |
| **DevOps** | Docker, Git, Linux CLI, self-hosted deployment |
| **Testing** | TDD, flutter_test, integration_test, mocktail |

---

## 📬 Контакты

| Канал | Ссылка |
|-------|--------|
| Telegram | [@kir029](https://t.me/kir029) |
| GitHub | [github.com/Kir0029](https://github.com/Kir0029) |

---

> 💡 **Чем могу быть полезен:**
- 🔴 Red Teaming ваших LLM-систем (Prompt Injection, Jailbreak, Data Leakage)
- 🛡️ Разработка Guardrails для защиты AI-агентов от атак
- 🔍 Автоматизация Threat Intelligence пайплайнов через n8n + Python
- 📋 Внедрение OWASP Top 10 for LLM Applications в процессы разработки
