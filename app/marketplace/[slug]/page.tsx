"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { marketplaceItems } from "@/lib/marketplace-types";
import { AuctionOption } from "@/lib/database-types";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "@/components/ReactMarkdown";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  DollarSign,
  Mail,
  Timer,
  Users,
  User,
  Clock,
  TrendingUp,
  Star,
  Eye,
} from "lucide-react";
import { getFakeBidData, maskEmail } from "@/lib/utils/fake-bids";
import { Badge } from "@/components/ui/badge";
import { Language } from "@/lib/i18n/translations";
import { Icons } from "@/components/icons";

// Detailed descriptions for each marketplace item in different languages
const detailedDescriptions: Record<string, Record<Language, string>> = {
  "case-404": {
    en: `**What the AI does:** Posts evidence (photos, chat dialogues, audio) and suspects\n
**Users:** Vote on who to interrogate / what to check\n
**Unique feature:** Inside the bot are personal "cases" of participants: those who guess correctly get points, ranks "Detective of the day"\n
**Revenue:** Paid "expert hints" from AI\n`,
    uk: `**Що робить ШІ:** Публікує докази (фото, діалоги-чат, аудіо) та підозрюваних\n
**Користувачі:** Голосують, кого допитати / що перевірити\n
**Особливість:** Всередині бота особисті «справи» учасників: хто вгадав — отримує очки, ранги «Детектив дня»\n
**Дохід:** Платні «експертні підказки» від ШІ\n`,
    ru: `**Что делает ИИ:** Постит улики (фото, диалоги-чат, аудио) и подозреваемых\n
**Пользователи:** Голосуют, кого допросить / что проверить\n
**Изюминка:** Внутри бота личные «дела» участников: кто угадал — получает очки, ранги «Сыщик дня»\n
**Доход:** Платные «экспертные подсказки» от ИИ\n`,
    es: `**Qué hace la IA:** Publica evidencias (fotos, diálogos de chat, audio) y sospechosos\n
**Usuarios:** Votan a quién interrogar / qué verificar\n
**Característica única:** Dentro del bot hay "casos" personales de los participantes: quienes adivinan correctamente obtienen puntos, rangos "Detective del día"\n
**Ingresos:** "Pistas expertas" pagas de la IA\n`
  },
  "exchange-2077": {
    en: `**What the AI does:** Models a virtual market for tokens of future companies. Posts news daily; through 😊😐😱 reactions, players "buy" or "sell".\n
**Users:** Trade virtual assets and participate in weekly rankings\n
**Unique feature:** Bot maintains portfolios and weekly rankings\n
**Revenue:** Paid analytics and NFT achievements`,
    
    uk: `**Що робить ШІ:** Моделює віртуальний ринок токенів компаній з майбутнього. Раз на день публікує новини; через реакції 😊😐😱 гравці "купують" або "продають".\n
**Користувачі:** Торгують віртуальними активами та беруть участь у щотижневих рейтингах\n
**Особливість:** Бот веде портфелі та щотижневі рейтинги\n
**Дохід:** Платна аналітика та NFT-досягнення`,
    
    ru: `**Что делает ИИ:** Моделирует виртуальный рынок токенов компаний из будущего. Раз в день постит новости; через реакции 😊😐😱 игроки "покупают" или "продают".\n
**Пользователи:** Торгуют виртуальными активами и участвуют в еженедельных рейтингах\n
**Изюминка:** Бот ведёт портфели и weekly-rank\n
**Доход:** Платная аналитика и NFT-ачивки`,
    
    es: `**Qué hace la IA:** Modela un mercado virtual de tokens de empresas del futuro. Publica noticias diariamente; a través de reacciones 😊😐😱, los jugadores "compran" o "venden".\n
**Usuarios:** Comercian con activos virtuales y participan en rankings semanales\n
**Característica única:** El bot mantiene carteras y rankings semanales\n
**Ingresos:** Análisis pagos y logros NFT`
  },
  "meme-forge": {
    en: `**What the AI does:** Publishes meme templates (image + empty caption). Subscribers vote for the punchline.\n
**Users:** Vote on captions and participate in author battles\n
**Unique feature:** The winning text is embedded by AI to produce the final meme post. Weekly "author battles" with donations to the prize fund.\n
**Revenue:** Donations to prize funds for competitions`,
    
    uk: `**Що робить ШІ:** Публікує каркаси мемів (зображення + порожній підпис). Підписники голосують за найкращу фразу.\n
**Користувачі:** Голосують за підписи та беруть участь у батлах авторів\n
**Особливість:** Текст-переможець ШІ вбудовує та випускає фінальний мем-пост. Щотижневі "батли авторів" з донатами у призовий фонд.\n
**Дохід:** Донати у призові фонди для змагань`,
    
    ru: `**Что делает ИИ:** Публикует каркас мема (изображение + пустая подпись). Подписчики голосуют за punchline.\n
**Пользователи:** Голосуют за подписи и участвуют в баттлах авторов\n
**Изюминка:** Победивший текст ИИ встраивает и выпускает финальный мем-пост. Еженедельные "баттлы авторов" с донатами в призовой фонд.\n
**Доход:** Донаты в призовые фонды для соревнований`,
    
    es: `**Qué hace la IA:** Publica plantillas de memes (imagen + leyenda vacía). Los suscriptores votan por el remate.\n
**Usuarios:** Votan por las leyendas y participan en batallas de autores\n
**Característica única:** El texto ganador es incorporado por la IA para producir el meme final. Batallas semanales de autores con donaciones al fondo de premios.\n
**Ingresos:** Donaciones a fondos de premios para competiciones`
  },
  "pet-tamago": {
    en: `**What the AI does:** Describes the pet's mood, offers 3 actions (feed, play, train).\n
**Users:** Make decisions about the pet's care, which affects its evolution\n
**Unique feature:** Chat decides the actions, and the pet evolves accordingly. Reactions highlight "caring" participants.\n
**Revenue:** Unique pet stickers for sale`,
    
    uk: `**Що робить ШІ:** Описує настрій звірятка, дає 3 дії (годувати, грати, тренувати).\n
**Користувачі:** Приймають рішення щодо догляду за вихованцем, що впливає на його еволюцію\n
**Особливість:** Чат вирішує дії, і вихованець відповідно еволюціонує. Реакції виділяють "дбайливих" учасників.\n
**Дохід:** Унікальні стікери вихованця на продаж`,
    
    ru: `**Что делает ИИ:** Описывает настроение зверька, даёт 3 действия (кормить, играть, тренировать).\n
**Пользователи:** Принимают решения по уходу за питомцем, что влияет на его эволюцию\n
**Изюминка:** Чат решает действия, и питомец эволюционирует соответственно. Реакции выделяют "заботливых" участников.\n
**Доход:** Уникальные стикеры питомца на продажу`,
    
    es: `**Qué hace la IA:** Describe el estado de ánimo de la mascota, ofrece 3 acciones (alimentar, jugar, entrenar).\n
**Usuarios:** Toman decisiones sobre el cuidado de la mascota, lo que afecta su evolución\n
**Característica única:** El chat decide las acciones, y la mascota evoluciona en consecuencia. Las reacciones destacan a los participantes "cuidadosos".\n
**Ingresos:** Stickers únicos de la mascota a la venta`
  },
  "alternative-history-newspaper": {
    en: `**What the AI does:** Every morning publishes "news" from a world where, for example, Russia has broken up into small states.\n
**Users:** Participate in polls to choose further political steps\n
**Unique feature:** Once a month, the bot compiles a PDF newspaper. Donation goals unlock an AR filter with the coat of arms of the alternative state.\n
**Revenue:** Donations for special AR filters`,
    
    uk: `**Що робить ШІ:** Щоранку публікує "новини" зі світу, де, наприклад, росія розпалася на дрібні держави.\n
**Користувачі:** Беруть участь в опитуваннях для вибору подальших політичних кроків\n
**Особливість:** Раз на місяць бот збирає PDF-газету. Цілі донатів відкривають AR-фільтр з гербом альтернативної держави.\n
**Дохід:** Донати за спеціальні AR-фільтри`,
    
    ru: `**Что делает ИИ:** Каждое утро публикует "новость" мира, где, скажем, россия распалась на мелкие государства.\n
**Пользователи:** Участвуют в опросах для выбора дальнейших политических шагов\n
**Изюминка:** Раз в месяц бот собирает PDF-газету. Donate-goal открывает AR-фильтр с гербом альтернативного государства.\n
**Доход:** Донаты за специальные AR-фильтры`,
    
    es: `**Qué hace la IA:** Cada mañana publica "noticias" de un mundo donde, por ejemplo, Rusia se ha fragmentado en pequeños estados.\n
**Usuarios:** Participan en encuestas para elegir futuros pasos políticos\n
**Característica única:** Una vez al mes, el bot compila un periódico en PDF. Los objetivos de donación desbloquean un filtro AR con el escudo de armas del estado alternativo.\n
**Ingresos:** Donaciones para filtros AR especiales`
  },
  "flash-drop-club": {
    en: `**Trigger:** FOMO + scarcity (24-hour timers).\n
**Mechanics:** AI publishes 3 teasers of rare digital or physical "drops"; voting determines which one will be fully revealed. The winning drop is available for exactly 2 hours.\n
**Revenue:** Revenue share from sales, affiliate links.`,
    
    uk: `**Тригер:** FOMO + дефіцит (24-годинні таймери).\n
**Механіка:** ШІ публікує 3 тизери рідкісних цифрових або фізичних "дропів"; голосування визначає, який відкриється повністю. Переможний дроп доступний рівно 2 години.\n
**Дохід:** Частка доходу з продажів, партнерські посилання.`,
    
    ru: `**Триггер:** FOMO + дефицит (24-часовые таймеры).\n
**Механика:** ИИ публикует 3 тизера редких цифровых или физических "дропов"; голосование определяет, какой откроется полностью. Победный дроп доступен ровно 2 часа.\n
**Доход:** Рев-доля с продаж, партнёрские ссылки.`,
    
    es: `**Disparador:** FOMO + escasez (temporizadores de 24 horas).\n
**Mecánica:** La IA publica 3 avances de "lanzamientos" digitales o físicos raros; la votación determina cuál se revelará por completo. El lanzamiento ganador está disponible por exactamente 2 horas.\n
**Ingresos:** Participación en los ingresos de ventas, enlaces de afiliados.`
  },
  "mind-maze-live": {
    en: `**Trigger:** Variable reward + gamification.\n
**Mechanics:** Every 6 hours the bot posts a "room" with 3 puzzles; a poll decides which item to investigate. The right choice opens the next room and rare achievements.\n
**Revenue:** "Skip-puzzle" passes, merchandise with "Labyrinth" symbolism.`,
    
    uk: `**Тригер:** Змінна винагорода + гейміфікація.\n
**Механіка:** Кожні 6 годин бот викладає "кімнату" з 3 загадками; опитування вирішує, який предмет досліджувати. Правильний вибір відкриває наступну кімнату та рідкісні досягнення.\n
**Дохід:** Пропуск "скіп-пазла", мерч із символікою "Лабіринту".`,
    
    ru: `**Триггер:** Переменное вознаграждение + геймификация.\n
**Механика:** Каждые 6 часов бот выкладывает "комнату" с 3 загадками; опрос решает, какой предмет исследовать. Правильный выбор открывает следующую комнату и редкие достижения.\n
**Доход:** Пропуск "скип-пазла", мерч с символикой "Лабиринта".`,
    
    es: `**Disparador:** Recompensa variable + gamificación.\n
**Mecánica:** Cada 6 horas el bot publica una "habitación" con 3 acertijos; una encuesta decide qué objeto investigar. La elección correcta abre la siguiente habitación y logros raros.\n
**Ingresos:** Pases para "saltar acertijos", mercancía con simbolismo del "Laberinto".`
  },
  "confession-cloud": {
    en: `**Trigger:** Curiosity + social proof "like me".\n
**Mechanics:** AI aggregates submitted anonymous confessions, erases details, and publishes 3 story starters. Voting chooses which story to reveal in full.\n
**Revenue:** Sponsored sections from self-care brands.`,
    
    uk: `**Тригер:** Цікавість + соціальний доказ "як я".\n
**Механіка:** ШІ агрегує надіслані анонімні зізнання, стирає деталі та публікує 3 сюжети-затравки. Голосування обирає, яку історію розкрити повністю.\n
**Дохід:** Спонсорські рубрики брендів self-care.`,
    
    ru: `**Триггер:** Любопытство + социальное доказательство "как я".\n
**Механика:** ИИ агрегирует присланные анонимные признания, стирает детали и публикует 3 сюжета-затравки. Голосование выбирает, какую историю раскрыть полностью.\n
**Доход:** Спонсорские рубрики брендов self-care.`,
    
    es: `**Disparador:** Curiosidad + prueba social "como yo".\n
**Mecánica:** La IA agrega confesiones anónimas enviadas, borra detalles y publica 3 inicios de historias. La votación elige qué historia revelar por completo.\n
**Ingresos:** Secciones patrocinadas de marcas de autocuidado.`
  },
  "trend-forecaster": {
    en: `**Trigger:** Competition + "oracle effect" (I knew it!).\n
**Mechanics:** The bot parses social media, suggests 3 emerging trends; users vote on which will "take off". After a week, AI publishes metrics and a "prophets" ranking.\n
**Revenue:** Paid channel with in-depth analytics.`,
    
    uk: `**Тригер:** Змагання + "ефект оракула" (я знав!).\n
**Механіка:** Бот парсить соцмережі, пропонує 3 зароджуваних тренди; користувачі голосують, який "вистрілить". Через тиждень ШІ публікує метрики та рейтинг "пророків".\n
**Дохід:** Платний канал з поглибленою аналітикою.`,
    
    ru: `**Триггер:** Соревнование + "эффект оракула" (я знал!).\n
**Механика:** Бот парсит соцсети, предлагает 3 зарождающихся тренда; пользователи голосуют, какой "выстрелит". Через неделю ИИ публикует метрики и рейтинг "пророков".\n
**Доход:** Платный канал с углублённой аналитикой.`,
    
    es: `**Disparador:** Competición + "efecto oráculo" (¡lo sabía!).\n
**Mecánica:** El bot analiza redes sociales, sugiere 3 tendencias emergentes; los usuarios votan cuál "despegará". Después de una semana, la IA publica métricas y un ranking de "profetas".\n
**Ingresos:** Canal de pago con análisis en profundidad.`
  },
  "micro-master-mba": {
    en: `**Trigger:** Need for competence + microlearning.\n
**Mechanics:** Every day AI gives a 100-word case situation; voting decides the strategy. The winning option unfolds the next day.\n
**Revenue:** Certificates, B2B content licensing.`,
    
    uk: `**Тригер:** Потреба в компетентності + мікронавчання.\n
**Механіка:** Щодня ШІ дає 100-слівну кейс-ситуацію; голосування вирішує стратегію. Переможний варіант розгортається наступного дня.\n
**Дохід:** Сертифікати, B2B-ліцензування контенту.`,
    
    ru: `**Триггер:** Потребность в компетентности + микрообучение.\n
**Механика:** Каждый день ИИ даёт 100-сл. кейс-ситуацию; голосование решает стратегию. Победный вариант разворачивается на следующий день.\n
**Доход:** Сертификаты, B2B-лицензия контента.`,
    
    es: `**Disparador:** Necesidad de competencia + microaprendizaje.\n
**Mecánica:** Cada día la IA presenta un caso de 100 palabras; la votación decide la estrategia. La opción ganadora se desarrolla al día siguiente.\n
**Ingresos:** Certificados, licencia de contenido B2B.`
  },
  "influence-incubator": {
    en: `**Trigger:** Social identity + participation effect.\n
**Mechanics:** A brand partner brings a task (new drink flavor). AI generates 3 positioning options; the audience votes, tests, and shares feedback.\n
**Revenue:** B2B fee for campaign, revenue share from sales.`,
    
    uk: `**Тригер:** Соціальна ідентичність + ефект участі.\n
**Механіка:** Бренд-партнер приносить завдання (новий смак напою). ШІ генерує 3 варіанти позиціонування; аудиторія голосує, тестує та ділиться відгуками.\n
**Дохід:** B2B-плата за кампанію, частка доходу з продажів.`,
    
    ru: `**Триггер:** Социальная идентичность + эффект участия.\n
**Механика:** Бренд-партнёр приносит задачу (новый вкус напитка). AI генерирует 3 варианта позиционирования; аудитория голосует, тестирует и делится фидбеком.\n
**Доход:** B2B-fee за кампанию, рев-доля с продаж.`,
    
    es: `**Disparador:** Identidad social + efecto de participación.\n
**Mecánica:** Un socio de marca trae una tarea (nuevo sabor de bebida). La IA genera 3 opciones de posicionamiento; la audiencia vota, prueba y comparte comentarios.\n
**Ingresos:** Tarifa B2B por campaña, participación en ingresos de ventas.`
  },
  "nostalgia-rewind": {
    en: `**Trigger:** Nostalgia enhances positive affect and reposts.\n
**Mechanics:** AI publishes a sketch frame in the style of 90s, 00s, and 10s; a poll chooses the era. The winning era is revealed in short-video format with VHS/HD filter and retro sound.\n
**Revenue:** Sales of sticker packs and NFT frames.`,
    
    uk: `**Тригер:** Ностальгія посилює позитивний афект і репости.\n
**Механіка:** ШІ публікує кадр-ескіз у стилі 90-х, 00-х і 10-х; опитування обирає епоху. Переможна епоха розкривається у форматі короткого відео з VHS/HD фільтром та ретро-звуком.\n
**Дохід:** Продажі стікерпаків і NFT-кадрів.`,
    
    ru: `**Триггер:** Ностальгия усиливает позитивный аффект и репосты.\n
**Механика:** ИИ публикует кадр-эскиз в стиле 90-х, 00-х и 10-х; опрос выбирает эпоху. Победная эпоха раскрывается в формате короткого видео с VHS/HD фильтром и ретро-звуком.\n
**Доход:** Продажи стикерпаков и NFT-кадров.`,
    
    es: `**Disparador:** La nostalgia aumenta el afecto positivo y los reenvíos.\n
**Mecánica:** La IA publica un boceto al estilo de los 90, 00 y 10; una encuesta elige la época. La era ganadora se revela en formato de video corto con filtro VHS/HD y sonido retro.\n
**Ingresos:** Ventas de paquetes de stickers y marcos NFT.`
  }
};

