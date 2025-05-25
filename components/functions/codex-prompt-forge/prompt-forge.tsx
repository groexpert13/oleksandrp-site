"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function PromptForge() {
  const [inputText, setInputText] = useState("");
  const { t } = useLanguage();
  const baseUrl = "https://chatgpt.com/g/g-68333a1b75b4819191ca31f50fdd039a-codex-prompt-forge";

  const handleOpenCodexPrompt = () => {
    const url = `${baseUrl}?prompt=${encodeURIComponent(inputText)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>{t('yourRequest')}</CardTitle>
            <CardDescription>
              {t('describeCodingTask')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0">
            <Textarea
              placeholder={t('exampleCreateFunction')}
              className="min-h-[200px] w-full resize-none pr-10 overflow-auto text-base"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </CardContent>
          <CardFooter className="mt-auto flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setInputText("")}
              disabled={!inputText}
            >
              {t('clear')}
            </Button>
            <Button 
              onClick={handleOpenCodexPrompt}
              className="gap-2"
            >
              <span>{t('openInNewWindow')}</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>{t('aboutCodexPromptForge')}</CardTitle>
            <CardDescription>
              {t('transformsCodingRequests')}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4">
            <p>{t('codexConvertsAny')}</p>
            <ul className="ml-6 list-disc [&>li]:mt-2">
              <li>{t('clearTaskDefinition')}</li>
              <li>{t('requiredContext')}</li>
              <li>{t('outputSpecification')}</li>
              <li>{t('structuredChainOfThought')}</li>
              <li>{t('selfReviewLoop')}</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              {t('worksWithAny')}
            </p>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button 
              variant="secondary" 
              onClick={handleOpenCodexPrompt}
              className="w-full gap-2"
            >
              <span>{t('openInNewWindow')}</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}