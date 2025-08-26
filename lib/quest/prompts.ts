// Centralized prompt templates for Automation Quest (en / uk agnostic with runtime language injection)
export const questPrompts = {
  opportunities: ({ locale }: { locale: string }) => `You generate exactly 3 HIGH-IMPACT automation opportunities as strict JSON. LANGUAGE: ${locale}.
Return ONLY raw JSON: {"opportunities":[{id,title,description,estHoursSaved,automationShare,complexity,confidence}]}
Constraints:
- No markdown, no comments, no labels.
- title: <=8 words, description: <=30 words, value oriented.
- estHoursSaved: integer monthly realistic.
- automationShare: 0..1 (likely percent automatable).
- complexity: 1 (very easy) .. 5 (hard) include at least one low (<=2) and one >=3.
- confidence: 0..1 (heuristic certainty).
Selection heuristic: maximize (estHoursSaved * automationShare * confidence / (complexity^1.2)). Include: (a) quick win, (b) scalable medium, (c) strategic higher complexity if ROI strong.`,
  opportunitiesUser: (compactAnswers: any) => `Answers JSON: ${JSON.stringify(compactAnswers)}\nIf info missing, infer typical SMB defaults. Provide diverse set (one quick win, one medium, one strategic). Schema keys: id (kebab-case), title, description, estHoursSaved, automationShare, complexity, confidence.`,
  nextQuestionSystem: ({ locale }: { locale: string }) => `You are an adaptive questionnaire engine. OUTPUT: raw JSON {"question": {"id":"...","label":"...","type":"number|text","placeholder":"...","rationale":"..."}} ONLY.
Language: ${locale}.
Policy:
1. Max reduce uncertainty in automation savings & payback.
2. Prefer quantitative variables first.
3. Avoid duplicate id.
4. label < 70 chars, rationale <=12 words.
5. If core metrics covered, ask scoping / quality (error rate, SLA, variance).`,
  nextQuestionUser: (answers:any)=> `Existing answers: ${JSON.stringify(answers)}\nReturn NEW question only or fallback if nothing valuable left.`,
  summarySystem: ({ lang }: { lang: string }) => `Produce concise actionable automation ROI progress digest. Language: ${lang}.
FORMAT: 4-5 bullet lines starting with a dash '- '. EACH line <= 140 chars.
Order: (1) Current potential & selected ops (2) Est monthly savings & payback (3) Gap vs target (4) Top leverage action (5) Optional risk.
If target achieved: say so & next strategic step.
Tone: professional, clear, no hype. Plain text only.`,
  summaryUser: (payload: { answers: any; opportunities: any; implementationCost?: number; paybackMonths?: number; targetPayback?: number }) => `Answers: ${JSON.stringify(payload.answers)}\nSelected opportunities: ${JSON.stringify(payload.opportunities)}\nImplementationCost: ${payload.implementationCost}\nCurrentPaybackMonths: ${payload.paybackMonths}\nTargetPayback: ${payload.targetPayback}\nReturn ONLY bullet lines.`
} as const

export type QuestPromptKey = keyof typeof questPrompts
