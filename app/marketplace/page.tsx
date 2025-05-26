"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { marketplaceItems, marketplaceCategories } from "@/lib/marketplace-types";
import { MarketplaceGrid } from "@/components/marketplace-grid";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Language } from "@/lib/i18n/translations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendIcon } from "lucide-react";

// Type for storing submitted links
interface SubmittedLink {
  id: string;
  url: string;
  timestamp: number;
}

export default function MarketplacePage() {
  const { t, currentLanguage } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") ?? "";
  const query = searchQuery.trim();
  const categoryParam = searchParams.get("category") ?? "all";
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [inspirationLink, setInspirationLink] = useState("");
  const [submittedLinks, setSubmittedLinks] = useState<SubmittedLink[]>([]);
  const [showLinks, setShowLinks] = useState(false);

  // Load submitted links from localStorage on component mount
  useEffect(() => {
    const savedLinks = localStorage.getItem('submittedLinks');
    if (savedLinks) {
      setSubmittedLinks(JSON.parse(savedLinks));
    }
  }, []);

  const getMarketplaceDescription = (): string[] => {
    // Description text for each language
    const descriptions: Record<Language, string[]> = {
      en: [
        "**The concept of marketplace based on key principles:**",
        "- FOMO and scarcity enhance immediate engagement and conversion.",
        "- Gamification increases retention by 22% and stimulates repeated actions.",
        "- UGC and 'social mirror' influence purchase decisions for 79-93% of users.",
        "- Interactive storytelling environment creates deep emotional response.",
        "- Microlearning and 'short bits' of content increase lesson completion.",
        "- Telegram has exceeded 1 billion MAU, with evening prime time best for publishing.",
        "- Telegram games confirm payment capacity ($13M+ monthly).",
        "- Market shift towards 'active content' confirms demand for interactivity."
      ],
      uk: [
        "**Концепція маркетплейсу, заснована на ключових принципах:**",
        "- FOMO і дефіцит посилюють негайне залучення та конверсію.",
        "- Геймифікація підвищує утримання на 22% і стимулює повторні дії.",
        "- UGC і «соціальне дзеркало» впливають на рішення про покупку у 79-93% користувачів.",
        "- Інтерактивне сторітеллінг-оточення формує глибокий емоційний відгук.",
        "- Мікронавчання і «короткі біти» контенту підвищують завершення уроків.",
        "- Telegram перевищив 1 млрд MAU, вечірній прайм — найкращий час для публікацій.",
        "- Ігри в Telegram підтверджують платоспроможність аудиторії ($13 млн+ на місяць).",
        "- Зсув ринку до «активного контенту» підтверджує затребуваність інтерактивності."
      ],
      ru: [
        "**Концепция маркетплейса, основанная на ключевых принципах:**",
        "- FOMO и дефицит усиливают немедленное вовлечение и конверсию.",
        "- Геймификация повышает удержание на 22% и стимулирует повторные действия.",
        "- UGC и «социальное зеркало» влияют на решения о покупке у 79–93% пользователей.",
        "- Интерактивное сторителлинг-окружение формирует глубокий эмоциональный отклик.",
        "- Микрообучение и «короткие биты» контента повышают завершение уроков.",
        "- Telegram превысил 1 млрд MAU, вечерний прайм — лучшее время для публикаций.",
        "- Игры в Telegram подтверждают платёжеспособность аудитории ($13 млн+ в месяц).",
        "- Сдвиг рынка к «активному контенту» подтверждает востребованность интерактивности."
      ],
      es: [
        "**El concepto de marketplace basado en principios clave:**",
        "- FOMO y escasez mejoran la participación inmediata y la conversión.",
        "- La gamificación aumenta la retención en un 22% y estimula acciones repetidas.",
        "- UGC y 'espejo social' influyen en las decisiones de compra para el 79-93% de usuarios.",
        "- Entorno narrativo interactivo crea una respuesta emocional profunda.",
        "- El microaprendizaje y fragmentos de contenido aumentan la finalización de lecciones.",
        "- Telegram superó 1.000 millones de MAU, con mejor publicación en horario vespertino.",
        "- Juegos en Telegram confirman capacidad de pago (más de $13M mensuales).",
        "- El cambio hacia 'contenido activo' confirma la demanda de interactividad."
      ]
    };

    return descriptions[currentLanguage] || descriptions.en;
  };

  const getInspirationMessage = (): string => {
    const messages: Record<Language, string> = {
      en: "If you've found inspiration here, I wish you success! Share your link below so I can see what you've created.",
      uk: "Якщо ви знайшли тут натхнення, бажаю вам успіху! Поділіться своїм посиланням нижче, щоб я міг побачити, що у вас вийшло.",
      ru: "Если вы нашли здесь вдохновение, желаю вам удачи! Поделитесь своей ссылкой ниже, чтобы я мог посмотреть, что у вас получилось.",
      es: "Si has encontrado inspiración aquí, ¡te deseo éxito! Comparte tu enlace a continuación para que pueda ver lo que has creado."
    };

    return messages[currentLanguage as Language] || messages.en;
  };

  const onMainTabChange = (value: string) => {
    const basePath = value === "marketplace" ? "/marketplace" : "/";
    const url = query
      ? `${basePath}?search=${encodeURIComponent(query)}`
      : basePath;
    router.push(url);
  };

  const onCategoryTabChange = (value: string) => {
    setActiveCategory(value);
    const url = query
      ? `/marketplace?category=${value}&search=${encodeURIComponent(query)}`
      : `/marketplace?category=${value}`;
    router.push(url);
  };

  const handleSubmitLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (inspirationLink) {
      // Create new link entry
      const newLink: SubmittedLink = {
        id: Date.now().toString(),
        url: inspirationLink,
        timestamp: Date.now()
      };
      
      // Update state with new link
      const updatedLinks = [...submittedLinks, newLink];
      setSubmittedLinks(updatedLinks);
      
      // Save to localStorage
      localStorage.setItem('submittedLinks', JSON.stringify(updatedLinks));
      
      // Reset input and show success message
      setInspirationLink("");
      alert("Thank you for sharing your link!");
    }
  };

  // Format date for display in the links table
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="w-full max-w-4xl">
        {/* Main navigation tabs */}
        <Tabs defaultValue="marketplace" onValueChange={onMainTabChange} className="mb-4">
          <TabsList>
            <TabsTrigger value="functions">{t("functionsShowcase")}</TabsTrigger>
            <TabsTrigger value="marketplace">{t("marketplace")}</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* More compact Notion-style description block */}
        <Card className="p-3 mb-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <div className="prose dark:prose-invert max-w-none prose-xs text-sm">
            {getMarketplaceDescription().map((line: string, index: number) => (
              <div 
                key={index} 
                className="mb-0.5 last:mb-0 text-sm"
              >
                {index === 0 ? (
                  <strong>{line.replace(/\*\*/g, '')}</strong>
                ) : (
                  <div>{line.replace(/\*\*/g, '')}</div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Marketplace categories tabs */}
        <Tabs defaultValue={activeCategory} onValueChange={onCategoryTabChange} className="mb-6">
          <TabsList className="w-full">
            {marketplaceCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.slug}>
                {category.i18n[currentLanguage as Language]?.name || category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <MarketplaceGrid 
          items={marketplaceItems} 
          searchQuery={searchQuery} 
          activeCategory={activeCategory} 
        />

        {/* Notion-style inspiration section */}
        <Card className="p-4 mt-10 mb-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <div className="prose dark:prose-invert max-w-none mb-3">
            <p className="text-left text-sm text-gray-600 dark:text-gray-400">{getInspirationMessage()}</p>
          </div>
          <form onSubmit={handleSubmitLink} className="flex flex-col sm:flex-row gap-2 mb-2">
            <Input
              placeholder="https://your-project-link.com"
              value={inspirationLink}
              onChange={(e) => setInspirationLink(e.target.value)}
              className="flex-grow bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="sm" 
              className="self-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-normal"
            >
              {currentLanguage === 'en' ? 'Share' : 
               currentLanguage === 'uk' ? 'Поділитися' :
               currentLanguage === 'ru' ? 'Поделиться' : 'Compartir'}
            </Button>
          </form>
          
          {/* Submitted links table - toggleable */}
          {submittedLinks.length > 0 && (
            <div className="mt-2">
              <button 
                onClick={() => setShowLinks(!showLinks)} 
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-2 underline"
              >
                {showLinks ? 'Hide shared links' : 'Show shared links'} ({submittedLinks.length})
              </button>
              
              {showLinks && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400 border-collapse">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-3 py-2">URL</th>
                        <th scope="col" className="px-3 py-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submittedLinks.map((link) => (
                        <tr key={link.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                          <td className="px-3 py-2">
                            <a 
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="hover:underline text-blue-600 dark:text-blue-400"
                            >
                              {link.url.length > 40 ? `${link.url.substring(0, 40)}...` : link.url}
                            </a>
                          </td>
                          <td className="px-3 py-2">{formatDate(link.timestamp)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}