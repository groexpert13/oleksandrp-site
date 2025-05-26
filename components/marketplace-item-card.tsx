"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Heart, Eye, DollarSign, Users, User } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { MarketplaceItem } from "@/lib/marketplace-types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Language } from "@/lib/i18n/translations";
import { getFakeBidData, maskEmail } from "@/lib/utils/fake-bids";

interface MarketplaceItemCardProps {
  item: MarketplaceItem;
  className?: string;
}

export function MarketplaceItemCard({ item, className }: MarketplaceItemCardProps) {
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [fakeBid, setFakeBid] = useState(() => getFakeBidData(item.id));
  const { t, currentLanguage } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Use localized content if available, otherwise use default
  const title = item.i18n?.[currentLanguage as Language]?.title || item.title;
  const description = item.i18n?.[currentLanguage as Language]?.description || item.description;

  // Fetch likes/views from API
  async function fetchStats() {
    try {
      const response = await fetch('/api/likes');
      const data = await response.json();
      if (data.items && data.items[item.id]) {
        setLikes(data.items[item.id].count || 0);
        setViews(data.items[item.id].views || 0);
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, [item.id]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: item.id }),
      });
      setIsLiked(true);
      setTimeout(() => setIsLiked(false), 1000);
      setTimeout(fetchStats, 500);
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

  return (
    <Link href={`/marketplace/${item.slug}`} className="block h-full no-underline">
      <Card
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "flex h-full flex-col transition-all duration-200 hover:shadow-md relative overflow-hidden gradient-follow",
          className
        )}
      >
        <CardHeader className="flex-none pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-1 pb-6">
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <User className="h-3 w-3" /> {maskEmail(fakeBid.email)}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              telegram
            </Badge>
            {item.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
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
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{fakeBid.count}</span>
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