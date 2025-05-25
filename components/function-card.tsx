"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FunctionCard as FunctionCardType } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface FunctionCardProps {
  card: FunctionCardType;
  className?: string;
}

export function FunctionCard({ card, className }: FunctionCardProps) {
  const [likes, setLikes] = useState(card.likes);
  const [isLiked, setIsLiked] = useState(false);
  const { t, language } = useLanguage();

  const cardRef = useRef<HTMLDivElement>(null);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLikes(prev => prev + 1);
    setIsLiked(true);
    setTimeout(() => setIsLiked(false), 1000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Get the localized title and description or fall back to the default
  const title = card.i18n?.[language]?.title || card.title;
  const description = card.i18n?.[language]?.description || card.description;

  return (
    <Link href={`/functions/${card.slug}`} className="block h-full no-underline">
      <Card
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "flex h-full flex-col transition-all duration-200 hover:shadow-md relative overflow-hidden gradient-follow",
          className
        )}
      >
        <CardHeader className="flex-none pb-4">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-6">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="flex-none items-center justify-between border-t bg-muted/10 px-4 py-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "h-8 gap-1.5 px-2 transition-transform",
              isLiked && "scale-125"
            )}
            onClick={handleLike}
          >
            <Heart className={cn(
              "h-4 w-4 transition-colors",
              isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"
            )} />
            <span className="text-xs text-muted-foreground">{likes}</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="h-8 px-3"
          >
            {t('open')}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}