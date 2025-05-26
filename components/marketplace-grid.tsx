"use client";

import { useState, useEffect } from "react";
import { MarketplaceItem } from "@/lib/marketplace-types";
import { MarketplaceItemCard } from "@/components/marketplace-item-card";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";

interface MarketplaceGridProps {
  items: MarketplaceItem[];
  searchQuery?: string;
  activeCategory?: string;
}

export function MarketplaceGrid({ 
  items, 
  searchQuery = "", 
  activeCategory = "all" 
}: MarketplaceGridProps) {
  const [filteredItems, setFilteredItems] = useState<MarketplaceItem[]>(items);
  const { t, currentLanguage } = useLanguage();

  useEffect(() => {
    let filtered = items;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => {
        const title = (item.i18n?.[currentLanguage as Language]?.title || item.title).toLowerCase();
        const description = (item.i18n?.[currentLanguage as Language]?.description || item.description).toLowerCase();
        const tags = item.tags?.join(" ").toLowerCase() || "";
        
        return (
          title.includes(query) || 
          description.includes(query) || 
          tags.includes(query) || 
          item.author.toLowerCase().includes(query)
        );
      });
    }
    
    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }
    
    setFilteredItems(filtered);
  }, [searchQuery, items, activeCategory, currentLanguage]);

  if (filteredItems.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
        <p className="text-lg font-medium">{t('noItemsFound')}</p>
        <p className="text-sm text-muted-foreground">
          {t('modifySearchQuery')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {filteredItems.map((item) => (
        <MarketplaceItemCard key={item.id} item={item} />
      ))}
    </div>
  );
} 