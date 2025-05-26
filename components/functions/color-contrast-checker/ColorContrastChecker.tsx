"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, RefreshCw, ArrowRight, Copy, Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HexColorPicker } from "react-colorful";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

interface WCAGLevel {
  level: string;
  smallText: number;
  largeText: number;
  result: { small: boolean; large: boolean };
}

export function ColorContrastChecker() {
  const { t } = useLanguage();
  
  const [foregroundColor, setForegroundColor] = useState("#FFFFFF");
  const [backgroundColor, setBackgroundColor] = useState("#121212");
  const [contrastRatio, setContrastRatio] = useState<number>(0);
  const [wcagLevels, setWcagLevels] = useState<WCAGLevel[]>([]);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [copiedResults, setCopiedResults] = useState(false);

  useEffect(() => {
    calculateContrastRatio();
  }, [foregroundColor, backgroundColor]);

  const hexToRgb = (hex: string): number[] | null => {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    
    // Check if valid hex color
    if (!/^[0-9A-F]{6}$/i.test(hex)) {
      return null;
    }
    
    // Parse hex to RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    
    return [r, g, b];
  };

  // Calculate relative luminance for WCAG
  const calculateLuminance = (rgb: number[]): number => {
    // Convert RGB to sRGB
    const sRGB = rgb.map(val => {
      const sVal = val / 255;
      return sVal <= 0.03928
        ? sVal / 12.92
        : Math.pow((sVal + 0.055) / 1.055, 2.4);
    });
    
    // Calculate luminance using WCAG formula
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
  };

  // Calculate contrast ratio
  const calculateContrastRatio = () => {
    const fgRGB = hexToRgb(foregroundColor);
    const bgRGB = hexToRgb(backgroundColor);
    
    if (!fgRGB || !bgRGB) {
      setContrastRatio(0);
      setWcagLevels([]);
      setSuggestion(null);
      return;
    }
    
    const fgLuminance = calculateLuminance(fgRGB);
    const bgLuminance = calculateLuminance(bgRGB);
    
    // Formula: (L1 + 0.05) / (L2 + 0.05) where L1 is the lighter color and L2 is the darker
    const ratio = fgLuminance > bgLuminance
      ? (fgLuminance + 0.05) / (bgLuminance + 0.05)
      : (bgLuminance + 0.05) / (fgLuminance + 0.05);
    
    setContrastRatio(ratio);
    
    // WCAG Success Criteria
    const levels: WCAGLevel[] = [
      {
        level: "AAA",
        smallText: 7,
        largeText: 4.5,
        result: { small: ratio >= 7, large: ratio >= 4.5 }
      },
      {
        level: "AA",
        smallText: 4.5,
        largeText: 3,
        result: { small: ratio >= 4.5, large: ratio >= 3 }
      }
    ];
    
    setWcagLevels(levels);
    
    // Generate suggestion for improvement if not meeting AAA requirements
    if (ratio < 7) {
      provideSuggestion(fgRGB, bgRGB, fgLuminance, bgLuminance);
    } else {
      setSuggestion(null);
    }
  };

  // Provide suggestion to improve contrast
  const provideSuggestion = (fgRGB: number[], bgRGB: number[], fgLuminance: number, bgLuminance: number) => {
    // Determine which color to adjust (typically adjust the one with higher luminance)
    if (fgLuminance > bgLuminance) {
      // If foreground is lighter, make it even lighter
      if (isColorBright(fgRGB)) {
        const brightnessChange = Math.min(Math.round((7 - contrastRatio) * 20), 30);
        setSuggestion(t('increaseBrightness').replace('{value}', brightnessChange.toString()));
      } else {
        const brightnessChange = Math.min(Math.round((7 - contrastRatio) * 15), 25);
        setSuggestion(t('decreaseBrightness').replace('{value}', brightnessChange.toString()));
      }
    } else {
      // If background is lighter, make it even lighter
      if (isColorBright(bgRGB)) {
        const brightnessChange = Math.min(Math.round((7 - contrastRatio) * 20), 30);
        setSuggestion(t('increaseBrightness').replace('{value}', brightnessChange.toString()));
      } else {
        const brightnessChange = Math.min(Math.round((7 - contrastRatio) * 15), 25);
        setSuggestion(t('decreaseBrightness').replace('{value}', brightnessChange.toString()));
      }
    }
  };

  // Check if a color is bright (simple average calculation)
  const isColorBright = (rgb: number[]): boolean => {
    const average = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return average > 128;
  };

  // Swap foreground and background colors
  const swapColors = () => {
    const temp = foregroundColor;
    setForegroundColor(backgroundColor);
    setBackgroundColor(temp);
  };

  // Handle color input change
  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>, setColor: (color: string) => void) => {
    let value = e.target.value;
    // Add # if not present
    if (!value.startsWith('#')) {
      value = '#' + value;
    }
    
    // Validate hex color format
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      setColor(value);
    }
  };

  // Copy results to clipboard
  const copyResults = () => {
    const resultText = `
Foreground Color: ${foregroundColor}
Background Color: ${backgroundColor}
Contrast Ratio: ${contrastRatio.toFixed(2)}:1
WCAG AA (Small Text): ${contrastRatio >= 4.5 ? 'Pass ✓' : 'Fail ✗'}
WCAG AA (Large Text): ${contrastRatio >= 3 ? 'Pass ✓' : 'Fail ✗'}
WCAG AAA (Small Text): ${contrastRatio >= 7 ? 'Pass ✓' : 'Fail ✗'}
WCAG AAA (Large Text): ${contrastRatio >= 4.5 ? 'Pass ✓' : 'Fail ✗'}
${suggestion ? `Suggestion: ${suggestion}` : ''}
    `;
    
    navigator.clipboard.writeText(resultText.trim()).then(() => {
      setCopiedResults(true);
      setTimeout(() => setCopiedResults(false), 2000);
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('colorContrastChecker')}</CardTitle>
        <CardDescription>{t('colorContrastCheckerDescription')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Selection Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Foreground Color Selector */}
          <div className="space-y-3">
            <Label htmlFor="foreground-color">{t('foregroundColor')}</Label>
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-12 h-8 p-1 rounded-md border"
                    style={{ backgroundColor: foregroundColor }}
                  >
                    <span className="sr-only">{t('pickForegroundColor')}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker color={foregroundColor} onChange={setForegroundColor} />
                </PopoverContent>
              </Popover>
              
              <Input
                id="foreground-color"
                value={foregroundColor}
                onChange={(e) => handleColorInputChange(e, setForegroundColor)}
                placeholder="#FFFFFF"
                className="flex-1"
              />
            </div>
          </div>
          
          {/* Background Color Selector */}
          <div className="space-y-3">
            <Label htmlFor="background-color">{t('backgroundColor')}</Label>
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-12 h-8 p-1 rounded-md border"
                    style={{ backgroundColor: backgroundColor }}
                  >
                    <span className="sr-only">{t('pickBackgroundColor')}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker color={backgroundColor} onChange={setBackgroundColor} />
                </PopoverContent>
              </Popover>
              
              <Input
                id="background-color"
                value={backgroundColor}
                onChange={(e) => handleColorInputChange(e, setBackgroundColor)}
                placeholder="#121212"
                className="flex-1"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button variant="outline" onClick={swapColors} className="py-2 px-4">
            <ChevronsUpDown className="mr-2 h-4 w-4" />
            {t('swapColors')}
          </Button>
        </div>
        
        <Separator />
        
        {/* Preview Area */}
        <div 
          className="p-8 flex items-center justify-center text-center rounded-md transition-colors"
          style={{ 
            backgroundColor: backgroundColor,
            color: foregroundColor
          }}
        >
          <div className="space-y-3">
            <h3 className="text-2xl font-bold">WCAG Contrast</h3>
            <p className="text-lg">
              {t('contrastRatio')}: {contrastRatio.toFixed(2)}:1
            </p>
          </div>
        </div>
        
        {/* Results Area */}
        {contrastRatio > 0 ? (
          <div className="space-y-6">
            {/* Contrast Results */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="mb-1 text-sm font-medium">{t('contrastRatio')}</p>
                    <p className="text-3xl font-bold">{contrastRatio.toFixed(2)}:1</p>
                  </div>
                  
                  <div className="col-span-2">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('level')}</TableHead>
                          <TableHead>{t('fontSize')}</TableHead>
                          <TableHead>{t('minimumRatio')}</TableHead>
                          <TableHead>{t('result')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {wcagLevels.flatMap((level, idx) => [
                          <TableRow key={`${idx}-small`}>
                            {idx === 0 && (
                              <TableCell rowSpan={2} className="align-middle">
                                {level.level}
                              </TableCell>
                            )}
                            <TableCell>{t('smallText')}</TableCell>
                            <TableCell>{level.smallText}:1</TableCell>
                            <TableCell>
                              <Badge variant={level.result.small ? "default" : "destructive"}>
                                {level.result.small ? t('yes') : t('no')}
                              </Badge>
                            </TableCell>
                          </TableRow>,
                          <TableRow key={`${idx}-large`}>
                            <TableCell>{t('largeText')}</TableCell>
                            <TableCell>{level.largeText}:1</TableCell>
                            <TableCell>
                              <Badge variant={level.result.large ? "default" : "destructive"}>
                                {level.result.large ? t('yes') : t('no')}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ])}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                
                {/* Suggestion for improvement */}
                {suggestion && (
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{t('suggestion')}: {suggestion}</AlertDescription>
                  </Alert>
                )}
                
                {/* Copy button */}
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copyResults}
                    disabled={copiedResults}
                  >
                    {copiedResults ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        {t('copied')}
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        {t('copyResults')}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{t('invalidColors')}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
} 