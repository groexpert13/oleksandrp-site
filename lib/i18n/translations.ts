export type Language = 'en' | 'uk' | 'ru' | 'es';

type TranslationKey = 
  // Header
  | 'searchFunctions'
  // Home
  | 'functionsShowcase'
  | 'functionsDescription'
  | 'noFunctionsFound'
  | 'modifySearchQuery'
  // Function cards
  | 'open'
  | 'back'
  // TextPure
  | 'originalText'
  | 'pasteTextWithFormatting'
  | 'pasteTextHere'
  | 'clear'
  | 'cleanedText'
  | 'resultOfCleaning'
  | 'resultWillAppearHere'
  | 'copied'
  | 'copyResult'
  | 'generate'
  | 'textCleanerTool'
  // TextPure Categories
  | 'markdownToPlain'
  | 'plainToHtmlEmail'
  | 'plainToOg'
  | 'plainToSsml'
  | 'smartTypography'
  | 'plainToJsonYaml'
  | 'transformationCategories'
  | 'markdownToPlainDesc'
  | 'plainToHtmlEmailDesc'
  | 'plainToOgDesc'
  | 'plainToSsmlDesc'
  | 'smartTypographyDesc'
  | 'plainToJsonYamlDesc'
  | 'markdownToTelegram'
  | 'markdownToTelegramDesc'
  // New notifications
  | 'generateSuccess'
  | 'generateError'
  | 'emptyInputError'
  // Codex Prompt Forge
  | 'yourRequest'
  | 'describeCodingTask'
  | 'exampleCreateFunction'
  | 'aboutCodexPromptForge'
  | 'transformsCodingRequests'
  | 'codexConvertsAny'
  | 'clearTaskDefinition'
  | 'requiredContext'
  | 'outputSpecification'
  | 'structuredChainOfThought'
  | 'selfReviewLoop'
  | 'worksWithAny'
  | 'openInNewWindow'
  // Yes/No Generator
  | 'selectSeconds'
  | 'seconds'
  | 'start'
  | 'repeat'
  | 'yes'
  | 'no'
  | 'question'
  | 'askQuestion'
  | 'universeAnswer'
  | 'takeScreenshot'
  // Countdown Timer
  | 'selectDateTime'
  | 'startCountdown'
  | 'timeRemaining'
  | 'days'
  | 'hours'
  | 'minutes'
  | 'edit'
  // Footer
  | 'project'
  | 'techStack'
  | 'email'
  | 'telegram';

type Translations = {
  [key in Language]: {
    [key in TranslationKey]: string;
  }
};

