"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Toast } from "@/components/ui/toast";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Check, Copy, Info, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TranslationKey } from "@/lib/i18n/translations";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

// Types based on conventional-commits-parser output
interface CommitNote {
  title: string;
  text: string;
}

interface CommitReference {
  action: string;
  owner: string | null;
  repository: string | null;
  issue: string;
  raw: string;
  prefix: string;
}

interface ParsedCommit {
  type: string | null;
  scope: string | null;
  subject: string | null;
  header: string | null;
  body: string | null;
  footer: string | null;
  notes: CommitNote[];
  references: CommitReference[];
  mentions: string[];
  merge: any;
  revert: any;
  raw?: string;
}

interface LintError {
  message: string;
  position: string; // e.g. "type", "scope", "subject"
  fix?: string;
}

export function CommitMessageLinter() {
  const { t: tRaw } = useLanguage();
  const t = useMemo(() => (key: string) => tRaw(key as TranslationKey), [tRaw]);
  const { toast } = useToast();
  
  const [commitMessage, setCommitMessage] = useState("");
  const [parsedCommit, setParsedCommit] = useState<ParsedCommit | null>(null);
  const [loading, setLoading] = useState(false);
  const [lintErrors, setLintErrors] = useState<LintError[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Common commit types with descriptions
  const commitTypes = useMemo(() => [
    { value: "feat", label: "feat", description: t('commitTypeFeat') },
    { value: "fix", label: "fix", description: t('commitTypeFix') },
    { value: "docs", label: "docs", description: t('commitTypeDocs') },
    { value: "style", label: "style", description: t('commitTypeStyle') },
    { value: "refactor", label: "refactor", description: t('commitTypeRefactor') },
    { value: "perf", label: "perf", description: t('commitTypePerf') },
    { value: "test", label: "test", description: t('commitTypeTest') },
    { value: "build", label: "build", description: t('commitTypeBuild') },
    { value: "ci", label: "ci", description: t('commitTypeCi') },
    { value: "chore", label: "chore", description: t('commitTypeChore') }
  ], [t]);

  // Example messages for different commit types
  const exampleMessages = {
    feat: "feat(user): add login functionality",
    fix: "fix(api): resolve connection timeout issue",
    docs: "docs: update README with new API documentation",
    style: "style(button): improve button hover states",
    refactor: "refactor(auth): simplify authentication logic",
    perf: "perf(images): optimize image loading",
    test: "test(api): add unit tests for user controller",
    build: "build: update webpack configuration",
    ci: "ci: add GitHub Actions workflow",
    chore: "chore: update dependencies"
  };

  // Parse and lint the commit message
  useEffect(() => {
    if (!commitMessage.trim()) {
      setParsedCommit(null);
      setLintErrors([]);
      return;
    }
    
    try {
      const parsed = parseCommit(commitMessage);
      setParsedCommit(parsed);
      
      // Lint the commit
      const errors: LintError[] = [];
      
      // Check type
      if (!parsed.type) {
        errors.push({
          message: t('lintErrorMissingType'),
          position: 'type',
          fix: t('lintFixAddValidType')
        });
      } else if (!commitTypes.some(ct => ct.value === parsed.type)) {
        errors.push({
          message: t('lintErrorInvalidType'),
          position: 'type',
          fix: t('lintFixUseValidType')
        });
      }
      
      // Check subject
      if (!parsed.subject) {
        errors.push({
          message: t('lintErrorMissingSubject'),
          position: 'subject',
          fix: t('lintFixAddSubject')
        });
      } else if (parsed.subject.charAt(0).toUpperCase() === parsed.subject.charAt(0)) {
        errors.push({
          message: t('lintErrorCapitalSubject'),
          position: 'subject',
          fix: t('lintFixLowercaseSubject')
        });
      } else if (parsed.subject.endsWith('.')) {
        errors.push({
          message: t('lintErrorSubjectPeriod'),
          position: 'subject',
          fix: t('lintFixRemovePeriod')
        });
      }
      
      // Check header format
      if (parsed.header && !parsed.type) {
        errors.push({
          message: t('lintErrorInvalidFormat'),
          position: 'header',
          fix: t('lintFixUseFormat')
        });
      }
      
      setLintErrors(errors);
    } catch (error) {
      console.error("Error parsing commit message:", error);
      setParsedCommit(null);
      setLintErrors([{
        message: t('lintErrorParsingFailed'),
        position: 'general'
      }]);
    }
  }, [commitMessage]);

  // Handle type selection from dropdown
  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    
    // If we have an existing message, try to preserve parts of it
    if (commitMessage) {
      // Check if we already have a conventional commit format
      const headerPattern = /^(\w*)(?:\(([\w$.-]*)+\))?(!)?: (.+)$/;
      const match = commitMessage.match(headerPattern);
      
      if (match) {
        // Preserve scope and subject
        const scope = match[2] || "";
        const hasBreaking = match[3] || "";
        const subject = match[4] || "";
        
        if (scope) {
          setCommitMessage(`${type}(${scope})${hasBreaking}: ${subject}`);
        } else {
          setCommitMessage(`${type}${hasBreaking}: ${subject}`);
        }
      } else {
        // If no match, just replace the first word or use the message as subject
        setCommitMessage(`${type}: ${commitMessage}`);
      }
    } else {
      // If no message yet, start with the type
      setCommitMessage(`${type}: `);
    }
  };

  // Create an example commit based on selected type
  const insertExample = () => {
    const exampleType = selectedType || "feat";
    setCommitMessage(exampleMessages[exampleType as keyof typeof exampleMessages] || exampleMessages.feat);
  };

  // Copy the commit message to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(commitMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TooltipProvider>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t('commitMessageLinter')}</CardTitle>
          <CardDescription>
            {t('commitMessageLinterDescription')}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {/* Commit Type Selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t('commitType')} <span className="ml-1 text-destructive">*</span>
                </label>
                <div className="flex gap-2 flex-wrap">
                  <Select value={selectedType} onValueChange={handleTypeSelect}>
                    <SelectTrigger className="w-56 max-w-full">
                      <SelectValue placeholder={t('selectCommitType')} />
                    </SelectTrigger>
                    <SelectContent>
                      {commitTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center">
                            <span className="font-mono">{type.label}</span>
                            <span className="ml-2 text-muted-foreground text-xs">- {type.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" onClick={insertExample} disabled={!selectedType} className="whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed">
                    {t('insertExample')}
                  </Button>
                </div>
              </div>
              
              {/* Commit Message Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">{t('commitMessage')}</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyToClipboard}
                    disabled={lintErrors.length > 0}
                    className="h-8 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                    {copied ? t('copied') : t('copy')}
                  </Button>
                </div>
                
                <Textarea
                  placeholder={t('commitMessagePlaceholder')}
                  className="min-h-[120px] font-mono"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                />
              </div>
              
              {/* Format Guide */}
              <Alert variant="default" className="bg-muted/50">
                <Info className="h-4 w-4" />
                <AlertTitle>{t('commitFormatGuide')}</AlertTitle>
                <AlertDescription>
                  <code className="text-xs sm:text-sm">
                    type(scope): subject
                  </code>
                  <div className="text-xs text-muted-foreground mt-1">
                    {t('commitFormatGuideDescription')}
                  </div>
                </AlertDescription>
              </Alert>
              
              {/* Validation Results */}
              <Tabs defaultValue="validation" className="w-full">
                <TabsList>
                  <TabsTrigger value="validation">
                    {t('validation')}
                    {lintErrors.length > 0 && (
                      <Badge variant="destructive" className="ml-2">{lintErrors.length}</Badge>
                    )}
                  </TabsTrigger>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <TabsTrigger value="parsed">{t('parsedOutput')}</TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent>{t('tooltipParsedOutput')}</TooltipContent>
                  </Tooltip>
                </TabsList>
                
                <TabsContent value="validation" className="space-y-4 pt-4">
                  {lintErrors.length > 0 ? (
                    <div className="space-y-3">
                      {lintErrors.map((error, index) => (
                        <Alert key={index} variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>
                            {error.position !== 'general' ? (
                              <span className="font-mono text-sm">&lt;{error.position}&gt;</span>
                            ) : null} {error.message}
                          </AlertTitle>
                          {error.fix && (
                            <AlertDescription className="mt-2">
                              <strong>{t('fix')}:</strong> {error.fix}
                            </AlertDescription>
                          )}
                        </Alert>
                      ))}
                    </div>
                  ) : (
                    commitMessage ? (
                      <Alert className="bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300">
                        <Check className="h-4 w-4" />
                        <AlertTitle>{t('validCommitMessage')}</AlertTitle>
                        <AlertDescription>
                          {t('commitValidationSuccess')}
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div className="text-center text-muted-foreground py-4">
                        {t('enterCommitMessage')}
                      </div>
                    )
                  )}
                </TabsContent>
                
                <TabsContent value="parsed" className="pt-4">
                  {parsedCommit ? (
                    <div className="space-y-4 text-sm">
                      <div className="grid grid-cols-[1fr_3fr] gap-2">
                        {/* Type */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="font-medium flex items-center">
                              {t('type')} <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{t('tooltipType')}</TooltipContent>
                        </Tooltip>
                        <div className="font-mono">{parsedCommit.type || '-'}</div>

                        {/* Scope */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="font-medium flex items-center">
                              {t('scope')} <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{t('tooltipScope')}</TooltipContent>
                        </Tooltip>
                        <div className="font-mono">{parsedCommit.scope || '-'}</div>

                        {/* Subject */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="font-medium flex items-center">
                              {t('subject')} <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{t('tooltipSubject')}</TooltipContent>
                        </Tooltip>
                        <div className="font-mono">{parsedCommit.subject || '-'}</div>

                        {/* Body */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="font-medium flex items-center">
                              {t('body')} <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{t('tooltipBody')}</TooltipContent>
                        </Tooltip>
                        <div className="font-mono whitespace-pre-wrap">{parsedCommit.body || '-'}</div>

                        {/* Footer */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="font-medium flex items-center">
                              {t('footer')} <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{t('tooltipFooter')}</TooltipContent>
                        </Tooltip>
                        <div className="font-mono whitespace-pre-wrap">{parsedCommit.footer || '-'}</div>

                        {/* Breaking Changes */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="font-medium flex items-center">
                              {t('breaking')} <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{t('tooltipBreaking')}</TooltipContent>
                        </Tooltip>
                        <div>
                          {parsedCommit.notes.length > 0 ? parsedCommit.notes.map((note, i) => (
                            <Badge key={i} variant="destructive" className="mr-2">
                              {note.title}: {note.text}
                            </Badge>
                          )) : '-'}
                        </div>

                        {/* References */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="font-medium flex items-center">
                              {t('references')} <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{t('tooltipReferences')}</TooltipContent>
                        </Tooltip>
                        <div>
                          {parsedCommit.references.length > 0 ? parsedCommit.references.map((ref, i) => (
                            <Badge key={i} variant="secondary" className="mr-2">
                              {ref.action} {ref.raw}
                            </Badge>
                          )) : '-'}
                        </div>

                        {/* Mentions */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="font-medium flex items-center">
                              {t('mentions')} <Info className="ml-1 h-4 w-4 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{t('tooltipMentions')}</TooltipContent>
                        </Tooltip>
                        <div>
                          {parsedCommit.mentions.length > 0 ? parsedCommit.mentions.map((mention, i) => (
                            <Badge key={i} variant="outline" className="mr-2">
                              @{mention}
                            </Badge>
                          )) : '-'}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-4">
                      {t('noCommitToParse')}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

function parseCommit(message: string): ParsedCommit {
  const headerPattern = /^(\w*)(?:\(([\w$.-]*)+\))?(!)?: (.+)$/;
  const footerPattern = /^(?:BREAKING CHANGE|BREAKING-CHANGE):\s+(.*)$/m;
  let parsed: ParsedCommit = {
    type: null,
    scope: null,
    subject: null,
    header: null,
    body: null,
    footer: null,
    notes: [],
    references: [],
    mentions: [],
    merge: null,
    revert: null,
    raw: message
  };
  const lines = message.split('\n');
  const header = lines[0];
  // Parse header
  const headerMatch = header.match(headerPattern);
  if (headerMatch) {
    parsed.type = headerMatch[1] || null;
    parsed.scope = headerMatch[2] || null;
    const hasBreaking = !!headerMatch[3];
    parsed.subject = headerMatch[4] || null;
    parsed.header = header;
    if (hasBreaking) {
      parsed.notes.push({
        title: 'BREAKING CHANGE',
        text: 'Introduced via ! in the header'
      });
    }
  }
  // Look for body and footer
  if (lines.length > 1) {
    let bodyStart = 1;
    while (bodyStart < lines.length && !lines[bodyStart].trim()) {
      bodyStart++;
    }
    let footerStart = lines.length;
    for (let i = bodyStart; i < lines.length; i++) {
      if (footerPattern.test(lines[i])) {
        footerStart = i;
        break;
      }
    }
    if (bodyStart < footerStart) {
      parsed.body = lines.slice(bodyStart, footerStart).join('\n').trim();
    }
    if (footerStart < lines.length) {
      parsed.footer = lines.slice(footerStart).join('\n').trim();
      const breakingMatch = parsed.footer.match(footerPattern);
      if (breakingMatch) {
        parsed.notes.push({
          title: 'BREAKING CHANGE',
          text: breakingMatch[1]
        });
      }
    }
  }
  // Extract mentions like @username
  const mentionRegex = /(?:^|\s)@([\w-]+)/g;
  let mentionMatch;
  while ((mentionMatch = mentionRegex.exec(message)) !== null) {
    parsed.mentions.push(mentionMatch[1]);
  }
  // Extract references like #123
  const refRegex = /(?:close[sd]?|fix(?:e[sd])?|resolve[sd]?)\s+#(\d+)/gi;
  let refMatch;
  while ((refMatch = refRegex.exec(message)) !== null) {
    const action = refMatch[0].split(/\s+/)[0];
    parsed.references.push({
      action,
      owner: null,
      repository: null,
      issue: refMatch[1],
      raw: refMatch[0],
      prefix: '#'
    });
  }
  return parsed;
} 