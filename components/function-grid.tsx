"use client";

import { useState, useEffect } from "react";
import { FunctionCard as FunctionCardType } from "@/lib/types";
import { FunctionCard } from "@/components/function-card";
import { searchFunctions } from "@/lib/utils/text-utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface FunctionGridProps {
  cards: FunctionCardType[];
  searchQuery?: string;
}

export function FunctionGrid({ cards, searchQuery = "" }: FunctionGridProps) {
  const [filteredCards, setFilteredCards] = useState<FunctionCardType[]>(cards);
  const { t } = useLanguage();

  useEffect(() => {
    setFilteredCards(searchFunctions(searchQuery, cards));
  }, [searchQuery, cards]);

  if (filteredCards.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
        <p className="text-lg font-medium">{t('noFunctionsFound')}</p>
        <p className="text-sm text-muted-foreground">
          {t('modifySearchQuery')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {filteredCards.map((card) => (
        <FunctionCard key={card.id} card={card} />
      ))}
    </div>
  );
}