"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2, Minimize2, Timer } from "lucide-react";
import { marked, type Tokens } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

// Initialize marked with a custom renderer for highlight.js code highlighting
const renderer = new marked.Renderer();
renderer.code = (code: Tokens.Code) => {
  const text = code.text;
  const lang = code.lang;
  const escaped = code.escaped;
  if (lang && hljs.getLanguage(lang)) {
    const highlighted = hljs.highlight(text, { language: lang }).value;
    return `<pre class="hljs"><code>${highlighted}</code></pre>`;
  }
  const safeCode = escaped ? text : text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<pre><code>${safeCode}</code></pre>`;
};
marked.setOptions({ renderer });

interface SlidesClientProps {
  id: string;
}

export default function SlidesClient({ id }: SlidesClientProps) {
  const [slides, setSlides] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  // Format remaining time as HH:MM:SS
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        setCurrentSlide(prev => Math.max(0, prev - 1));
      } else if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === " ") {
        setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
      } else if (event.key === "Escape") {
        if (isFullscreen) {
          document.exitFullscreen().catch(() => {});
          setIsFullscreen(false);
        }
      } else if (event.key === "f" || event.key === "F") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slides.length, isFullscreen]);

  // Load slides data from Vercel Blob
  useEffect(() => {
    const fetchBlobContent = async () => {
      try {
        setIsLoading(true);
        
        // First try from localStorage as a fallback
        const localContent = localStorage.getItem(`markdown-slides-${id}`);
        
        if (localContent) {
          processContent(localContent);
          
          // Check if we have expiration info
          const expiresAt = localStorage.getItem(`markdown-slides-${id}-expires`);
          if (expiresAt) {
            const expirationTime = parseInt(expiresAt, 10);
            const now = Date.now();
            if (expirationTime > now) {
              setTimeRemaining(Math.floor((expirationTime - now) / 1000));
            }
          }
          return;
        }
        
        // If not in localStorage, try to fetch from Blob storage
        const response = await fetch(`/api/blob/get?id=${id}`);
        if (!response.ok) {
          throw new Error("Failed to load presentation");
        }
        
        const data = await response.json();
        if (data.content) {
          processContent(data.content);
          
          // Set expiration timer
          if (data.expiresAt) {
            const now = Date.now();
            const expirationTime = new Date(data.expiresAt).getTime();
            if (expirationTime > now) {
              setTimeRemaining(Math.floor((expirationTime - now) / 1000));
              
              // Store locally as backup
              localStorage.setItem(`markdown-slides-${id}`, data.content);
              localStorage.setItem(`markdown-slides-${id}-expires`, expirationTime.toString());
            } else {
              throw new Error("Presentation has expired");
            }
          }
        } else {
          throw new Error("Presentation not found");
        }
      } catch (err) {
        console.error("Error loading presentation:", err);
        setError(err instanceof Error ? err.message : "Presentation not found or expired");
      } finally {
        setIsLoading(false);
      }
    };
    
    const processContent = (markdownContent: string) => {
      const slideContents = markdownContent.split(/\n---\n|\r\n---\r\n/);
      const processedSlides = slideContents.map(content => marked.parse(content) as string);
      setSlides(processedSlides);
    };
    
    fetchBlobContent();
  }, [id]);
  
  // Update remaining time countdown
  useEffect(() => {
    if (timeRemaining === null) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => {
        if (prevTime === null || prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Handle swipe events for mobile
  useEffect(() => {
    let startX = 0, endX = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      if (endX < startX - 50) setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
      if (endX > startX + 50) setCurrentSlide(prev => Math.max(0, prev - 1));
    };
    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchend", onTouchEnd);
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [slides.length]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  const goPrev = () => setCurrentSlide(prev => Math.max(0, prev - 1));
  const goNext = () => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
  const close = () => window.close();

  // Calculate progress percentage
  const progressPercentage = slides.length > 0 
    ? Math.round(((currentSlide + 1) / slides.length) * 100) 
    : 0;

  useEffect(() => {
    // Увеличиваем просмотры при заходе на страницу слайдов
    fetch('/api/likes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardId: id }),
      keepalive: true,
    }).catch(() => {});
  }, [id]);

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen bg-background text-foreground">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground p-4">
      <Card className="max-w-md w-full p-6">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={close} variant="default">Close</Button>
      </Card>
    </div>
  );

  return (
    <TooltipProvider>
      <div
        className={cn(
          "relative min-h-screen flex flex-col items-center justify-center bg-background py-4 px-4",
          isFullscreen ? "fixed inset-0 z-50 bg-background" : ""
        )}
        style={{ minHeight: '100vh' }}
      >
        {/* Slide content area */}
        <div
          className="flex-1 flex items-center justify-center w-full"
          style={{ width: '100%', maxWidth: '900px', minHeight: 0 }}
        >
          <Card
            className={cn(
              "slide-content flex flex-col w-full h-[calc(100vh-120px)] max-h-[700px] min-h-[300px] bg-card text-card-foreground overflow-hidden rounded-lg border shadow-sm transition-all duration-200",
              isFullscreen ? "h-[calc(100vh-80px)] max-h-[1000px]" : ""
            )}
            onClick={e => e.stopPropagation()}
            style={{ minHeight: 0 }}
          >
            <div
              className="flex-1 overflow-auto p-4 md:p-8 notion-content text-left"
              style={{ minHeight: 0, margin: 'auto', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <div style={{ width: '100%' }} dangerouslySetInnerHTML={{ __html: slides[currentSlide] }} />
            </div>
          </Card>
        </div>
        {/* Navigation controls */}
        <div className="absolute bottom-16 inset-x-0 flex justify-center items-center gap-2 px-4 z-10 pointer-events-none">
          <div className="bg-accent/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2 border border-border pointer-events-auto">
            <Button 
              onClick={goPrev} 
              disabled={currentSlide===0}
              size="icon"
              variant="ghost"
              className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="min-w-[80px] text-sm text-center text-foreground">
              <span className="font-medium">{currentSlide+1}</span>
              <span className="text-muted-foreground">&nbsp;/&nbsp;{slides.length}</span>
            </div>
            <Button 
              onClick={goNext} 
              disabled={currentSlide===slides.length-1}
              size="icon"
              variant="ghost"
              className="rounded-full h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-12 inset-x-0">
          <div className="w-full h-1 bg-secondary rounded-none overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        {/* Control buttons in top-right */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          {timeRemaining !== null && timeRemaining > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-card/80 text-sm text-foreground border border-border">
              <Timer className="h-4 w-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          )}
          <Button
            onClick={toggleFullscreen}
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8 border border-border bg-card/80 backdrop-blur-sm"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button
            onClick={close}
            variant="outline"
            size="icon"
            className="rounded-full h-8 w-8 border border-border bg-card/80 backdrop-blur-sm"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <style jsx global>{`
          .slide-content { transition: height 0.2s; }
          .notion-content {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
            color: var(--card-foreground);
          }
          
          .notion-content h1 {
            font-size: 2.25rem;
            font-weight: 600;
            margin: 0.5em 0;
            color: var(--foreground);
            line-height: 1.3;
          }
          
          .notion-content h2 {
            font-size: 1.75rem;
            font-weight: 600;
            margin: 0.5em 0;
            color: var(--foreground);
            line-height: 1.3;
          }
          
          .notion-content h3 {
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0.5em 0;
            color: var(--foreground);
          }
          
          .notion-content p {
            margin: 0.75em 0;
            line-height: 1.6;
          }
          
          .notion-content ul, .notion-content ol {
            margin: 0.75em 0;
            padding-left: 1.5em;
          }
          
          .notion-content li {
            margin: 0.25em 0;
            line-height: 1.6;
          }
          
          .notion-content a {
            color: #3d78e0;
            text-decoration: underline;
            text-underline-offset: 2px;
          }
          
          .notion-content blockquote {
            border-left: 3px solid #e0e0e0;
            padding-left: 1em;
            margin: 1em 0;
            color: var(--muted-foreground);
          }
          
          .notion-content img {
            max-width: 100%;
            height: auto;
            border-radius: 4px;
          }
          
          /* Notion-style code block styling */
          .notion-content pre {
            background-color: var(--card-background);
            color: var(--card-foreground);
            border: 1px solid var(--border);
            border-radius: 0.375rem;
            padding: 1rem;
            margin: 1em 0;
            overflow: auto;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
            font-size: 0.875rem;
          }

          .notion-content pre code {
            background: none;
            padding: 0;
            color: inherit;
            font-family: inherit;
            font-size: inherit;
          }

          .notion-content code:not(pre code) {
            background-color: rgba(135,131,120,0.15);
            padding: 0.2em 0.4em;
            border-radius: 0.25rem;
          }
          
          .notion-content table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
          }
          
          .notion-content th, .notion-content td {
            border: 1px solid #e0e0e0;
            padding: 8px 12px;
            text-align: left;
          }
          
          .notion-content th {
            background-color: #f5f5f5;
            font-weight: 600;
          }
        `}</style>
      </div>
    </TooltipProvider>
  );
} 