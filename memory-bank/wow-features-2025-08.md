## WOW-фичи для сайта (август 2025)

ЦА: продукт‑ и тех‑лиды, собственники малого/среднего бизнеса, hiring‑менеджеры. Цель — быстро показать ценность и экспертизу: минимум кликов, максимум пользы, идеально на мобильном и десктопе.

Технологические опоры проекта:
- Assistant: Responses API (SSE) с событиями `response.output_text.delta`/`done`.
- STT: Web Speech API (клиент) с fallback на серверный `/api/stt` (OpenAI Whisper) с авто‑переводом в UK.
- i18n: EN/UK; расширяемость строк через `lib/i18n/translations.ts`.

Ниже две «вау»‑фичи, готовые к продакшн в августе 2025. Если есть связь c ИИ — используем Responses API.

---

### 1) 60‑секундный ROI‑симулятор + персональный план автоматизации

#### Пользовательская ценность
- Мгновенно оценивает окупаемость автоматизации (payback, экономия по месяцам) без созвона.
- Генерирует персональный краткий план внедрения (milestones, риски, зависимости) + PDF/ссылка для шеринга.

#### UX (десктоп/мобайл)
- 3–5 полей: «часы рутинных задач/мес», «ставка исполнителя», «частота», «стоимость внедрения», «уровень автоматизируемости (%)».
- Живые графики экономии и точки безубыточности, адаптируются под тему.
- CTA: «Обсудить кейс», «Скачать PDF», «Поделиться» (генерация share‑link с query params).
- Интеграция с ассистентом: кнопка «Подбери сценарии» → ассистент задаёт уточняющие вопросы и подставляет значения в симулятор.

#### Бизнес‑логика расчёта (минимум, расширяемо)
- Пусть \( h_m \) — часы рутины в месяц, \( r \) — ставка/час, \( a \in [0,1] \) — доля автоматизируемого, \( c \) — оценка внедрения.
- Экономия/мес: \( S = h_m \cdot a \cdot r \).
- Payback (месяцев): \( P = \max\{1, \lceil c / \max(S, \epsilon) \rceil \} \) с \( \epsilon = 1 \) для избежания деления на 0.
- Кумулятивная экономия к месяцу \( t \): \( C_t = S \cdot t - c \).

#### Архитектура
- UI: `components/ui/roi-simulator.tsx` (контролы + графики; можно переиспользовать `components/ui/chart.tsx`).
- API: `POST /api/roi/simulate` — чистый расчёт (без ИИ) + (опционально) короткая нарративка от LLM через Responses API.
- Экспорт: `POST /api/roi/export` — генерация PDF (node runtime) и выдача `application/pdf`.
- Хранение: ничего не сохраняем по умолчанию; для аналитики — client‑side events + агрегация (см. ниже).

#### Контракты API
- `POST /api/roi/simulate` (JSON)
  - request: `{ hoursPerMonth: number; hourlyRate: number; automationShare: number; implementationCost: number; locale?: 'en'|'uk'|'ru'; narrative?: boolean }`
  - response: `{ monthlySavings: number; paybackMonths: number; series: { month: number; cumulative: number }[]; narrative?: string }`
- `POST /api/roi/export` (JSON → PDF)
  - request: `{ inputs: {...как выше}, result: {...из simulate}, personaPlan?: string }`
  - response: binary PDF stream (`Content-Type: application/pdf`).

#### Пример вызова нарративки через Responses API (сервер)
```ts
const res = await fetch('https://api.openai.com/v1/responses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  body: JSON.stringify({
    model: process.env.OPENAI_RESPONSES_MODEL || 'gpt-4o-mini',
    input: [
      { role: 'system', content: 'Write concise, user-friendly ROI summary. No fluff.' },
      { role: 'user', content: `Locale: ${locale}. Monthly savings ${S}, payback months ${P}. Generate 2–3 sentences.` }
    ],
    stream: false
  })
})
```

#### Best practices (2025)
- Валидация и идемпотентность на API; не доверять клиенту.
- Локализация: все строки в `lib/i18n/translations.ts`; числа форматировать через `Intl.NumberFormat` по `locale`.
- Доступность: метки для инпутов, цветовые контрасты графиков, клавиатурная навигация.
- Производительность: лёгкие формулы на клиенте, но сервер — источник истины; debounce 200–300 мс при автопересчёте.
- PDF: генерировать на сервере; кэшировать на 10–15 мин по хэшу входных данных.
- Аналитика: события `roi_simulate` (вход/выход, без PII), `roi_export_pdf`, `roi_share_link`.
- Конфиденциальность: не логировать сырой ввод, хранить только агрегаты; закрыть эндпоинты от индексации.

#### Метрики успеха
- CR с симулятора до отправки формы/контакта, среднее время до payback, доля экспортов.

---

### 2) Голосовой консьерж с авто‑переводом и озвучкой (RU/UK/EN)