export const translations: Translations = {
  en: {
    // Header
    searchFunctions: 'Search features...',
    // Home
    functionsShowcase: 'Features Showcase',
    functionsDescription: 'A collection of useful tools and features for everyday tasks',
    noFunctionsFound: 'No features found',
    modifySearchQuery: 'Try modifying your search query',
    // Function cards
    open: 'Open',
    back: 'Back',
    // TextPure
    originalText: 'Original Text',
    pasteTextWithFormatting: 'Paste text with formatting characters to clean',
    pasteTextHere: 'Paste text here...',
    clear: 'Clear',
    cleanedText: 'Result',
    resultOfCleaning: 'Result of cleaning text of formatting characters',
    resultWillAppearHere: 'Result will appear here...',
    copied: 'Copied!',
    copyResult: 'Copy result',
    generate: 'Generate',
    textCleanerTool: 'Text Cleaner',
    generateSuccess: 'Text generated successfully',
    generateError: 'Failed to generate text',
    emptyInputError: 'Please enter text to generate.',
    selectSeconds: 'Select seconds',
    seconds: 'seconds',
    start: 'Start',
    repeat: 'Repeat',
    yes: 'Yes',
    no: 'No',
    question: 'Your Question',
    askQuestion: 'Ask the universe a yes/no question...',
    universeAnswer: 'The Universe said to you:',
    takeScreenshot: 'Take Screenshot',
    // Countdown Timer
    selectDateTime: 'Select Date & Time',
    startCountdown: 'Start Countdown',
    timeRemaining: 'Time Remaining',
    days: 'days',
    hours: 'hours',
    minutes: 'min',
    edit: 'Edit',
    // TextPure Categories
    markdownToPlain: 'Markdown → Plain Text',
    markdownToTelegram: 'Markdown → Telegram Text',
    plainToHtmlEmail: 'Plain Text → HTML Email Template',
    plainToOg: 'Plain Text → Open Graph',
    plainToSsml: 'Plain Text → SSML Markup',
    smartTypography: 'Smart Typography',
    plainToJsonYaml: 'Plain Text → JSON/YAML',
    transformationCategories: 'Transformation Type',
    markdownToPlainDesc: '**What it does:** removes formatting characters (#, *, `) and converts lists, headings and links to readable text.\n**Why it\'s needed:** convenience for publishing on platforms that don\'t support Markdown (SMS, messengers, banners).',
    markdownToTelegramDesc: '**What it does:** converts standard Markdown to Telegram Markdown V2, escaping all special characters and formatting for safe use in Telegram bots and messages.\n**Why it\'s needed:** ensures your formatted text is displayed correctly in Telegram, avoiding formatting errors and message rejections.',
    plainToHtmlEmailDesc: '**What it does:** transforms plain text into semantic tags <h1>…</h1>, <p>…</p>, <ul>…</ul> with inline CSS for styling.\n**Why it\'s needed:** guaranteed cross-mail client compatibility and flexible adaptation to any email client.',
    plainToOgDesc: '**What it does:** generates Open Graph meta tags (<meta property="og:title"/>, etc.) and Twitter Card for social media preview cards.\n**Why it\'s needed:** automatic generation of attractive preview cards on Facebook, LinkedIn, and Twitter when sharing.',
    plainToSsmlDesc: '**What it does:** wraps text in <speak>, <break time="500ms"/>, <emphasis level="strong"/>, etc. to add intonation, pauses and emphasis.\n**Why it\'s needed:** high-quality speech synthesis for Alexa Skills, Google Assistant, and audio advertising.',
    smartTypographyDesc: '**What it does:** replaces straight quotes with smart quotes, -- with em dash (—), ... with ellipsis (…), and inserts non-breaking spaces before punctuation (§!?.) and between numbers and units.\n**Why it\'s needed:** professional typography that improves readability and brand style on websites and newsletters.',
    plainToJsonYamlDesc: '**What it does:** converts headings, lists, and text blocks into structured objects (YAML or JSON).\n**Why it\'s needed:** easy integration into headless CMS, newsletter generation, and automatic content migration between platforms.',
    // Codex Prompt Forge
    yourRequest: 'Your Request',
    describeCodingTask: 'Describe the coding task you want to solve',
    exampleCreateFunction: 'For example: Create a function to sort an array of objects by multiple fields...',
    aboutCodexPromptForge: 'About Codex Prompt Forge',
    transformsCodingRequests: 'Transforms coding requests into battle-tested prompts',
    codexConvertsAny: 'Codex Prompt Forge converts any coding request into a battle-tested Codex prompt that includes:',
    clearTaskDefinition: 'Clear task definition',
    requiredContext: 'Required context',
    outputSpecification: 'Output specification',
    structuredChainOfThought: 'Structured chain-of-thought plan',
    selfReviewLoop: 'Self-review loop',
    worksWithAny: 'Works with any programming language and repository without extra setup.',
    openInNewWindow: 'Open in new window',
    // Footer
    project: 'Project',
    techStack: 'Tech Stack',
    email: 'Email',
    telegram: 'Telegram',
  },
  uk: {
    // Header
    searchFunctions: 'Пошук фіч...',
    // Home
    functionsShowcase: 'Вітрина фіч',
    functionsDescription: 'Колекція корисних інструментів і фіч для щоденних завдань',
    noFunctionsFound: 'Фічі не знайдено',
    modifySearchQuery: 'Спробуйте змінити пошуковий запит',
    // Function cards
    open: 'Відкрити',
    back: 'Назад',
    // TextPure
    originalText: 'Вихідний текст',
    pasteTextWithFormatting: 'Вставте текст з символами форматування для очищення',
    pasteTextHere: 'Вставте текст тут...',
    clear: 'Очистити',
    cleanedText: 'Результат',
    resultOfCleaning: 'Результат очищення тексту від символів форматування',
    resultWillAppearHere: 'Результат з\'явиться тут...',
    copied: 'Скопійовано!',
    copyResult: 'Скопіювати результат',
    generate: 'Згенерувати',
    textCleanerTool: 'Очищення тексту',
    generateSuccess: 'Текст успішно згенеровано',
    generateError: 'Не вдалося згенерувати текст',
    emptyInputError: 'Будь ласка, введіть текст для генерації.',
    selectSeconds: 'Оберіть секунди',
    seconds: 'секунд',
    start: 'Почати',
    repeat: 'Повторити',
    yes: 'Так',
    no: 'Ні',
    question: 'Ваше питання',
    askQuestion: 'Задайте Всесвіту питання...',
    universeAnswer: 'Всесвіт сказав вам:',
    takeScreenshot: 'Зробити знімок екрану',
    // Countdown Timer
    selectDateTime: 'Оберіть дату і час',
    startCountdown: 'Почати відлік',
    timeRemaining: 'Залишилось часу',
    days: 'днів',
    hours: 'годин',
    minutes: 'хв',
    edit: 'Змінити',
    // TextPure Categories
    markdownToPlain: 'Markdown → Звичайний текст',
    markdownToTelegram: 'Markdown → Telegram-текст',
    plainToHtmlEmail: 'Звичайний текст → HTML шаблон email',
    plainToOg: 'Звичайний текст → Open Graph',
    plainToSsml: 'Звичайний текст → SSML розмітка',
    smartTypography: 'Розумна типографіка',
    plainToJsonYaml: 'Звичайний текст → JSON/YAML',
    transformationCategories: 'Тип трансформації',
    markdownToPlainDesc: 'Що робить: видаляє символи розмітки (#, *, `) і перетворює списки, заголовки та посилання на читабельний текст.\nНавіщо: зручність публікацій на майданчиках, що не підтримують Markdown (SMS-розсилки, месенджери, банери).',
    markdownToTelegramDesc: 'Що робить: конвертує стандартний Markdown у Markdown V2 для Telegram, екранує всі спецсимволи та форматування для безпечного використання в ботах і повідомленнях Telegram.\nНавіщо: гарантує коректне відображення форматованого тексту в Telegram, уникаючи помилок форматування та відхилення повідомлень.',
    plainToHtmlEmailDesc: 'Що робить: перетворює звичайний текст у семантичні теги <h1>…</h1>, <p>…</p>, <ul>…</ul> з inline-CSS для стилізації.\nНавіщо: гарантована крос-клієнтська сумісність email та гнучка адаптація до будь-якого поштового клієнта.',
    plainToOgDesc: 'Що робить: генерує мета-теги Open Graph (<meta property="og:title"/>, тощо) та Twitter Card для соціальних мереж.\nНавіщо: красиві прев\'ю-карточки при шарингу в Facebook, LinkedIn, Twitter.',
    plainToSsmlDesc: 'Що робить: обгортає текст у теги <speak>, <break time="500ms"/>, <emphasis level="strong"/> тощо, задає інтонацію, паузи, наголоси.\nНавіщо: якісне озвучування в Alexa Skills, Google Assistant та аудіорекламі.',
    smartTypographyDesc: 'Що робить: замінює прямі лапки на «ёлочки», -- на довге тире (—), ... на «…», вставляє нерозривні пробіли перед знаками пунктуації (§!?.) та між числом і одиницею виміру.\nНавіщо: професійний вигляд текстів; покращує читабельність і стиль бренду на сайтах і в розсилках.',
    plainToJsonYamlDesc: 'Що робить: перетворює заголовки, списки та блоки тексту на структуровані об\'єкти (YAML або JSON).\nНавіщо: легка інтеграція в headless CMS, генерація newsletter, автоматичний перенос контенту між платформами.',
    // Codex Prompt Forge
    yourRequest: 'Ваш запит',
    describeCodingTask: 'Опишіть задачу кодування, яку ви хочете вирішити',
    exampleCreateFunction: 'Наприклад: Створити функцію для сортування масиву об\'єктів за декількома полями...',
    aboutCodexPromptForge: 'Про Codex Prompt Forge',
    transformsCodingRequests: 'Перетворює запити з кодування на перевірені промпти',
    codexConvertsAny: 'Codex Prompt Forge перетворює будь-який запит з кодування на перевірений промпт для Codex, що включає:',
    clearTaskDefinition: 'Чітке визначення задачі',
    requiredContext: 'Необхідний контекст',
    outputSpecification: 'Специфікацію результату',
    structuredChainOfThought: 'Структурований план мислення',
    selfReviewLoop: 'Цикл самоперевірки',
    worksWithAny: 'Працює з будь-якою мовою програмування та репозиторієм без додаткових налаштувань.',
    openInNewWindow: 'Відкрити в новому вікні',
    // Footer
    project: 'Проект',
    techStack: 'Стек технологій',
    email: 'Пошта',
    telegram: 'Телеграм',
  },
  ru: {
    // Header
    searchFunctions: 'Поиск фич...',
    // Home
    functionsShowcase: 'Витрина фич',
    functionsDescription: 'Коллекция полезных инструментов и фичей для повседневных задач',
    noFunctionsFound: 'Фичи не найдены',
    modifySearchQuery: 'Попробуйте изменить поисковой запрос',
    // Function cards
    open: 'Открыть',
    back: 'Назад',
    // TextPure
    originalText: 'Исходный текст',
    pasteTextWithFormatting: 'Вставьте текст с символами форматирования для очистки',
    pasteTextHere: 'Вставьте текст здесь...',
    clear: 'Очистить',
    cleanedText: 'Результат',
    resultOfCleaning: 'Результат очистки текста от символов форматирования',
    resultWillAppearHere: 'Результат появится здесь...',
    copied: 'Скопировано!',
    copyResult: 'Копировать результат',
    generate: 'Генерировать',
    textCleanerTool: 'Очистка текста',
    generateSuccess: 'Текст успешно сгенерирован',
    generateError: 'Не удалось сгенерировать текст',
    emptyInputError: 'Пожалуйста, введите текст для генерации.',
    selectSeconds: 'Выберите секунды',
    seconds: 'секунд',
    start: 'Старт',
    repeat: 'Повторить',
    yes: 'Да',
    no: 'Нет',
    question: 'Ваш вопрос',
    askQuestion: 'Задайте Вселенной вопрос...',
    universeAnswer: 'Вселенная сказала вам:',
    takeScreenshot: 'Сделать снимок экрана',
    // Countdown Timer
    selectDateTime: 'Выберите дату и время',
    startCountdown: 'Начать отсчет',
    timeRemaining: 'Осталось времени',
    days: 'дней',
    hours: 'часов',
    minutes: 'мин',
    edit: 'Изменить',
    // TextPure Categories
    markdownToPlain: 'Markdown → Обычный текст',
    markdownToTelegram: 'Markdown → Telegram-текст',
    plainToHtmlEmail: 'Обычный текст → HTML шаблон email',
    plainToOg: 'Обычный текст → Open Graph',
    plainToSsml: 'Обычный текст → SSML разметка',
    smartTypography: 'Умная типографика',
    plainToJsonYaml: 'Обычный текст → JSON/YAML',
    transformationCategories: 'Тип трансформации',
    markdownToPlainDesc: 'Что делает: убирает символы разметки (#, *, `) и преобразует списки, заголовки и ссылки в читабельный текст.\nЗачем нужно: удобство публикаций на поверхностях, не поддерживающих Markdown (SMS-рассылки, мессенджеры, баннеры).',
    markdownToTelegramDesc: 'Что делает: конвертирует стандартный Markdown в Markdown V2 для Telegram, экранирует все спецсимволы и форматирование для безопасного использования в ботах и сообщениях Telegram.\nЗачем нужно: гарантирует корректное отображение форматированного текста в Telegram, избегая ошибок форматирования и отклонения сообщений.',
    plainToHtmlEmailDesc: 'Что делает: превращает обычный текст в семантические теги <h1>…</h1>, <p>…</p>, <ul>…</ul>, добавляет inline-CSS для стилизации.\nЗачем нужно: гарантированная кросс-почтовая вёрстка, гибкая адаптация под любой email-клиент.',
    plainToOgDesc: 'Что делает: комплект метатегов <meta property="og:title"/>, <meta property="og:description"/>, <meta property="og:image"/> и вёрстку для Twitter Card.\nЗачем нужно: при шаринге в Facebook, LinkedIn, Twitter автоматически генерируется красивая карточка с изображением и описанием.',
    plainToSsmlDesc: 'Что делает: оборачивает текст в теги <speak>, <break time="500ms"/>, <emphasis level="strong"/> и др., задаёт интонацию, паузы, ударения.\nЗачем нужно: качественная озвучка в Alexa Skills, Google Assistant, аудиореклама.',
    smartTypographyDesc: 'Что делает: заменяет прямые кавычки на «ёлочки», -- на длинное тире (—), ... на «…», вставляет неразрывные пробелы перед знаками §!?, а также между числом и единицей.\nЗачем нужно: профессиональный вид текстов; улучшает читаемость и брендовый стиль на сайтах и в рассылках.',
    plainToJsonYamlDesc: 'Что делает: превращает заголовки, списки, блоки текста в структурированные объекты (YAML или JSON).\nЗачем нужно: лёгкая интеграция в headless CMS, генерация newsletter, автоматический перенос контента между платформами.',
    // Codex Prompt Forge
    yourRequest: 'Ваш запрос',
    describeCodingTask: 'Опишите задачу кодирования, которую вы хотите решить',
    exampleCreateFunction: 'Например: Создать функцию для сортировки массива объектов по нескольким полям...',
    aboutCodexPromptForge: 'О Codex Prompt Forge',
    transformsCodingRequests: 'Превращает запросы по кодированию в проверенные промпты',
    codexConvertsAny: 'Codex Prompt Forge превращает любой запрос по кодированию в проверенный промпт для Codex, включающий:',
    clearTaskDefinition: 'Четкую постановку задачи',
    requiredContext: 'Необходимый контекст',
    outputSpecification: 'Спецификацию результата',
    structuredChainOfThought: 'Структурированный план мышления',
    selfReviewLoop: 'Цикл самопроверки',
    worksWithAny: 'Работает с любым языком программирования и репозиторием без дополнительной настройки.',
    openInNewWindow: 'Открыть в новом окне',
    // Footer
    project: 'Проект',
    techStack: 'Технический стек',
    email: 'Почта',
    telegram: 'Телеграм',
  },
  es: {
    // Header
    searchFunctions: 'Buscar características...',
    // Home
    functionsShowcase: 'Escaparate de Características',
    functionsDescription: 'Una colección de herramientas y características útiles para tareas cotidianas',
    noFunctionsFound: 'No se encontraron características',
    modifySearchQuery: 'Intente modificar su consulta de búsqueda',
    // Function cards
    open: 'Abrir',
    back: 'Volver',
    // TextPure
    originalText: 'Texto Original',
    pasteTextWithFormatting: 'Pegue texto con caracteres de formato para limpiar',
    pasteTextHere: 'Pegue el texto aquí...',
    clear: 'Limpiar',
    cleanedText: 'Resultado',
    resultOfCleaning: 'Resultado de limpiar el texto de caracteres de formato',
    resultWillAppearHere: 'El resultado aparecerá aquí...',
    copied: '¡Copiado!',
    copyResult: 'Copiar resultado',
    generate: 'Generar',
    textCleanerTool: 'Limpiador de Texto',
    generateSuccess: 'Texto generado exitosamente',
    generateError: 'Error al generar el texto',
    emptyInputError: 'Por favor ingrese texto para generar.',
    selectSeconds: 'Seleccione segundos',
    seconds: 'segundos',
    start: 'Iniciar',
    repeat: 'Repetir',
    yes: 'Sí',
    no: 'No',
    question: 'Tu Pregunta',
    askQuestion: 'Haz una pregunta de sí/no al universo...',
    universeAnswer: 'El Universo te ha dicho:',
    takeScreenshot: 'Capturar Pantalla',
    // Countdown Timer
    selectDateTime: 'Seleccione fecha y hora',
    startCountdown: 'Iniciar cuenta regresiva',
    timeRemaining: 'Tiempo restante',
    days: 'días',
    hours: 'horas',
    minutes: 'min',
    edit: 'Editar',
    // TextPure Categories
    markdownToPlain: 'Markdown → Texto Plano',
    markdownToTelegram: 'Markdown → Texto para Telegram',
    plainToHtmlEmail: 'Texto Plano → Plantilla HTML Email',
    plainToOg: 'Texto Plano → Open Graph',
    plainToSsml: 'Texto Plano → Marcado SSML',
    smartTypography: 'Tipografía Inteligente',
    plainToJsonYaml: 'Texto Plano → JSON/YAML',
    transformationCategories: 'Tipo de Transformación',
    markdownToPlainDesc: 'Qué hace: elimina caracteres de formato (#, *, `) y convierte listas, encabezados y enlaces en texto legible.\nPor qué es necesario: comodidad para publicar en plataformas que no soportan Markdown (SMS, mensajería, banners).',
    markdownToTelegramDesc: 'Qué hace: convierte Markdown estándar a Markdown V2 de Telegram, escapando todos los caracteres especiales y el formato para un uso seguro en bots y mensajes de Telegram.\nPor qué es necesario: asegura que tu texto formateado se muestre correctamente en Telegram, evitando errores de formato y rechazos de mensajes.',
    plainToHtmlEmailDesc: 'Qué hace: convierte texto plano en etiquetas semánticas <h1>…</h1>, <p>…</p>, <ul>…</ul> con CSS inline para estilos.\nPor qué es necesario: compatibilidad garantizada entre clientes de correo y adaptación flexible a cualquier cliente de email.',
    plainToOgDesc: 'Qué hace: genera meta etiquetas Open Graph (<meta property="og:title"/>, etc.) y Twitter Card para tarjetas de vista previa en redes sociales.\nPor qué es necesario: tarjetas de vista previa atractivas al compartir en Facebook, LinkedIn y Twitter.',
    plainToSsmlDesc: 'Qué hace: envuelve el texto en <speak>, <break time="500ms"/>, <emphasis level="strong"/>, etc., para añadir entonación, pausas y énfasis.\nPor qué es necesario: síntesis de voz de alta calidad para Alexa Skills, Google Assistant y publicidad de audio.',
    smartTypographyDesc: 'Qué hace: reemplaza comillas rectas por comillas tipográficas, -- por raya (—), ... por puntos suspensivos (…), inserta espacios duros antes de signos de puntuación (§!?.) y entre número y unidad.\nPor qué es necesario: tipografía profesional que mejora la legibilidad y el estilo de marca en sitios y boletines.',
    plainToJsonYamlDesc: 'Qué hace: convierte encabezados, listas y bloques de texto en objetos estructurados (YAML o JSON).\nPor qué es necesario: fácil integración en CMS sin cabeza, generación de newsletters y migración automática de contenido entre plataformas.',
    // Codex Prompt Forge
    yourRequest: 'Tu Solicitud',
    describeCodingTask: 'Describe la tarea de codificación que quieres resolver',
    exampleCreateFunction: 'Por ejemplo: Crear una función para ordenar un array de objetos por múltiples campos...',
    aboutCodexPromptForge: 'Acerca de Codex Prompt Forge',
    transformsCodingRequests: 'Transforma solicitudes de codificación en prompts probados',
    codexConvertsAny: 'Codex Prompt Forge convierte cualquier solicitud de codificación en un prompt Codex probado que incluye:',
    clearTaskDefinition: 'Definición clara de la tarea',
    requiredContext: 'Contexto requerido',
    outputSpecification: 'Especificación de salida',
    structuredChainOfThought: 'Plan estructurado de cadena de pensamiento',
    selfReviewLoop: 'Ciclo de auto-revisión',
    worksWithAny: 'Funciona con cualquier lenguaje de programación y repositorio sin configuración adicional.',
    openInNewWindow: 'Abrir en nueva ventana',
    // Footer
    project: 'Proyecto',
    techStack: 'Stack Tecnológico',
    email: 'Correo',
    telegram: 'Telegram',
  },
}; 