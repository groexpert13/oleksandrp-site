"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, Presentation, ExternalLink, Copy, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

export function MarkdownSlides() {
  const { t } = useLanguage();
  const router = useRouter();
  const [markdown, setMarkdown] = useState<string>(`# Demo Presentation\n\n- Create slides easily with Markdown\n- Each slide is separated by ---\n- Supports standard Markdown formatting\n\n---\n\n## Second Slide\n\n- Bullet points work\n- **Bold text** and *italic text* work too\n- Code blocks are supported\n\n\`\`\`js\nconsole.log('Hello world!');\n\`\`\`\n\n---\n\n## Thank You!\n\n- This presentation was made with Markdown\n- Click "Generate Slides" to see it in action`);
  const [error, setError] = useState<string | null>(null);
  const [slideId, setSlideId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check if the markdown is valid
  const validateMarkdown = (md: string): boolean => {
    if (!md.trim()) {
      setError(t('markdownEmpty'));
      return false;
    }
    
    // Check if there's at least one slide separator
    if (!md.includes('---')) {
      setError(t('markdownNoSeparator'));
      return false;
    }
    
    setError(null);
    return true;
  };

  // Generate slides presentation from markdown
  const generateSlides = async () => {
    if (!validateMarkdown(markdown)) {
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Generate a unique ID for this presentation
      const id = nanoid(10);

      // Save to Vercel Blob with 3-hour expiration
      const response = await fetch('/api/blob/upload-slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          content: markdown,
          expiresIn: 3 * 60 * 60 // 3 hours in seconds
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save presentation');
      }

      // If successful, also save to localStorage as a fallback
      const expiresAt = Date.now() + (3 * 60 * 60 * 1000); // 3 hours from now in ms
      localStorage.setItem(`markdown-slides-${id}`, markdown);
      localStorage.setItem(`markdown-slides-${id}-expires`, expiresAt.toString());

      setSlideId(id);
    } catch (err) {
      console.error("Error saving presentation:", err);
      setError(err instanceof Error ? err.message : "Failed to save presentation");
    } finally {
      setIsLoading(false);
    }
  };

  // Copy presentation link to clipboard
  const copyLink = () => {
    if (!slideId) return;
    
    const url = `${window.location.origin}/slides/${slideId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Open presentation in new window
  const openPresentation = () => {
    if (!slideId) return;
    window.open(`/slides/${slideId}`, '_blank');
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [markdown]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t('markdownSlides')}</CardTitle>
          <CardDescription>{t('markdownSlidesDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="markdown-input">{t('markdownContent')}</Label>
              <Textarea
                ref={textareaRef}
                id="markdown-input"
                placeholder={t('markdownPlaceholder')}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                {t('markdownInstruction')}
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t('error')}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              onClick={generateSlides} 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              ) : (
                <Presentation className="mr-2 h-4 w-4" />
              )}
              {isLoading ? t('generating') : t('generateSlides')}
            </Button>

            {slideId && (
              <div className="space-y-2 bg-muted p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t('slidesReady')} <span className="text-xs text-muted-foreground ml-2">(Expires in 3 hours)</span></span>
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={copyLink}
                    >
                      {copied ? (
                        <Check className="mr-2 h-4 w-4" />
                      ) : (
                        <Copy className="mr-2 h-4 w-4" />
                      )}
                      {copied ? t('copied') : t('copyLink')}
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={openPresentation}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t('openPresentation')}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 