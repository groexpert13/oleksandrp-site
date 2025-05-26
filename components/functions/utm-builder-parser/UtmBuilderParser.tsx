"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Check, Copy, ArrowRight, Eraser, ChevronDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function UtmBuilderParser() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("builder");
  
  // Builder state
  const [baseUrl, setBaseUrl] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [utmTerm, setUtmTerm] = useState("");
  const [utmContent, setUtmContent] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [customSource, setCustomSource] = useState<string | null>(null);
  const [customMedium, setCustomMedium] = useState<string | null>(null);
  const [customCampaign, setCustomCampaign] = useState<string | null>(null);

  // Parser state
  const [urlToParse, setUrlToParse] = useState("");
  const [parsedParams, setParsedParams] = useState<Record<string, string>>({});

  // Predefined options
  const sourceOptions = ["google", "facebook", "instagram", "telegram", "tiktok", "linkedin", "twitter", "youtube", "email", "newsletter", "direct", "organic", "referral", "site"];
  const mediumOptions = ["cpc", "organic", "social", "email", "referral", "display", "banner", "push", "sms", "video", "audio", "affiliate", "qr"];
  const campaignOptions = ["brand", "product_launch", "sale", "discount", "seasonal", "webinar", "event", "newsletter", "remarketing", "partnership"];

  // Fix URL formatting - add http/https if missing
  const fixUrl = (url: string): string => {
    if (!url) return url;

    // If it doesn't start with http:// or https://, add https://
    if (!/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }
    
    return url;
  };

  // Generate UTM link based on inputs
  const generateUtmLink = () => {
    try {
      // Fix URL format before creating URL object
      const fixedUrl = fixUrl(baseUrl);
      const url = new URL(fixedUrl);
      
      // Add UTM parameters if they have values
      if (utmSource) url.searchParams.set("utm_source", utmSource);
      if (utmMedium) url.searchParams.set("utm_medium", utmMedium);
      if (utmCampaign) url.searchParams.set("utm_campaign", utmCampaign);
      if (utmTerm) url.searchParams.set("utm_term", utmTerm);
      if (utmContent) url.searchParams.set("utm_content", utmContent);
      
      setGeneratedUrl(url.toString());
    } catch (error) {
      setGeneratedUrl(t('invalidUrl'));
    }
  };

  // Reset builder form
  const resetBuilderForm = () => {
    setBaseUrl("");
    setUtmSource("");
    setUtmMedium("");
    setUtmCampaign("");
    setUtmTerm("");
    setUtmContent("");
    setGeneratedUrl("");
    setCustomSource(null);
    setCustomMedium(null);
    setCustomCampaign(null);
  };

  // Copy generated URL to clipboard
  const copyToClipboard = () => {
    if (generatedUrl && generatedUrl !== t('invalidUrl')) {
      navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Parse URL and extract UTM parameters
  const parseUtmUrl = () => {
    try {
      const fixedUrl = fixUrl(urlToParse);
      const url = new URL(fixedUrl);
      const params: Record<string, string> = {};
      
      // Extract all UTM parameters
      url.searchParams.forEach((value, key) => {
        if (key.startsWith("utm_")) {
          params[key] = value;
        }
      });
      
      setParsedParams(params);
    } catch (error) {
      setParsedParams({ error: t('invalidUrl') });
    }
  };

  // Reset parser form
  const resetParserForm = () => {
    setUrlToParse("");
    setParsedParams({});
  };

  // Handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Handle custom entries for UTM parameters
  const handleCustomSource = (value: string) => {
    if (value === "custom") {
      setCustomSource("");
      setUtmSource("");
      setTimeout(() => document.getElementById('custom-source')?.focus(), 100);
    } else {
      setCustomSource(null);
      setUtmSource(value);
    }
  };

  const handleCustomMedium = (value: string) => {
    if (value === "custom") {
      setCustomMedium("");
      setUtmMedium("");
      setTimeout(() => document.getElementById('custom-medium')?.focus(), 100);
    } else {
      setCustomMedium(null);
      setUtmMedium(value);
    }
  };

  const handleCustomCampaign = (value: string) => {
    if (value === "custom") {
      setCustomCampaign("");
      setUtmCampaign("");
      setTimeout(() => document.getElementById('custom-campaign')?.focus(), 100);
    } else {
      setCustomCampaign(null);
      setUtmCampaign(value);
    }
  };

  // Custom components for selects with custom input option
  const SourceSelect = () => (
    <div className="space-y-2">
      <Label htmlFor="utm-source">{t('utmSource')} *</Label>
      {customSource !== null ? (
        <div className="flex gap-2">
          <Input
            id="custom-source"
            value={customSource}
            onChange={(e) => {
              setCustomSource(e.target.value);
              setUtmSource(e.target.value);
            }}
            placeholder={t('customValue')}
          />
          <Button 
            variant="outline" 
            onClick={() => {
              setCustomSource(null);
              setUtmSource("");
            }}
            size="sm"
          >
            <Eraser className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Select onValueChange={handleCustomSource}>
          <SelectTrigger>
            <SelectValue placeholder={t('selectOrEnterSource')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom" className="font-semibold text-accent">
              {t('customValue')}
            </SelectItem>
            <SelectSeparator />
            {sourceOptions.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );

  const MediumSelect = () => (
    <div className="space-y-2">
      <Label htmlFor="utm-medium">{t('utmMedium')} *</Label>
      {customMedium !== null ? (
        <div className="flex gap-2">
          <Input
            id="custom-medium"
            value={customMedium}
            onChange={(e) => {
              setCustomMedium(e.target.value);
              setUtmMedium(e.target.value);
            }}
            placeholder={t('customValue')}
          />
          <Button 
            variant="outline" 
            onClick={() => {
              setCustomMedium(null);
              setUtmMedium("");
            }}
            size="sm"
          >
            <Eraser className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Select onValueChange={handleCustomMedium}>
          <SelectTrigger>
            <SelectValue placeholder={t('selectOrEnterMedium')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom" className="font-semibold text-accent">
              {t('customValue')}
            </SelectItem>
            <SelectSeparator />
            {mediumOptions.map((medium) => (
              <SelectItem key={medium} value={medium}>
                {medium}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );

  const CampaignSelect = () => (
    <div className="space-y-2">
      <Label htmlFor="utm-campaign">{t('utmCampaign')} *</Label>
      {customCampaign !== null ? (
        <div className="flex gap-2">
          <Input
            id="custom-campaign"
            value={customCampaign}
            onChange={(e) => {
              setCustomCampaign(e.target.value);
              setUtmCampaign(e.target.value);
            }}
            placeholder={t('customValue')}
          />
          <Button 
            variant="outline" 
            onClick={() => {
              setCustomCampaign(null);
              setUtmCampaign("");
            }}
            size="sm"
          >
            <Eraser className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Select onValueChange={handleCustomCampaign}>
          <SelectTrigger>
            <SelectValue placeholder={t('selectOrEnterCampaign')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom" className="font-semibold text-accent">
              {t('customValue')}
            </SelectItem>
            <SelectSeparator />
            {campaignOptions.map((campaign) => (
              <SelectItem key={campaign} value={campaign}>
                {campaign}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
      <Tabs defaultValue="builder" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="builder">{t('utmBuilder')}</TabsTrigger>
          <TabsTrigger value="parser">{t('utmParser')}</TabsTrigger>
        </TabsList>
        
        {/* Builder Tab */}
        <TabsContent value="builder">
          <Card>
            <CardHeader>
              <CardTitle>{t('createUtmLink')}</CardTitle>
              <CardDescription>{t('fillFieldsForUtm')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="base-url">{t('baseUrl')} *</Label>
                  <Input
                    id="base-url"
                    placeholder="example.com or https://example.com"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SourceSelect />
                  <MediumSelect />
                </div>
                
                <CampaignSelect />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="utm-term">{t('utmTerm')}</Label>
                    <Input
                      id="utm-term"
                      placeholder="running_shoes, blue_shirt"
                      value={utmTerm}
                      onChange={(e) => setUtmTerm(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="utm-content">{t('utmContent')}</Label>
                    <Input
                      id="utm-content"
                      placeholder="top_banner, footer_link"
                      value={utmContent}
                      onChange={(e) => setUtmContent(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={generateUtmLink}
                    disabled={!baseUrl || !utmSource || !utmMedium || !utmCampaign}
                    className="flex-1"
                  >
                    {t('generateLink')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={resetBuilderForm}>
                    <Eraser className="mr-2 h-4 w-4" /> {t('reset')}
                  </Button>
                </div>
                
                {generatedUrl && (
                  <div className="mt-4 p-4 bg-muted rounded-md space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>{t('generatedUtmLink')}</Label>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={copyToClipboard} 
                        className="h-8"
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="p-2 bg-background rounded-md border overflow-x-auto">
                      <code className="text-sm break-all">{generatedUrl}</code>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Parser Tab */}
        <TabsContent value="parser">
          <Card>
            <CardHeader>
              <CardTitle>{t('parseUtmLink')}</CardTitle>
              <CardDescription>{t('enterUtmLinkToAnalyze')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url-to-parse">{t('urlWithUtmParameters')}</Label>
                  <Input
                    id="url-to-parse"
                    placeholder="example.com/?utm_source=google&utm_medium=cpc"
                    value={urlToParse}
                    onChange={(e) => setUrlToParse(e.target.value)}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={parseUtmUrl}
                    disabled={!urlToParse}
                    className="flex-1"
                  >
                    {t('parseUrl')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" onClick={resetParserForm}>
                    <Eraser className="mr-2 h-4 w-4" /> {t('reset')}
                  </Button>
                </div>
                
                {Object.keys(parsedParams).length > 0 && (
                  <div className="mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('parameter')}</TableHead>
                          <TableHead>{t('value')}</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {parsedParams.error ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-muted-foreground">
                              {parsedParams.error}
                            </TableCell>
                          </TableRow>
                        ) : Object.keys(parsedParams).length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center text-muted-foreground">
                              {t('noUtmParametersFound')}
                            </TableCell>
                          </TableRow>
                        ) : (
                          Object.entries(parsedParams).map(([param, value]) => (
                            <TableRow key={param}>
                              <TableCell className="font-medium">{param}</TableCell>
                              <TableCell>{value}</TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => {
                                    navigator.clipboard.writeText(value);
                                  }}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 