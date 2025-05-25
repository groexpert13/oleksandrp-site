"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { FunctionCard as FunctionCardType } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { TextCleaner } from "@/components/functions/text-pure/text-cleaner";
import { PromptForge } from "@/components/functions/codex-prompt-forge/prompt-forge";
import { RandomYesNo } from "@/components/functions/random-yes-no/RandomYesNo";
import { CountdownTimer } from "@/components/functions/countdown-timer/CountdownTimer";

interface FunctionPageContentProps {
  card: FunctionCardType;
}

export default function FunctionPageContent({ card }: FunctionPageContentProps) {
  const { t, language } = useLanguage();
  const title = card.i18n?.[language]?.title || card.title;
  const description = card.i18n?.[language]?.description || card.description;
  const slug = card.slug;

  return (
    <div className="flex flex-col space-y-8">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col gap-2">
          <Link
            href="/"
            className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('back')}</span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="py-4">
          {slug === 'text-pure' && <TextCleaner />}
          {slug === 'codex-prompt-forge' && <PromptForge />}
          {slug === 'random-yes-no' && <RandomYesNo />}
          {slug === 'countdown-timer' && <CountdownTimer />}
        </div>
      </div>
    </div>
  );
} 