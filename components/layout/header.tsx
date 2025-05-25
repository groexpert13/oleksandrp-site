"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Search, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialSearch = searchParams.get("search") ?? "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const isHome = pathname === "/";
  const { t } = useLanguage();

  const onSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const query = searchQuery.trim();
      const url = query ? `/?search=${encodeURIComponent(query)}` : "/";
      router.push(url);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link 
          href="/"
          className={cn(
            "flex items-center transition-colors",
            isHome ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Home className="h-5 w-5" />
        </Link>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t('searchFunctions')}
              className="w-full pl-8 md:w-[240px] lg:w-[320px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={onSearchKeyDown}
            />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}