// Append the testing and scaling section to all language descriptions
const scalingSections: Record<Language, string> = {
  en: `
### How to Test and Scale

1. Lean-MVP with 500 participants → check for poll CTR ≥ 35%.
2. A/B headline cycles (2-3 per day) — Telegram allows changing post text without resetting statistics.
3. Automation: \`aiogram\` + Redis cache for GPT-4o requests, scheduler \`APScheduler\` or GitHub-Actions cron.
4. Metrics: 7-day retention, reaction-to-view ratio, ARPPU of paid tier.
5. Growth: cross-promotion with niche channels (pre-ads cost 4-6$ CPM when targeting UA audience).`,
  ru: `
### Как протестировать и масштабировать

1. Lean-MVP на 500 участников → проверяем CTR опросов ≥ 35%.
2. A/B-циклы заголовков (2–3 в сутки) — Telegram позволяет менять текст поста без сброса статистики.
3. Автоматизация: \`aiogram\` + Redis-кэш для запросов к GPT-4o, планировщик \`APScheduler\` или GitHub-Actions cron.
4. Метрики: удержание 7-го дня, доля реакций к просмотрам, ARPPU платного слоя.
5. Рост: кросс-промо с тематическими каналами (до-реклама стоит 4-6$ CPM при таргете на UA-аудиторию).`,
  uk: `
### Як протестувати та масштабувати

1. Lean-MVP на 500 учасників → перевіряємо CTR опитувань ≥ 35%.
2. A/B-цикли заголовків (2–3 на добу) — Telegram дозволяє змінювати текст поста без скидання статистики.
3. Автоматизація: \`aiogram\` + Redis-кеш для запитів до GPT-4o, планувальник \`APScheduler\` або GitHub-Actions cron.
4. Метрики: утримання 7-го дня, частка реакцій до переглядів, ARPPU платного шару.
5. Зростання: крос-промо з тематичними каналами (до-реклама коштує 4-6$ CPM при таргеті на UA-аудиторію).`,
  es: `
### Cómo probar y escalar

1. Lean-MVP con 500 participantes → verificar CTR de encuestas ≥ 35%.
2. Ciclos A/B de titulares (2-3 por día) — Telegram permite cambiar el texto del post sin reiniciar estadísticas.
3. Automatización: \`aiogram\` + caché Redis para solicitudes a GPT-4o, programador \`APScheduler\` o cron de GitHub-Actions.
4. Métricas: retención del día 7, proporción de reacciones a visualizaciones, ARPPU del nivel de pago.
5. Crecimiento: promoción cruzada con canales temáticos (pre-anuncios cuestan 4-6$ CPM al dirigirse a audiencia UA).`,
};