#### Пользовательская ценность
- Hands‑free взаимодействие и мультиязычность: говори на своём языке → получай ответ на выбранном с моментальной озвучкой.

#### UX
- В ассистенте: переключатель «Язык ответа» (UK/RU/EN). Кнопки «Запись/Стоп», индикатор «Listening…», «Повторить ответ».
- На мобиле — фиксированная кнопка «микро» + автоскрытие клавиатуры; на десктопе — модальный шторка, hotkey ⌘/Ctrl+K.

#### Поток событий
1) Пользователь нажимает «Запись» → Web Speech API если доступен, иначе MediaRecorder → `/api/stt`.
2) Текст → `/api/assistant` (Responses API, SSE). Рендер стрима по событиям `response.output_text.delta`.
3) По завершении ответа → `/api/tts` для озвучки; авто‑play; кнопка «повторить».
4) Если язык ответа ≠ языка пользователя — дополнительный шаг перевода (Responses API) перед TTS.

#### Архитектура
- STT: уже реализовано `/api/stt` (Whisper). Сохранить авто‑перевод в UK как опцию; добавить явный `targetLang` в форме.
- Assistant: `/api/assistant` (есть) — Responses API со streaming SSE (совместимо с текущим парсером событий).
- TTS: новый `/api/tts` (node runtime). Два варианта:
  - Рекомендуемый: OpenAI TTS (`/v1/audio/speech`, модель типа `gpt-4o-mini-tts`), `voice`, `format: 'mp3'|'opus'`.
  - Fallback: Web Speech Synthesis API на клиенте, если API недоступен/лимиты.

#### Контракты API
- `POST /api/tts` (JSON → audio)
  - request: `{ text: string; voice?: 'alloy'|'verse'|'amber'; format?: 'mp3'|'opus'; language?: 'en'|'uk'|'ru' }`
  - response: поток аудио (`Content-Type: audio/mpeg` или `audio/ogg; codecs=opus`).

#### Пример серверной TTS (OpenAI Audio → stream)
```ts
const tts = await fetch('https://api.openai.com/v1/audio/speech', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
  body: JSON.stringify({ model: 'gpt-4o-mini-tts', voice: 'alloy', input: text, format: 'mp3' })
})
return new Response(tts.body, { status: 200, headers: { 'Content-Type': 'audio/mpeg' } })
```

#### Best practices (2025)
- Надёжность: таймауты 20–30с, повтор запросов (1–2 ретрая) на 5xx; аккуратно отменять незавершённые записи при навигации.
- Буферизация UI: отображать «typing dots» во время стрима, аудиоплеер с `aria`.
- Кэш TTS: ключ по `hash(text+voice+lang+model)` в KV/Edge Cache на 7 дней.
- Мультиязычность: явный `targetLang` в Assist/TTS, не угадывать язык ответа по умолчанию.
- Конфиденциальность: спрашивать разрешение на микрофон, не отправлять аудио без явного действия; не хранить сырой аудиопоток.
- Мобильные ограничения: auto‑play только в результате пользовательского жеста; предусмотреть «tap to play» fallback.
- Доступность: субтитры (текст ответа), кнопки «повторить»/«пауза» доступны с клавиатуры.

#### Метрики успеха
- Доля voice‑сессий, средняя длина взаимодействия, завершения CTA после голосового диалога, NPS «удобство».

---

### Интеграция с текущим кодом
- Повторно использовать SSE‑парсинг в `components/ui/assistant.tsx` (события `response.output_text.delta`/`done`).
- Использовать существующие `agents` и локализацию; добавить новые строки UI в `translations.ts`.
- Переменные окружения: `OPENAI_API_KEY`, `OPENAI_RESPONSES_MODEL` (дефолт `gpt-4o-mini`).
- Рейт‑лимиты на API‑роутах (напр., 30 req/мин/IP) через in‑memory/LRU + промахи в KV при деплое на Edge.

### Риски и смягчение
- Ограничения TTS/STT в браузере: иметь надёжный серверный fallback.
- Стоимость API при пиковых нагрузках: кэширование, сокращение контекста истории, компактные промпты.
- Точность трансформаций: явные инструкции системному промпту, тестовые фразы на EN/UK/RU.

### Пошаговый план внедрения (рекомендуемая последовательность)
1) ROI‑симулятор (UI+сервер расчёта) → локализация → графики → PDF.
2) Голос: `/api/tts` + плеер в ассистенте → настройка авто‑перевода → кэш аудио.
3) Связка с ассистентом (CTA из ответа, автозаполнение полей симулятора).
4) Аналитика событий и A/B: «кнопка ассистента vs симулятор».

### Тестирование и качество
- Контрольные наборы для трёх языков (RU/UK/EN) и типовых акцентов (для STT).
- Лоад‑тесты: 95‑й перцентиль < 2.5с на симулятор, < 4с до первого байта TTS при кэше промах.
- Линтеры/типизация, Lighthouse ≥ 90 на моб/десктоп.


