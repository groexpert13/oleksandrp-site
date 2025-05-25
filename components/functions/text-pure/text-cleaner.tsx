"use client";

import { useState } from "react";
import { transformText, TextTransformationType } from "@/lib/utils/text-utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { X, Copy, Check, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import React from "react";

export function TextCleaner() {
  const { t } = useLanguage();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [transformationType, setTransformationType] = useState<TextTransformationType>(
    TextTransformationType.MARKDOWN_TO_PLAIN
  );

  const handleGenerate = () => {
    // Prevent generation when input is empty
    if (!inputText.trim()) {
      toast.error(t('emptyInputError'));
      return;
    }
    try {
      const result = transformText(inputText, transformationType);
      setOutputText(result);
      toast.success(t('generateSuccess'));
    } catch (err) {
      console.error(err);
      toast.error(t('generateError'));
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Get a description for the currently selected transformation type
  const getTransformationDescription = () => {
    let desc = '';
    switch (transformationType) {
      case TextTransformationType.MARKDOWN_TO_PLAIN:
        desc = t('markdownToPlainDesc'); break;
      case TextTransformationType.MARKDOWN_TO_TELEGRAM:
        desc = t('markdownToTelegramDesc'); break;
      case TextTransformationType.PLAIN_TO_HTML_EMAIL:
        desc = t('plainToHtmlEmailDesc'); break;
      case TextTransformationType.PLAIN_TO_OG:
        desc = t('plainToOgDesc'); break;
      case TextTransformationType.PLAIN_TO_SSML:
        desc = t('plainToSsmlDesc'); break;
      case TextTransformationType.SMART_TYPOGRAPHY:
        desc = t('smartTypographyDesc'); break;
      case TextTransformationType.PLAIN_TO_JSON_YAML:
        desc = t('plainToJsonYamlDesc'); break;
      default:
        desc = '';
    }
    // Render bold for **...**
    // Split by newlines, replace **...** with <strong>...</strong>
    return desc.split('\n').map((line, idx) => {
      const parts = [];
      let rest = line;
      while (rest.includes('**')) {
        const start = rest.indexOf('**');
        if (start !== -1) {
          if (start > 0) parts.push(rest.slice(0, start));
          const end = rest.indexOf('**', start + 2);
          if (end !== -1) {
            parts.push(<strong key={start + '-' + end}>{rest.slice(start + 2, end)}</strong>);
            rest = rest.slice(end + 2);
          } else {
            parts.push(rest.slice(start));
            rest = '';
          }
        } else {
          parts.push(rest);
          rest = '';
        }
      }
      if (rest) parts.push(rest);
      return <div key={idx}>{parts}</div>;
    });
  };

  return (
    <div className="flex flex-col h-[calc(50vh-6rem)] min-h-[250px] gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div className="flex-1 max-w-xs">
          <Select 
            value={transformationType} 
            onValueChange={(value) => setTransformationType(value as TextTransformationType)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('transformationCategories')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TextTransformationType.MARKDOWN_TO_PLAIN}>{t('markdownToPlain')}</SelectItem>
              <SelectItem value={TextTransformationType.MARKDOWN_TO_TELEGRAM}>{t('markdownToTelegram')}</SelectItem>
              <SelectItem value={TextTransformationType.PLAIN_TO_HTML_EMAIL}>{t('plainToHtmlEmail')}</SelectItem>
              <SelectItem value={TextTransformationType.PLAIN_TO_OG}>{t('plainToOg')}</SelectItem>
              <SelectItem value={TextTransformationType.PLAIN_TO_SSML}>{t('plainToSsml')}</SelectItem>
              <SelectItem value={TextTransformationType.SMART_TYPOGRAPHY}>{t('smartTypography')}</SelectItem>
              <SelectItem value={TextTransformationType.PLAIN_TO_JSON_YAML}>{t('plainToJsonYaml')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="text-sm text-muted-foreground whitespace-pre-line">
        {getTransformationDescription()}
      </div>

      <div className="grid gap-6 md:grid-cols-2 flex-1 h-full min-h-0">
        <Card className="flex flex-col h-full">
          <CardHeader className="!flex-row !space-y-0 items-center justify-between">
            <CardTitle>{t('originalText')}</CardTitle>
            <Button onClick={handleGenerate} variant="outline" className="px-6 py-2 text-base font-medium border-muted-foreground/20 bg-background hover:bg-muted/30 transition-colors">
              <Wand2 className="mr-2 h-4 w-4" />
              {t('generate')}
            </Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0 relative overflow-auto p-4">
            <div className="relative flex-1 flex flex-col h-full">
              <Textarea
                placeholder={t('pasteTextHere')}
                className="h-full w-full resize-none pr-10 overflow-auto"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="absolute right-2 top-2 flex flex-col gap-2">
                {inputText && (
                  <button
                    onClick={() => setInputText("")}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "h-7 w-7 rounded-full bg-background/80 p-0 text-muted-foreground hover:bg-background hover:text-foreground"
                    )}
                    title={t('clear')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>{t('cleanedText')}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col min-h-0 relative overflow-auto p-4">
            <div className="relative flex-1 flex flex-col h-full">
              <Textarea
                placeholder={t('resultWillAppearHere')}
                className="h-full w-full resize-none pr-10 overflow-auto"
                value={outputText}
                readOnly
              />
              {outputText && (
                <div className="absolute right-2 top-2">
                  <button
                    onClick={handleCopyToClipboard}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "h-7 w-7 rounded-full bg-background/80 p-0 text-muted-foreground hover:bg-background hover:text-foreground",
                      isCopied && "text-green-500"
                    )}
                    title={isCopied ? t('copied') : t('copyResult')}
                  >
                    {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}