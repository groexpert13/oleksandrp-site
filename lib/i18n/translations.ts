export type Language = 'en' | 'uk' | 'ru' | 'es';

export type TranslationKey = 
  // Header
  | 'searchFunctions'
  // Home
  | 'functionsShowcase'
  | 'functionsDescription'
  | 'marketplace'
  | 'marketplaceDescription'
  | 'noFunctionsFound'
  | 'noItemsFound'
  | 'modifySearchQuery'
  // Marketplace
  | 'allCategories'
  | 'telegramCategory'
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
  | 'copy'
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
  | 'praiseEbtyMolodec'
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
  // UTM Builder Parser
  | 'utmBuilder'
  | 'utmParser'
  | 'createUtmLink'
  | 'fillFieldsForUtm'
  | 'baseUrl'
  | 'utmSource'
  | 'utmMedium'
  | 'utmCampaign'
  | 'utmTerm'
  | 'utmContent'
  | 'generateLink'
  | 'reset'
  | 'generatedUtmLink'
  | 'parseUtmLink'
  | 'enterUtmLinkToAnalyze'
  | 'urlWithUtmParameters'
  | 'parseUrl'
  | 'parameter'
  | 'value'
  | 'noUtmParametersFound'
  | 'invalidUrl'
  | 'selectOrEnterSource'
  | 'selectOrEnterMedium'
  | 'selectOrEnterCampaign'
  | 'customValue'
  // Color Contrast Checker
  | 'colorContrastChecker'
  | 'colorContrastCheckerDescription'
  | 'foregroundColor'
  | 'backgroundColor'
  | 'pickForegroundColor'
  | 'pickBackgroundColor'
  | 'swapColors'
  | 'contrastRatio'
  | 'wcagRating'
  | 'level'
  | 'fontSize'
  | 'minimumRatio'
  | 'result'
  | 'smallText'
  | 'largeText'
  | 'suggestion'
  | 'increaseBrightness'
  | 'decreaseBrightness'
  | 'invalidColors'
  | 'copyResults'
  // Markdown Slides
  | 'markdownSlides'
  | 'markdownSlidesDescription'
  | 'markdownContent'
  | 'markdownPlaceholder'
  | 'markdownInstruction'
  | 'error'
  | 'generateSlides'
  | 'generating'
  | 'slidesReady'
  | 'copyLink'
  | 'openPresentation'
  | 'markdownEmpty'
  | 'markdownNoSeparator'
  // Footer
  | 'project'
  | 'techStack'
  | 'email'
  | 'telegram'
  // Commit Message Linter
  | 'commitTypeFeat'
  | 'commitTypeFix'
  | 'commitTypeDocs'
  | 'commitTypeStyle'
  | 'commitTypeRefactor'
  | 'commitTypePerf'
  | 'commitTypeTest'
  | 'commitTypeBuild'
  | 'commitTypeCi'
  | 'commitTypeChore'
  | 'lintErrorMissingType'
  | 'lintFixAddValidType'
  | 'lintErrorInvalidType'
  | 'lintFixUseValidType'
  | 'lintErrorMissingSubject'
  | 'lintFixAddSubject'
  | 'lintErrorCapitalSubject'
  | 'lintFixLowercaseSubject'
  | 'lintErrorSubjectPeriod'
  | 'lintFixRemovePeriod'
  | 'lintErrorInvalidFormat'
  | 'lintFixUseFormat'
  | 'lintErrorParsingFailed'
  | 'commitMessageLinter'
  | 'commitMessageLinterDescription'
  | 'commitType'
  | 'selectCommitType'
  | 'insertExample'
  | 'commitMessage'
  | 'copied'
  | 'copy'
  | 'commitMessagePlaceholder'
  | 'commitFormatGuide'
  | 'commitFormatGuideDescription'
  | 'validation'
  | 'parsedOutput'
  | 'tooltipParsedOutput'
  | 'tooltipType'
  | 'tooltipScope'
  | 'tooltipSubject'
  | 'tooltipBody'
  | 'tooltipFooter'
  | 'tooltipBreaking'
  | 'tooltipReferences'
  | 'tooltipMentions'
  | 'fix'
  | 'validCommitMessage'
  | 'commitValidationSuccess'
  | 'enterCommitMessage'
  | 'type'
  | 'scope'
  | 'subject'
  | 'body'
  | 'footer'
  | 'breaking'
  | 'references'
  | 'mentions'
  | 'noCommitToParse'
  // Timezone Meeting Planner
  | 'timezoneMeetingPlanner'
  | 'timezoneMeetingPlannerDescription'
  | 'meetingTime'
  | 'participant'
  | 'date'
  | 'time'
  | 'addParticipant'
  | 'participantName'
  | 'selectTimezone'
  | 'add';

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
    marketplace: 'Marketplace',
    marketplaceDescription: 'Browse and install available plugins',
    noFunctionsFound: 'No features found',
    noItemsFound: 'No marketplace items found',
    modifySearchQuery: 'Try modifying your search query',
    // Marketplace
    allCategories: 'All',
    telegramCategory: 'Telegram',
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
    copy: 'Copy',
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
    // UTM Builder Parser
    utmBuilder: 'UTM Builder',
    utmParser: 'UTM Parser',
    createUtmLink: 'Create UTM Link',
    fillFieldsForUtm: 'Fill in the fields to generate a UTM-tagged URL',
    baseUrl: 'Base URL',
    utmSource: 'UTM Source',
    utmMedium: 'UTM Medium',
    utmCampaign: 'UTM Campaign',
    utmTerm: 'UTM Term (optional)',
    utmContent: 'UTM Content (optional)',
    generateLink: 'Generate Link',
    reset: 'Reset',
    generatedUtmLink: 'Generated UTM Link',
    parseUtmLink: 'Parse UTM Link',
    enterUtmLinkToAnalyze: 'Enter a URL with UTM parameters to analyze',
    urlWithUtmParameters: 'URL with UTM parameters',
    parseUrl: 'Parse URL',
    parameter: 'Parameter',
    value: 'Value',
    noUtmParametersFound: 'No UTM parameters found in URL',
    invalidUrl: 'Invalid URL',
    selectOrEnterSource: 'Select or enter source',
    selectOrEnterMedium: 'Select or enter medium',
    selectOrEnterCampaign: 'Select or enter campaign',
    customValue: 'Custom value...',
    // Color Contrast Checker
    colorContrastChecker: 'Color Contrast Checker',
    colorContrastCheckerDescription: 'Check color contrast and WCAG accessibility compliance between foreground and background colors',
    foregroundColor: 'Foreground Color',
    backgroundColor: 'Background Color',
    pickForegroundColor: 'Pick foreground color',
    pickBackgroundColor: 'Pick background color',
    swapColors: 'Swap Colors',
    contrastRatio: 'Contrast Ratio',
    wcagRating: 'WCAG Rating',
    level: 'Level',
    fontSize: 'Font Size',
    minimumRatio: 'Minimum Ratio',
    result: 'Result',
    smallText: 'Small text (< 18pt)',
    largeText: 'Large text (≥ 18pt)',
    suggestion: 'Suggestion',
    increaseBrightness: 'Try increasing brightness by +{value}%',
    decreaseBrightness: 'Try decreasing brightness by -{value}%',
    invalidColors: 'Invalid color values',
    copyResults: 'Copy Results',
    // Markdown Slides
    markdownSlides: 'Markdown → Slides',
    markdownSlidesDescription: 'Create presentation slides from markdown text with slide separators',
    markdownContent: 'Markdown Content',
    markdownPlaceholder: 'Enter your markdown here. Use --- to separate slides...',
    markdownInstruction: 'Separate slides with --- on a new line. Use standard Markdown formatting.',
    error: 'Error',
    generateSlides: 'Generate Slides',
    generating: 'Generating...',
    slidesReady: 'Your slides are ready!',
    copyLink: 'Copy Link',
    openPresentation: 'Open Presentation',
    markdownEmpty: 'Markdown content cannot be empty',
    markdownNoSeparator: 'No slide separators found. Use --- to divide content into slides.',
    // TextPure Categories
    markdownToPlain: 'Markdown → Plain Text',
    markdownToTelegram: 'Markdown → Telegram Text',
    plainToHtmlEmail: 'Plain Text → HTML Email Template',
    plainToOg: 'Plain Text → Open Graph',
    plainToSsml: 'Plain Text → SSML Markup',
    smartTypography: 'Smart Typography',
    plainToJsonYaml: 'Plain Text → JSON/YAML',
    praiseEbtyMolodec: 'Text → F*ck, you\'re awesome!',
    transformationCategories: 'Transformation Type',
    markdownToPlainDesc: '**What it does:** removes Markdown formatting characters (#, *, `) and converts lists, headings, and links into readable plain text.\n**Why it\'s needed:** ideal for stripping leftover markup from neural-generated outputs (e.g., ChatGPT and other AI models) and for publishing on platforms that don\'t support Markdown (SMS, messengers, banners).',
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
    // Commit Message Linter
    commitTypeFeat: 'A new feature',
    commitTypeFix: 'A bug fix',
    commitTypeDocs: 'Documentation only changes',
    commitTypeStyle: 'Code style changes',
    commitTypeRefactor: 'Code refactoring',
    commitTypePerf: 'Performance improvements',
    commitTypeTest: 'Adding tests',
    commitTypeBuild: 'Build system changes',
    commitTypeCi: 'CI configuration changes',
    commitTypeChore: 'Chores',
    lintErrorMissingType: 'Commit type is missing',
    lintFixAddValidType: 'Add a valid commit type',
    lintErrorInvalidType: 'Invalid commit type',
    lintFixUseValidType: 'Use a valid commit type',
    lintErrorMissingSubject: 'Commit subject is missing',
    lintFixAddSubject: 'Add a commit subject',
    lintErrorCapitalSubject: 'Subject should not start with a capital letter',
    lintFixLowercaseSubject: 'Make subject lowercase',
    lintErrorSubjectPeriod: 'Subject should not end with a period',
    lintFixRemovePeriod: 'Remove trailing period',
    lintErrorInvalidFormat: 'Invalid commit header format',
    lintFixUseFormat: 'Use format: type(scope): subject',
    lintErrorParsingFailed: 'Failed to parse commit message',
    commitMessageLinter: 'Commit Message Linter',
    commitMessageLinterDescription: 'Lint and format conventional commit messages',
    commitType: 'Commit Type',
    selectCommitType: 'Select commit type',
    insertExample: 'Insert example',
    commitMessage: 'Commit Message',
    commitMessagePlaceholder: 'Enter your commit message here...',
    commitFormatGuide: 'Commit Format Guide',
    commitFormatGuideDescription: 'Format: type(scope): subject',
    validation: 'Validation',
    parsedOutput: 'Parsed Output',
    tooltipParsedOutput: 'Show the parsed structure of your commit message',
    tooltipType: 'Commit category (e.g., feat, fix, docs)',
    tooltipScope: 'Optional scope of the change (e.g., component name)',
    tooltipSubject: 'Brief summary of the change',
    tooltipBody: 'Detailed description (optional)',
    tooltipFooter: 'Footer notes (e.g., issue links, task IDs)',
    tooltipBreaking: 'Breaking changes indicated by ! or BREAKING-CHANGE',
    tooltipReferences: 'Referenced issues or pull requests',
    tooltipMentions: 'User mentions (e.g., @username)',
    fix: 'Fix',
    validCommitMessage: 'Valid commit message',
    commitValidationSuccess: 'Your commit message looks great!',
    enterCommitMessage: 'Enter a commit message to validate',
    type: 'Type',
    scope: 'Scope',
    subject: 'Subject',
    body: 'Body',
    footer: 'Footer',
    breaking: 'Breaking Changes',
    references: 'References',
    mentions: 'Mentions',
    noCommitToParse: 'No commit message to parse',
    // Timezone Meeting Planner
    timezoneMeetingPlanner: 'Timezone Meeting Planner',
    timezoneMeetingPlannerDescription: 'Compare meeting times across timezones',
    meetingTime: 'Meeting Time',
    participant: 'Participant',
    date: 'Date',
    time: 'Time',
    addParticipant: 'Add Participant',
    participantName: 'Participant Name',
    selectTimezone: 'Select Timezone',
    add: 'Add',
  },
  uk: {
    // Header
    searchFunctions: 'Пошук фіч...',
    // Home
    functionsShowcase: 'Вітрина фіч',
    functionsDescription: 'Колекція корисних інструментів і фіч для щоденних завдань',
    marketplace: 'Маркетплейс',
    marketplaceDescription: 'Перегляд та встановлення доступних плагінів',
    noFunctionsFound: 'Фічі не знайдено',
    noItemsFound: 'Плагіни не знайдено',
    modifySearchQuery: 'Спробуйте змінити пошуковий запит',
    // Marketplace
    allCategories: 'Всі',
    telegramCategory: 'Telegram',
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
    copy: 'Копіювати',
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
    // UTM Builder Parser
    utmBuilder: 'Створення UTM',
    utmParser: 'Аналіз UTM',
    createUtmLink: 'Створити посилання з UTM',
    fillFieldsForUtm: 'Заповніть поля для генерації URL з UTM-мітками',
    baseUrl: 'Базовий URL',
    utmSource: 'UTM Source',
    utmMedium: 'UTM Medium',
    utmCampaign: 'UTM Campaign',
    utmTerm: 'UTM Term (опційно)',
    utmContent: 'UTM Content (опційно)',
    generateLink: 'Згенерувати',
    reset: 'Очистити',
    generatedUtmLink: 'Згенерований UTM-лінк',
    parseUtmLink: 'Розбір UTM-посилання',
    enterUtmLinkToAnalyze: 'Введіть URL з UTM-параметрами для аналізу',
    urlWithUtmParameters: 'URL з UTM-параметрами',
    parseUrl: 'Розібрати URL',
    parameter: 'Параметр',
    value: 'Значення',
    noUtmParametersFound: 'UTM-параметрів у URL не знайдено',
    invalidUrl: 'Невірний URL',
    selectOrEnterSource: 'Виберіть або введіть джерело',
    selectOrEnterMedium: 'Виберіть або введіть медіум',
    selectOrEnterCampaign: 'Виберіть або введіть кампанію',
    customValue: 'Власне значення...',
    // Color Contrast Checker
    colorContrastChecker: 'Перевірка контрастності кольорів',
    colorContrastCheckerDescription: 'Перевірте контрастність та відповідність WCAG між кольорами тексту та фону',
    foregroundColor: 'Колір тексту',
    backgroundColor: 'Колір фону',
    pickForegroundColor: 'Вибрати колір тексту',
    pickBackgroundColor: 'Вибрати колір фону',
    swapColors: 'Поміняти кольори місцями',
    contrastRatio: 'Коефіцієнт контрастності',
    wcagRating: 'Рейтинг WCAG',
    level: 'Рівень',
    fontSize: 'Розмір шрифту',
    minimumRatio: 'Мінімальний коефіцієнт',
    result: 'Результат',
    smallText: 'Малий текст (< 18pt)',
    largeText: 'Великий текст (≥ 18pt)',
    suggestion: 'Пропозиція',
    increaseBrightness: 'Спробуйте збільшити яскравість на +{value}%',
    decreaseBrightness: 'Спробуйте зменшити яскравість на -{value}%',
    invalidColors: 'Невірні значення кольорів',
    copyResults: 'Скопіювати результати',
    // Markdown Slides
    markdownSlides: 'Markdown → Слайди',
    markdownSlidesDescription: 'Створюйте презентаційні слайди з тексту Markdown з роздільниками слайдів',
    markdownContent: 'Markdown вміст',
    markdownPlaceholder: 'Введіть ваш Markdown тут. Використовуйте --- для розділення слайдів...',
    markdownInstruction: 'Розділяйте слайди за допомогою --- на новому рядку. Використовуйте стандартне форматування Markdown.',
    error: 'Помилка',
    generateSlides: 'Створити слайди',
    generating: 'Генерується...',
    slidesReady: 'Ваші слайди готові!',
    copyLink: 'Скопіювати посилання',
    openPresentation: 'Відкрити презентацію',
    markdownEmpty: 'Вміст Markdown не може бути порожнім',
    markdownNoSeparator: 'Не знайдено роздільників слайдів. Використовуйте ---, щоб розділити вміст на слайди.',
    // TextPure Categories
    markdownToPlain: 'Markdown → Звичайний текст',
    markdownToTelegram: 'Markdown → Telegram-текст',
    plainToHtmlEmail: 'Звичайний текст → HTML шаблон email',
    plainToOg: 'Звичайний текст → Open Graph',
    plainToSsml: 'Звичайний текст → SSML розмітка',
    smartTypography: 'Розумна типографіка',
    plainToJsonYaml: 'Звичайний текст → JSON/YAML',
    praiseEbtyMolodec: 'Text → Бляха, ти молодець!',
    transformationCategories: 'Тип трансформації',
    markdownToPlainDesc: '**Що робить:** видаляє символи розмітки Markdown (#, *, `) і перетворює списки, заголовки та посилання на читабельний текст.\n**Навіщо:** ідеально підходить для очищення нейронно згенерованого тексту (наприклад, ChatGPT та інших AI-моделей) та публікації на платформах, які не підтримують Markdown (SMS-розсилки, месенджери, банери).',
    markdownToTelegramDesc: '**What it does:** converts standard Markdown to Telegram Markdown V2, escaping all special characters and formatting for safe use in Telegram bots and messages.\n**Why it\'s needed:** ensures your formatted text is displayed correctly in Telegram, avoiding formatting errors and message rejections.',
    plainToHtmlEmailDesc: '**What it does:** transforms plain text into semantic tags <h1>…</h1>, <p>…</p>, <ul>…</ul> with inline CSS for styling.\n**Why it\'s needed:** guaranteed cross-mail client compatibility and flexible adaptation to any email client.',
    plainToOgDesc: '**What it does:** generates Open Graph meta tags (<meta property="og:title"/>, etc.) and Twitter Card for social media preview cards.\n**Why it\'s needed:** automatic generation of attractive preview cards on Facebook, LinkedIn, and Twitter when sharing.',
    plainToSsmlDesc: '**What it does:** wraps text in <speak>, <break time="500ms"/>, <emphasis level="strong"/>, etc. to add intonation, pauses and emphasis.\n**Why it\'s needed:** high-quality speech synthesis for Alexa Skills, Google Assistant, and audio advertising.',
    smartTypographyDesc: '**What it does:** replaces straight quotes with smart quotes, -- with em dash (—), ... with ellipsis (…), and inserts non-breaking spaces before punctuation (§!?.) and between numbers and units.\n**Why it\'s needed:** professional typography that improves readability and brand style on websites and newsletters.',
    plainToJsonYamlDesc: '**What it does:** converts headings, lists, and text blocks into structured objects (YAML or JSON).\n**Why it\'s needed:** easy integration into headless CMS, newsletter generation, and automatic content migration between platforms.',
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
    // Commit Message Linter
    commitTypeFeat: 'Нова функція',
    commitTypeFix: 'Виправлення помилки',
    commitTypeDocs: 'Зміни тільки в документації',
    commitTypeStyle: 'Зміни стилю коду',
    commitTypeRefactor: 'Рефакторинг коду',
    commitTypePerf: 'Покращення продуктивності',
    commitTypeTest: 'Додавання тестів',
    commitTypeBuild: 'Зміни системи збірки',
    commitTypeCi: 'Зміни CI конфігурації',
    commitTypeChore: 'Побічні зміни',
    lintErrorMissingType: 'Відсутній тип коміту',
    lintFixAddValidType: 'Додайте дійсний тип коміту',
    lintErrorInvalidType: 'Неправильний тип коміту',
    lintFixUseValidType: 'Використовуйте дійсний тип коміту',
    lintErrorMissingSubject: 'Відсутній опис коміту',
    lintFixAddSubject: 'Додайте опис коміту',
    lintErrorCapitalSubject: 'Опис не повинен починатися з великої літери',
    lintFixLowercaseSubject: 'Зробіть опис з малої літери',
    lintErrorSubjectPeriod: 'Опис не повинен закінчуватися крапкою',
    lintFixRemovePeriod: 'Приберіть крапку в кінці',
    lintErrorInvalidFormat: 'Невірний формат заголовка коміту',
    lintFixUseFormat: 'Використовуйте формат: type(scope): subject',
    lintErrorParsingFailed: 'Не вдалося розпарсити коміт',
    commitMessageLinter: 'Лінтер повідомлень комітів',
    commitMessageLinterDescription: 'Перевіряє та форматувати конвенційні повідомлення комітів',
    commitType: 'Тип коміту',
    selectCommitType: 'Виберіть тип коміту',
    insertExample: 'Вставити приклад',
    commitMessage: 'Повідомлення коміту',
    commitMessagePlaceholder: 'Введіть повідомлення коміту...',
    commitFormatGuide: 'Посібник формату коміту',
    commitFormatGuideDescription: 'Формат: type(scope): subject',
    validation: 'Перевірка',
    parsedOutput: 'Розпарсено',
    tooltipParsedOutput: 'Показати розпізнану структуру повідомлення коміту',
    tooltipType: 'Категорія коміту (наприклад feat, fix, docs)',
    tooltipScope: 'Необов\'язкова область зміни (наприклад назва компонента)',
    tooltipSubject: 'Короткий опис зміни',
    tooltipBody: 'Детальний опис (необов\'язково)',
    tooltipFooter: 'Примітки футера (наприклад посилання на issue, ID задачі)',
    tooltipBreaking: 'Важливі зміни, позначені ! або BREAKING-CHANGE',
    tooltipReferences: 'Посилання на issue або pull request',
    tooltipMentions: 'Упоминання користувачів (наприклад @username)',
    fix: 'Виправити',
    validCommitMessage: 'Повідомлення коректне',
    commitValidationSuccess: 'Ваше повідомлення коміту чудове!',
    enterCommitMessage: 'Введіть повідомлення коміту для перевірки',
    type: 'Тип',
    scope: 'Область',
    subject: 'Тема',
    body: 'Тіло',
    footer: 'Футер',
    breaking: 'Значні зміни',
    references: 'Посилання',
    mentions: 'Згадки',
    noCommitToParse: 'Немає повідомлення для розбору',
    // Timezone Meeting Planner
    timezoneMeetingPlanner: 'Планувальник часового поясу',
    timezoneMeetingPlannerDescription: 'Порівняйте час зустрічі в різних часових поясах',
    meetingTime: 'Час зустрічі',
    participant: 'Учасник',
    date: 'Дата',
    time: 'Час',
    addParticipant: 'Додати учасника',
    participantName: 'Ім\'я учасника',
    selectTimezone: 'Виберіть часовий пояс',
    add: 'Додати',
  },
  ru: {
    // Header
    searchFunctions: 'Поиск фич...',
    // Home
    functionsShowcase: 'Витрина фич',
    functionsDescription: 'Коллекция полезных инструментов и фичей для повседневных задач',
    marketplace: 'Маркетплейс',
    marketplaceDescription: 'Обзор и установка доступных плагинов',
    noFunctionsFound: 'Фичи не найдены',
    noItemsFound: 'Плагины не найдены',
    modifySearchQuery: 'Попробуйте изменить поисковый запрос',
    // Marketplace
    allCategories: 'Все',
    telegramCategory: 'Telegram',
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
    copy: 'Копировать',
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
    // UTM Builder Parser
    utmBuilder: 'Создание UTM',
    utmParser: 'Анализ UTM',
    createUtmLink: 'Создать UTM-ссылку',
    fillFieldsForUtm: 'Заполните поля для генерации URL с UTM-метками',
    baseUrl: 'Базовый URL',
    utmSource: 'UTM Source',
    utmMedium: 'UTM Medium',
    utmCampaign: 'UTM Campaign',
    utmTerm: 'UTM Term (опционально)',
    utmContent: 'UTM Content (опционально)',
    generateLink: 'Сгенерировать',
    reset: 'Очистить',
    generatedUtmLink: 'Сгенерированная UTM-ссылка',
    parseUtmLink: 'Разбор UTM-ссылки',
    enterUtmLinkToAnalyze: 'Введите URL с UTM-параметрами для анализа',
    urlWithUtmParameters: 'URL с UTM-параметрами',
    parseUrl: 'Разобрать URL',
    parameter: 'Параметр',
    value: 'Значение',
    noUtmParametersFound: 'UTM-параметров в URL не найдено',
    invalidUrl: 'Некорректный URL',
    selectOrEnterSource: 'Выберите или введите источник',
    selectOrEnterMedium: 'Выберите или введите медиум',
    selectOrEnterCampaign: 'Выберите или введите кампанию',
    customValue: 'Свое значение...',
    // Color Contrast Checker
    colorContrastChecker: 'Проверка контрастности цветов',
    colorContrastCheckerDescription: 'Проверьте контрастность и соответствие WCAG между цветами текста и фона',
    foregroundColor: 'Цвет текста',
    backgroundColor: 'Цвет фона',
    pickForegroundColor: 'Выбрать цвет текста',
    pickBackgroundColor: 'Выбрать цвет фона',
    swapColors: 'Поменять цвета местами',
    contrastRatio: 'Коэффициент контрастности',
    wcagRating: 'Рейтинг WCAG',
    level: 'Уровень',
    fontSize: 'Размер шрифта',
    minimumRatio: 'Минимальный коэффициент',
    result: 'Результат',
    smallText: 'Малый текст (< 18pt)',
    largeText: 'Крупный текст (≥ 18pt)',
    suggestion: 'Предложение',
    increaseBrightness: 'Попробуйте увеличить яркость на +{value}%',
    decreaseBrightness: 'Попробуйте уменьшить яркость на -{value}%',
    invalidColors: 'Неверные значения цветов',
    copyResults: 'Копировать результаты',
    // Markdown Slides
    markdownSlides: 'Markdown → Слайды',
    markdownSlidesDescription: 'Создавайте презентационные слайды из текста Markdown с разделителями слайдов',
    markdownContent: 'Markdown содержимое',
    markdownPlaceholder: 'Введите ваш Markdown здесь. Используйте --- для разделения слайдов...',
    markdownInstruction: 'Разделяйте слайды с помощью --- на новой строке. Используйте стандартное форматирование Markdown.',
    error: 'Ошибка',
    generateSlides: 'Создать слайды',
    generating: 'Генерируется...',
    slidesReady: 'Ваши слайды готовы!',
    copyLink: 'Скопировать ссылку',
    openPresentation: 'Открыть презентацию',
    markdownEmpty: 'Содержимое Markdown не может быть пустым',
    markdownNoSeparator: 'Не найдены разделители слайдов. Используйте ---, чтобы разделить содержимое на слайды.',
    // TextPure Categories
    markdownToPlain: 'Markdown → Обычный текст',
    markdownToTelegram: 'Markdown → Telegram-текст',
    plainToHtmlEmail: 'Обычный текст → HTML шаблон email',
    plainToOg: 'Обычный текст → Open Graph',
    plainToSsml: 'Обычный текст → SSML разметка',
    smartTypography: 'Умная типографика',
    plainToJsonYaml: 'Обычный текст → JSON/YAML',
    praiseEbtyMolodec: 'Text → Еб*ть ты молодец!',
    transformationCategories: 'Тип трансформации',
    markdownToPlainDesc: '**Что делает:** убирает символы разметки Markdown (#, *, `) и преобразует списки, заголовки и ссылки в читабельный текст.\n**Зачем нужно:** идеально подходит для очистки нейронно-сгенерированного текста (например, ChatGPT и других моделей ИИ) и публикации на платформах, не поддерживающих Markdown (SMS-рассылки, мессенджеры, баннеры).',
    markdownToTelegramDesc: 'Что делает: конвертирует стандартный Markdown в Markdown V2 для Telegram, экранирует все спецсимволы и форматирование для безопасного использования в ботах и сообщениях Telegram.\nЗачем нужно: гарантирует корректное отображение форматированного текста в Telegram, избегая ошибок форматирования и отклонения сообщений.',
    plainToHtmlEmailDesc: 'Что делает: превращает обычный текст в семантические теги <h1>…</h1>, <p>…</p>, <ul>…</ul>, добавляет inline-CSS для стиллизации.\nЗачем нужно: гарантированная кросс-почтовая вёрстка, гибкая адаптация под любой email-клиент.',
    plainToOgDesc: 'Что делает: комплект метатегов <meta property="og:title"/>, <meta property="og:description"/>, <meta property="og:image"/> и вёрстку для Twitter Card.\nЗачем нужно: при шаринге в Facebook, LinkedIn, Twitter автоматически генерируется красивая карточка с изображением и описанием.',
    plainToSsmlDesc: 'Что делает: оборачивает текст в теги <speak>, <break time="500ms"/>, <emphasis level="strong"/>, etc., для добавления интонации, пауз и эмоции.\nЗачем нужно: синтез голоса высокого качества для Alexa Skills, Google Assistant и аудиореклама.',
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
    // Commit Message Linter
    commitTypeFeat: 'Новая функция',
    commitTypeFix: 'Исправление ошибки',
    commitTypeDocs: 'Только документация',
    commitTypeStyle: 'Изменения стиля кода',
    commitTypeRefactor: 'Рефакторинг кода',
    commitTypePerf: 'Улучшение производительности',
    commitTypeTest: 'Добавление тестов',
    commitTypeBuild: 'Изменения сборки',
    commitTypeCi: 'Изменения CI конфигурации',
    commitTypeChore: 'Прочие изменения',
    lintErrorMissingType: 'Отсутствует тип коммита',
    lintFixAddValidType: 'Добавьте валидный тип коммита',
    lintErrorInvalidType: 'Неверный тип коммита',
    lintFixUseValidType: 'Используйте валидный тип коммита',
    lintErrorMissingSubject: 'Отсутствует описание коммита',
    lintFixAddSubject: 'Добавьте описание коммита',
    lintErrorCapitalSubject: 'Описание не должно начинаться с заглавной буквы',
    lintFixLowercaseSubject: 'Сделайте описание строчными буквами',
    lintErrorSubjectPeriod: 'Описание не должно заканчиваться точкой',
    lintFixRemovePeriod: 'Уберите точку в конце',
    lintErrorInvalidFormat: 'Неверный формат заголовка коммита',
    lintFixUseFormat: 'Используйте формат: type(scope): subject',
    lintErrorParsingFailed: 'Не удалось разобрать коммит',
    commitMessageLinter: 'Линтер сообщений коммитов',
    commitMessageLinterDescription: 'Проверяет и форматирует сообщения коммитов по конвенции',
    commitType: 'Тип коммита',
    selectCommitType: 'Выберите тип коммита',
    insertExample: 'Вставить пример',
    commitMessage: 'Сообщение коммита',
    commitMessagePlaceholder: 'Введите сообщение коммита...',
    commitFormatGuide: 'Руководство по формату коммита',
    commitFormatGuideDescription: 'Формат: type(scope): subject',
    validation: 'Валидация',
    parsedOutput: 'Распаршено',
    tooltipParsedOutput: 'Показать разобранную структуру сообщения коммита',
    tooltipType: 'Категория коммита (например feat, fix, docs)',
    tooltipScope: 'Необов\'язкова область изменения (например имя компонента)',
    tooltipSubject: 'Краткое описание изменения',
    tooltipBody: 'Подробное описание (необов\'язково)',
    tooltipFooter: 'Заметки в футере (например ссылки на issue, ID задачи)',
    tooltipBreaking: 'Существенные изменения, отмеченные ! или BREAKING-CHANGE',
    tooltipReferences: 'Ссылки на issue или pull request',
    tooltipMentions: 'Упоминания пользователей (например @username)',
    fix: 'Исправить',
    validCommitMessage: 'Сообщение валидно',
    commitValidationSuccess: 'Ваше сообщение коммита отличное!',
    enterCommitMessage: 'Введите сообщение для проверки',
    type: 'Тип',
    scope: 'Область',
    subject: 'Тема',
    body: 'Тело',
    footer: 'Футер',
    breaking: 'Существенные изменения',
    references: 'Ссылки',
    mentions: 'Упоминания',
    noCommitToParse: 'Нет сообщения для разбора',
    // Timezone Meeting Planner
    timezoneMeetingPlanner: 'Планировщик часового пояса',
    timezoneMeetingPlannerDescription: 'Сравните время встречи в разных часовых поясах',
    meetingTime: 'Время встречи',
    participant: 'Участник',
    date: 'Дата',
    time: 'Время',
    addParticipant: 'Добавить участника',
    participantName: 'Имя участника',
    selectTimezone: 'Выберите часовой пояс',
    add: 'Добавить',
  },
  es: {
    // Header
    searchFunctions: 'Buscar características...',
    // Home
    functionsShowcase: 'Escaparate de Características',
    functionsDescription: 'Una colección de herramientas y características útiles para tareas cotidianas',
    marketplace: 'Marketplace',
    marketplaceDescription: 'Explorar e instalar complementos disponibles',
    noFunctionsFound: 'No se encontraron características',
    noItemsFound: 'No se encontraron complementos',
    modifySearchQuery: 'Intente modificar su consulta de búsqueda',
    // Marketplace
    allCategories: 'Todos',
    telegramCategory: 'Telegram',
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
    copy: 'Copiar',
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
    // UTM Builder Parser
    utmBuilder: 'Constructor UTM',
    utmParser: 'Analizador UTM',
    createUtmLink: 'Crear enlace UTM',
    fillFieldsForUtm: 'Complete los campos para generar una URL con etiquetas UTM',
    baseUrl: 'URL base',
    utmSource: 'UTM Source',
    utmMedium: 'UTM Medium',
    utmCampaign: 'UTM Campaign',
    utmTerm: 'UTM Term (opcional)',
    utmContent: 'UTM Content (opcional)',
    generateLink: 'Generar enlace',
    reset: 'Reiniciar',
    generatedUtmLink: 'Enlace UTM generado',
    parseUtmLink: 'Analizar enlace UTM',
    enterUtmLinkToAnalyze: 'Introduzca una URL con parámetros UTM para analizar',
    urlWithUtmParameters: 'URL con parámetros UTM',
    parseUrl: 'Analizar URL',
    parameter: 'Parámetro',
    value: 'Valor',
    noUtmParametersFound: 'No se encontraron parámetros UTM en la URL',
    invalidUrl: 'URL no válida',
    selectOrEnterSource: 'Seleccione o ingrese fuente',
    selectOrEnterMedium: 'Seleccione o ingrese medio',
    selectOrEnterCampaign: 'Seleccione o ingrese campaña',
    customValue: 'Valor personalizado...',
    // Color Contrast Checker
    colorContrastChecker: 'Verificador de Contraste de Colores',
    colorContrastCheckerDescription: 'Compruebe el contraste y la conformidad con WCAG entre colores de primer plano y de fondo',
    foregroundColor: 'Color de Primer Plano',
    backgroundColor: 'Color de Fondo',
    pickForegroundColor: 'Elegir color de primer plano',
    pickBackgroundColor: 'Elegir color de fondo',
    swapColors: 'Intercambiar Colores',
    contrastRatio: 'Ratio de Contraste',
    wcagRating: 'Clasificación WCAG',
    level: 'Nivel',
    fontSize: 'Tamaño de Fuente',
    minimumRatio: 'Ratio Mínimo',
    result: 'Resultado',
    smallText: 'Texto pequeño (< 18pt)',
    largeText: 'Texto grande (≥ 18pt)',
    suggestion: 'Sugerencia',
    increaseBrightness: 'Intente aumentar el brillo en +{value}%',
    decreaseBrightness: 'Intente disminuir el brillo en -{value}%',
    invalidColors: 'Valores de color inválidos',
    copyResults: 'Copiar Resultados',
    // Markdown Slides
    markdownSlides: 'Markdown → Diapositivas',
    markdownSlidesDescription: 'Cree diapositivas de presentación a partir de texto Markdown con separadores de diapositivas',
    markdownContent: 'Contenido Markdown',
    markdownPlaceholder: 'Ingrese su Markdown aquí. Use --- para separar diapositivas...',
    markdownInstruction: 'Separe las diapositivas con --- en una nueva línea. Use formato Markdown estándar.',
    error: 'Error',
    generateSlides: 'Generar Diapositivas',
    generating: 'Generando...',
    slidesReady: '¡Tus diapositivas están listas!',
    copyLink: 'Copiar Enlace',
    openPresentation: 'Abrir Presentación',
    markdownEmpty: 'El contenido de Markdown no puede estar vacío',
    markdownNoSeparator: 'No se encontraron separadores de diapositivas. Use --- para dividir el contenido en diapositivas.',
    // TextPure Categories
    markdownToPlain: 'Markdown → Texto Plano',
    markdownToTelegram: 'Markdown → Texto para Telegram',
    plainToHtmlEmail: 'Texto Plano → Plantilla HTML Email',
    plainToOg: 'Texto Plano → Open Graph',
    plainToSsml: 'Texto Plano → Marcado SSML',
    smartTypography: 'Tipografía Inteligente',
    plainToJsonYaml: 'Texto Plano → JSON/YAML',
    praiseEbtyMolodec: 'Text → Joder, ¡eres un crack!!',
    transformationCategories: 'Tipo de Transformación',
    markdownToPlainDesc: '**Qué hace:** elimina caracteres de formato Markdown (#, *, `) y convierte listas, encabezados y enlaces en texto legible.\n**Por qué es necesario:** ideal para limpiar texto generado por redes neuronales (por ejemplo, ChatGPT y otros modelos de IA) y publicar en plataformas que no soportan Markdown (SMS, mensajería, banners).',
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
    // Commit Message Linter
    commitTypeFeat: 'Nueva función',
    commitTypeFix: 'Corrección de error',
    commitTypeDocs: 'Cambios solo en documentación',
    commitTypeStyle: 'Cambios de estilo de código',
    commitTypeRefactor: 'Refactorización de código',
    commitTypePerf: 'Mejoras de rendimiento',
    commitTypeTest: 'Agregar pruebas',
    commitTypeBuild: 'Cambios en sistema de compilación',
    commitTypeCi: 'Cambios en CI',
    commitTypeChore: 'Tareas',
    lintErrorMissingType: 'Falta el tipo de commit',
    lintFixAddValidType: 'Agrega un tipo de commit válido',
    lintErrorInvalidType: 'Tipo de commit inválido',
    lintFixUseValidType: 'Usa un tipo de commit válido',
    lintErrorMissingSubject: 'Falta el asunto del commit',
    lintFixAddSubject: 'Agrega un asunto al commit',
    lintErrorCapitalSubject: 'El asunto no debe comenzar con mayúscula',
    lintFixLowercaseSubject: 'Haz el asunto en minúsculas',
    lintErrorSubjectPeriod: 'El asunto no debe terminar con punto',
    lintFixRemovePeriod: 'Quita el punto final',
    lintErrorInvalidFormat: 'Formato de encabezado inválido',
    lintFixUseFormat: 'Usa formato: type(scope): subject',
    lintErrorParsingFailed: 'Error al analizar el commit',
    commitMessageLinter: 'Validador de mensajes de commit',
    commitMessageLinterDescription: 'Valida y formatea mensajes de commit',
    commitType: 'Tipo de commit',
    selectCommitType: 'Selecciona tipo de commit',
    insertExample: 'Insertar ejemplo',
    commitMessage: 'Mensaje de commit',
    commitMessagePlaceholder: 'Ingresa tu mensaje de commit...',
    commitFormatGuide: 'Guía de formato de commit',
    commitFormatGuideDescription: 'Formato: type(scope): subject',
    validation: 'Validación',
    parsedOutput: 'Salida analizada',
    tooltipParsedOutput: 'Mostrar la estructura analizada de tu mensaje de commit',
    tooltipType: 'Categoría de commit (por ejemplo feat, fix, docs)',
    tooltipScope: 'Ámbito opcional del cambio (por ejemplo nombre de componente)',
    tooltipSubject: 'Resumen breve del cambio',
    tooltipBody: 'Descripción detallada (opcional)',
    tooltipFooter: 'Notas de pie de página (por ejemplo enlaces a issues, ID de tarea)',
    tooltipBreaking: 'Cambios importantes indicados por ! o BREAKING-CHANGE',
    tooltipReferences: 'Referencias a issues o pull requests',
    tooltipMentions: 'Menciones de usuarios (por ejemplo @username)',
    fix: 'Corregir',
    validCommitMessage: 'Mensaje válido',
    commitValidationSuccess: '¡Tu mensaje de commit es genial!',
    enterCommitMessage: 'Ingresa un mensaje para validar',
    type: 'Tipo',
    scope: 'Ámbito',
    subject: 'Asunto',
    body: 'Cuerpo',
    footer: 'Pie de página',
    breaking: 'Cambios importantes',
    references: 'Referencias',
    mentions: 'Menciones',
    noCommitToParse: 'No hay mensaje para analizar',
    // Timezone Meeting Planner
    timezoneMeetingPlanner: 'Planificador de zonas horarias',
    timezoneMeetingPlannerDescription: 'Compara horas de reunión en diferentes zonas horarias',
    meetingTime: 'Hora de reunión',
    participant: 'Participante',
    date: 'Fecha',
    time: 'Hora',
    addParticipant: 'Agregar participante',
    participantName: 'Nombre de participante',
    selectTimezone: 'Selecciona zona horaria',
    add: 'Agregar',
  },
}; 