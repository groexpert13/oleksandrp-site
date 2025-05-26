"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Heart, Eye } from "lucide-react";
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
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { t, language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  // Fetch likes/views from API
  async function fetchStats() {
    try {
      const response = await fetch('/api/likes');
      const data = await response.json();
      if (data.cards && data.cards[card.id]) {
        setLikes(data.cards[card.id].count || 0);
        setViews(data.cards[card.id].views || 0);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, [card.id]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId: card.id }),
      });
      setIsLiked(true);
      setTimeout(() => setIsLiked(false), 1000);
      fetchStats();
    } catch (error) {
      console.error('Error updating likes:', error);
    }
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
          <div className="flex items-center space-x-3">
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
            
            <div className="flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{views}</span>
            </div>
          </div>
          
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