Object.keys(detailedDescriptions).forEach(slug => {
  Object.entries(scalingSections).forEach(([lang, section]) => {
    const header = section.trim().split("\n")[0];
    if (!detailedDescriptions[slug][lang as Language].includes(header)) {
      detailedDescriptions[slug][lang as Language] += section;
    }
  });
});

// Add translations for features
const featureTranslations = {
  en: {
    aiPowered: {
      title: "AI-Powered Automation",
      description: "Fully automated content generation and user interaction management"
    },
    communityEngagement: {
      title: "Community Engagement",
      description: "Interactive voting system with gamification elements"
    },
    monetizationReady: {
      title: "Monetization Ready",
      description: "Multiple revenue streams built into the core mechanics"
    }
  },
  uk: {
    aiPowered: {
      title: "Автоматизація на базі ШІ",
      description: "Повністю автоматизоване створення контенту та керування взаємодією з користувачами"
    },
    communityEngagement: {
      title: "Залучення спільноти",
      description: "Інтерактивна система голосування з елементами гейміфікації"
    },
    monetizationReady: {
      title: "Готовність до монетизації",
      description: "Кілька потоків доходу, вбудованих в основну механіку"
    }
  },
  ru: {
    aiPowered: {
      title: "Автоматизация на базе ИИ",
      description: "Полностью автоматизированное создание контента и управление взаимодействием с пользователями"
    },
    communityEngagement: {
      title: "Вовлечение сообщества",
      description: "Интерактивная система голосования с элементами геймификации"
    },
    monetizationReady: {
      title: "Готовность к монетизации",
      description: "Несколько потоков дохода, встроенных в основную механику"
    }
  },
  es: {
    aiPowered: {
      title: "Automatización con IA",
      description: "Generación de contenido y gestión de interacción con usuarios totalmente automatizada"
    },
    communityEngagement: {
      title: "Participación comunitaria",
      description: "Sistema interactivo de votación con elementos de gamificación"
    },
    monetizationReady: {
      title: "Listo para monetizar",
      description: "Múltiples fuentes de ingresos integradas en las mecánicas principales"
    }
  }
};

