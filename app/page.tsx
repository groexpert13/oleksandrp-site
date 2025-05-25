"use client";

import { functionCards } from "@/lib/types";
import { FunctionGrid } from "@/components/function-grid";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") ?? "";
  
  return (
    <div className="flex flex-col items-center space-y-12">
      <div className="w-full max-w-4xl">
        <div className="mb-12 space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t('functionsShowcase')}
          </h1>
          <p className="mx-auto max-w-[600px] text-base text-muted-foreground">
            {t('functionsDescription')}
          </p>
        </div>
        
        <FunctionGrid cards={functionCards} searchQuery={searchQuery} />
      </div>
    </div>
  );
}