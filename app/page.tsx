"use client";

import { functionCards } from "@/lib/types";
import { FunctionGrid } from "@/components/function-grid";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get("search") ?? "";
  const query = searchQuery.trim();
  const activeTab = "functions";

  const onTabChange = (value: string) => {
    const basePath = value === "marketplace" ? "/marketplace" : "/";
    const url = query
      ? `${basePath}?search=${encodeURIComponent(query)}`
      : basePath;
    router.push(url);
  };
  
  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="w-full max-w-4xl">
        <Tabs defaultValue={activeTab} onValueChange={onTabChange}>
          <TabsList>
            <TabsTrigger value="functions">{t("functionsShowcase")}</TabsTrigger>
            <TabsTrigger value="marketplace">{t("marketplace")}</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-12 space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t("functionsShowcase")}
          </h1>
          <p className="mx-auto max-w-[600px] text-base text-muted-foreground">
            {t("functionsDescription")}
          </p>
        </div>

        <FunctionGrid cards={functionCards} searchQuery={searchQuery} />
      </div>
    </div>
  );
}