export default function MarketplaceItemPage() {
  const router = useRouter();
  const params = useParams();
  const { currentLanguage, t } = useLanguage();
  const { toast } = useToast();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [auction, setAuction] = useState<AuctionOption | null>(null);
  const [email, setEmail] = useState("");
  const [bidAmount, setBidAmount] = useState<string>("");
  const [suggestedBid, setSuggestedBid] = useState<number>(0);
  const [bidSuggestions, setBidSuggestions] = useState<number[]>([]);
  const [bidLoading, setBidLoading] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>("");
  const [isAuctionActive, setIsAuctionActive] = useState<boolean>(true);

  useEffect(() => {
    // Find the item by slug
    const foundItem = marketplaceItems.find(
      (item) => item.slug === params.slug
    );
    
    if (foundItem) {
      setItem(foundItem);
      
      // Increment view count when item detail page is viewed
      const incrementViews = async () => {
        try {
          await fetch('/api/likes', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ itemId: foundItem.id }),
          });
        } catch (error) {
          console.error('Error incrementing views:', error);
        }
      };
      
      incrementViews();
      
      // Fetch auction data
      fetchAuctionData(foundItem.id);
      
      // Set up periodic refresh of auction data
      const refreshInterval = setInterval(() => {
        console.log('Refreshing auction data...');
        fetchAuctionData(foundItem.id);
      }, 30000); // Refresh every 30 seconds
      
      return () => {
        clearInterval(refreshInterval);
      };
    }
    
    setLoading(false);
  }, [params.slug]);

  const fetchAuctionData = async (itemId: string | string[]) => {
    try {
      // Ensure itemId is a string
      const id = Array.isArray(itemId) ? itemId[0] : itemId;
      console.log(`Fetching auction data for item: ${id}`);
      
      const response = await fetch(`/api/bids?itemId=${id}`, {
        // Add cache: 'no-store' to prevent caching
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Received auction data:', data);
        
        // API now handles the combination of real and fake bids
        // We don't need to modify data here, just use it as is
        setAuction(data);
      } else {
        console.error('Failed to fetch auction data:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching auction data:', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const getRemainingTime = (endDate: Date) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) {
      setIsAuctionActive(false);
      return t('auctionEnded');
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days} ${t('days')}, ${hours} ${t('hours')}, ${minutes} ${t('minutes')}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    if (auction) {
      // Check if auction is active
      const now = new Date();
      const end = new Date(auction.endDate);
      setIsAuctionActive(now < end);
      
      // Apply 25% discount to all prices
      const applyDiscount = (price: number) => Math.round(price * 0.75);

      // Calculate suggested bids with 25% discount
      const minAmount = applyDiscount(auction.currentHighestBid || auction.minBid);
      setSuggestedBid(minAmount + 100);
      
      // Generate 3 bid suggestions with 25% discount
      setBidSuggestions([
        minAmount + 100,
        minAmount + 250,
        minAmount + 500
      ]);
    }
  }, [auction]);

  const handleBidSubmit = async () => {
    const amount = Number(bidAmount);
    setValidationError("");
    
    // Validate inputs
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setValidationError(t('invalidEmail'));
      return;
    }
    
    if (!amount || isNaN(amount)) {
      setValidationError(t('invalidAmount'));
      return;
    }
    
    if (auction) {
      // Apply the 25% discount to current highest bid for validation
      const minAmount = Math.round((auction.currentHighestBid || auction.minBid) * 0.75);
      if (amount <= minAmount) {
        setValidationError(`${t('bidTooLow')} $${minAmount}`);
        return;
      }
    }
    
    setBidLoading(true);
    
    try {
      // Convert back to original price scale before sending to API
      const originalAmount = Math.round(amount / 0.75);
      
      const response = await fetch("/api/bids", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache"
        },
        cache: "no-store",
        body: JSON.stringify({
          itemId: item.id,
          email,
          amount: originalAmount // Use original amount to maintain consistency in database
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setValidationError(data.error || t('bidError'));
        toast({ title: t('bidError') });
      } else {
        // Clear form fields
        setBidAmount("");
        setEmail("");
        
        // Show success message
        toast({ title: t('bidSuccess') });
        
        // Update local auction state to show the new bid immediately
        // This provides instant feedback before the server data arrives
        if (auction) {
          // Always set hasRealBids to true when we place a real bid
          const hasRealBids = true;
          
          // Calculate the new bid count
          // If we already had real bids, just increment the count
          // If this is the first real bid, add it to the fake bid count
          const fakeBidCount = auction.hasRealBids ? 0 : (auction.bidCount || 0);
          const realBidCount = auction.hasRealBids ? ((auction.bidCount || 0) - fakeBidCount) + 1 : 1;
          const newBidCount = fakeBidCount + realBidCount;
          
          console.log(`Updating local auction state: amount=${originalAmount}, bidder=${maskEmail(email)}, count=${newBidCount}`);
          
          setAuction({
            ...auction,
            currentHighestBid: originalAmount,
            currentHighestBidder: maskEmail(email),
            bidCount: newBidCount,
            hasRealBids: true
          });
        }
        
        // Then fetch the latest data from server after a short delay
        // to ensure database has been updated
        setTimeout(() => {
          console.log('Fetching updated auction data after bid');
          fetchAuctionData(item.id);
        }, 1000); // Increased delay to ensure database update completes
      }
    } catch (error) {
      console.error('Error submitting bid:', error);
      setValidationError(t('bidError'));
      toast({ title: t('bidError') });
    } finally {
      setBidLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-transparent">
        <div className="container max-w-5xl py-12">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            className="mb-8 group hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            {t('back')}
          </Button>
          
          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="max-w-md mx-auto border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Icons.Search className="h-8 w-8 text-slate-400" />
                </div>
                <CardTitle className="text-2xl mb-3 text-slate-900 dark:text-slate-100">
                  {t('itemNotFound')}
                </CardTitle>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t('itemNotFoundDesc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Get localized content if available, otherwise use default
  const title = item.i18n?.[currentLanguage as Language]?.title || item.title;
  const description = item.i18n?.[currentLanguage as Language]?.description || item.description;
  const detailedDescription = detailedDescriptions[item.slug]?.[currentLanguage as Language] || detailedDescriptions[item.slug]?.en;

  return (
    <div className="min-h-screen bg-transparent">
      <div className="container max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            className="group hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 -ml-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            {t('back')}
          </Button>
        </div>

        {/* Hero Section */}
        <div className="mb-12">
          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm bg-transparent overflow-hidden">
            <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 px-8 py-12 lg:px-12 lg:py-16">
              {/* Background Pattern */}
              <div className="relative">
                {/* Tags */}
                <div className="flex items-center flex-wrap gap-2 mb-4">
                  <Badge 
                    variant="secondary" 
                    className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-0 px-3 py-1 text-sm font-medium"
                  >
                    telegram
                  </Badge>
                  {item.tags?.map((tag: string) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-800/50"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Title and Description */}
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4 leading-tight">
                  {title}
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 leading-relaxed max-w-3xl">
                  {description}
                </p>

                {/* Auction Timer */}
                {auction && (
                  <div className="inline-flex items-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200 dark:border-slate-700">
                    <Clock className="mr-2 h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      <span className="font-semibold">{t('timeLeft')}:</span> {getRemainingTime(auction.endDate)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Content Column */}
          <div className="lg:col-span-3 space-y-8">
            {/* Description Card */}
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm bg-transparent overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Icons.FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  Project Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {detailedDescription && (
                  <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:text-slate-900 dark:prose-headings:text-slate-100 prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-strong:text-slate-900 dark:prose-strong:text-slate-100">
                    <ReactMarkdown>{detailedDescription}</ReactMarkdown>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features Highlights */}
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm bg-transparent">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Star className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-start gap-3 p-4 border border-slate-200 dark:border-slate-700 bg-transparent rounded-xl">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mt-0.5">
                      <Icons.Zap className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">{featureTranslations[currentLanguage as Language]?.aiPowered?.title || featureTranslations.en.aiPowered.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{featureTranslations[currentLanguage as Language]?.aiPowered?.description || featureTranslations.en.aiPowered.description}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 border border-slate-200 dark:border-slate-700 bg-transparent rounded-xl">
                    <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mt-0.5">
                      <Users className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">{featureTranslations[currentLanguage as Language]?.communityEngagement?.title || featureTranslations.en.communityEngagement.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{featureTranslations[currentLanguage as Language]?.communityEngagement?.description || featureTranslations.en.communityEngagement.description}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 border border-slate-200 dark:border-slate-700 bg-transparent rounded-xl">
                    <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mt-0.5">
                      <DollarSign className="h-3 w-3 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">{featureTranslations[currentLanguage as Language]?.monetizationReady?.title || featureTranslations.en.monetizationReady.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{featureTranslations[currentLanguage as Language]?.monetizationReady?.description || featureTranslations.en.monetizationReady.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Auction Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <Card className="border border-slate-200 dark:border-slate-700 shadow-sm bg-transparent overflow-hidden">
                {auction && (
                  <>
                    {/* Auction Header */}
                    <div className="bg-transparent px-6 py-5 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center">
                          <Icons.Award className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        {t('auctionDetails')}
                      </h3>
                    </div>
                    
                    {/* Auction Stats */}
                    <div className="p-6 space-y-6">
                      {/* Current Bid - Prominent Display */}
                      <div className="text-center p-6 bg-transparent rounded-2xl border border-slate-200 dark:border-slate-600">
                        <div className="text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide mb-2">
                          {t('currentBid')}
                        </div>
                        <div className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                          {auction.currentHighestBid
                            ? `$${Math.round(auction.currentHighestBid * 0.75).toLocaleString()}`
                            : t('noBids')}
                        </div>
                        {auction.currentHighestBid && (
                          <div className="text-xs text-slate-500 dark:text-slate-400">
                            25% launch discount applied
                          </div>
                        )}
                      </div>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-transparent rounded-xl border border-slate-200 dark:border-slate-700">
                          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                            {t('minimumBid')}
                          </div>
                          <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                            ${Math.round(auction.minBid * 0.75).toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-transparent rounded-xl border border-slate-200 dark:border-slate-700">
                          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                            {t('bids')}
                          </div>
                          <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            {auction.bidCount || 0}
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Additional Info */}
                      {auction.currentHighestBidder && (
                        <div className="p-4 bg-transparent rounded-xl border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                                {t('highestBidder')}
                              </div>
                              <div className="font-medium text-blue-900 dark:text-blue-100">
                                {auction.currentHighestBidder}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-4 bg-transparent rounded-xl border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <div className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                              {t('endDate')}
                            </div>
                            <div className="font-medium text-amber-900 dark:text-amber-100">
                              {formatDate(auction.endDate)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <hr className="border-slate-200 dark:border-slate-700" />
                    
                    {/* Bidding Form */}
                    <div className="p-6 space-y-6">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                          <Icons.CreditCard className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                        {t('placeBid')}
                      </h3>
                      
                      {isAuctionActive ? (
                        <div className="space-y-5">
                          {/* Email Input */}
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {t('emailLabel')}
                            </Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 h-11 bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                              />
                            </div>
                          </div>
                          
                          {/* Bid Amount Input */}
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label htmlFor="amount" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {t('bidAmountLabel')}
                              </Label>
                              {validationError && (
                                <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                                  {validationError}
                                </p>
                              )}
                            </div>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                              <Input
                                id="amount"
                                type="number"
                                placeholder={suggestedBid.toString()}
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                className="pl-10 h-11 bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                              />
                            </div>
                          </div>
                          
                          {/* Quick Bid Buttons */}
                          <div className="space-y-2">
                            <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                              Quick Bids
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                              {bidSuggestions.map((suggestion) => (
                                <Button
                                  key={suggestion}
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setBidAmount(suggestion.toString())}
                                  className="h-9 text-xs font-medium bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                                >
                                  ${suggestion.toLocaleString()}
                                </Button>
                              ))}
                            </div>
                          </div>
                          
                          {/* Submit Button */}
                          <Button
                            className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                            onClick={handleBidSubmit}
                            disabled={bidLoading}
                          >
                            {bidLoading ? (
                              <>
                                <Icons.Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {t('processing')}
                              </>
                            ) : (
                              <>
                                <Icons.Gavel className="mr-2 h-4 w-4" />
                                {t('submitBid')}
                              </>
                            )}
                          </Button>
                          
                          {/* Disclaimer */}
                          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                              {t('bidDisclaimer')} {t('participationNote')}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <Alert className="border border-slate-200 dark:border-slate-700 bg-transparent">
                          <Icons.AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                          <AlertTitle className="text-red-900 dark:text-red-100">
                            {t('auctionEnded')}
                          </AlertTitle>
                          <AlertDescription className="text-red-700 dark:text-red-300">
                            {t('auctionEndedDesc')}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  </>
                )}
                
                {!auction && (
                  <div className="p-12 flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-4">
                      <Icons.Loader2 className="h-8 w-8 animate-spin text-slate-400" />
                      <p className="text-slate-500 dark:text-slate-400">{t('loadingAuction')}</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('projectDetailsNote')}
          </p>
        </div>
      </div>
    </div>
  );
}