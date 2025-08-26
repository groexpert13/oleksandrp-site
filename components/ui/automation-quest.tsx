"use client"
/*
  Simplified Automation Quest
  Упрощённая версия без динамических вопросов, геймификации, summary, PDF, графиков.
  Оставлено только:
  - Базовые вопросы
  - Генерация возможностей (opportunities)
  - Выбор / снятие выбора
  - Расчёт payback
*/
import * as React from "react"
import { Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { QuestAnswer, Opportunity } from "@/lib/quest/schema"
import { useLanguage, useTranslation } from "@/lib/i18n/language-context"

type Question = { id: string; label: string; placeholder?: string; type?: "text" | "number" }
interface LocalOpportunity extends Opportunity { selected?: boolean }

export function AutomationQuestSection() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const QUESTIONS: Question[] = [
    { id: "teamSize", label: t("quest.questions.teamSize"), type: "number" },
    { id: "repetitiveHoursPerDay", label: t("quest.questions.repetitiveHoursPerDay"), type: "number" },
    { id: "manualReportsPerWeek", label: t("quest.questions.manualReportsPerWeek"), type: "number" },
    { id: "usesRpa", label: t("quest.questions.usesRpa"), type: "text", placeholder: language === 'uk' ? 'ні' : 'no' },
  ]
  const [answers, setAnswers] = React.useState<QuestAnswer[]>([])
  const [hourlyRate, setHourlyRate] = React.useState(30)
  const [implementationCost, setImplementationCost] = React.useState(3000)
  const [ops, setOps] = React.useState<LocalOpportunity[]>([])
  const [paybackMonths, setPaybackMonths] = React.useState<number | null>(null)
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [errorsMap, setErrorsMap] = React.useState<Record<string, boolean>>({})

  // Load persisted state
  React.useEffect(()=>{
    // Простое восстановление состояния (минимум)
    try {
      const raw = localStorage.getItem('automation-quest-simple')
      if (raw) {
        const saved = JSON.parse(raw)
        if (Array.isArray(saved.answers)) setAnswers(saved.answers)
        if (Array.isArray(saved.ops)) setOps(saved.ops)
        if (typeof saved.hourlyRate === 'number') setHourlyRate(saved.hourlyRate)
        if (typeof saved.implementationCost === 'number') setImplementationCost(saved.implementationCost)
      }
    } catch {}
  },[])

  React.useEffect(()=>{
    try { localStorage.setItem('automation-quest-simple', JSON.stringify({ answers, ops, hourlyRate, implementationCost })) } catch {}
  }, [answers, ops, hourlyRate, implementationCost])

  const updateAnswer = (q: Question, value: string) => {
    setAnswers(prev => {
      const next = prev.filter(a => a.id !== q.id)
      next.push({ id: q.id, question: q.label, value: value === "" ? "" : (q.type === "number" ? Number(value) : value) })
      return next
    })
    if (q.type === 'number') {
      const num = Number(value)
      setErrorsMap(m => ({ ...m, [q.id]: value !== '' && (!Number.isFinite(num) || num < 0) }))
    }
  }

  const getNumeric = (id: string): number | undefined => {
    const a = answers.find(a=>a.id===id)
    if (!a) return undefined
    const n = Number(a.value)
    return Number.isFinite(n) ? n : undefined
  }

  const derived = React.useMemo(()=>{
    const teamSize = getNumeric('teamSize') || 0
    const hoursPerDay = getNumeric('repetitiveHoursPerDay') || 0
    const manualReports = getNumeric('manualReportsPerWeek') || 0
    const baselineHours = teamSize * hoursPerDay * 21 + manualReports * 0.5
    return { baselineHours }
  }, [answers])

  const toggleSelect = (id: string) => setOps(prev => prev.map(o => o.id === id ? { ...o, selected: !o.selected } : o))

  const generate = async () => {
    setLoading(true)
    setError(null)
    try {
  const res = await fetch("/api/quest/opportunities", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answers, hourlyRate, locale: language }) })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Generation failed")
      const enriched: LocalOpportunity[] = json.opportunities.map((o: Opportunity) => ({ ...o, selected: false }))
      setOps(enriched)
    } catch (e:any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(()=>{
    const monthly = ops.filter(o=>o.selected).reduce((s,o)=> s + (o.monthlySavings||0),0)
    if (monthly>0) setPaybackMonths(Math.max(1, Math.ceil(implementationCost / monthly)))
    else setPaybackMonths(null)
  }, [ops, implementationCost])

  // Если язык сменился и уже есть идеи — попытаться перегенерировать на новом языке
  React.useEffect(()=>{
    if (ops.length>0) {
      generate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])
  // Убраны: next question, summary, export, ROI transfer, mini chart

  return (
    <Section id="quest" background="muted">
      <SectionHeader title={t("quest.title")} subtitle={t("quest.subtitle")} />
      <div className="grid gap-5 lg:grid-cols-2 overflow-x-hidden">
        <Card className="h-fit order-2 lg:order-1">
          <CardContent className="p-3 sm:p-4 space-y-4">
            <div className="grid gap-3">
              {QUESTIONS.map(q => (
                <div key={q.id} className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground" htmlFor={q.id}>{q.label}</label>
                  <Input id={q.id} type={q.type === 'number' ? 'number' : 'text'} placeholder={q.placeholder} onChange={e=>updateAnswer(q, e.target.value)} />
                </div>
              ))}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground" htmlFor="hourlyRate">{t('quest.hourlyRate')}</label>
                <Input id="hourlyRate" type="number" value={hourlyRate} onChange={e=>{ const v=Number(e.target.value); setHourlyRate(Math.max(0,v||0)) }} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground" htmlFor="implementationCost">{t('quest.implCost')}</label>
                <Input id="implementationCost" type="number" value={implementationCost} onChange={e=>{ const v=Number(e.target.value); setImplementationCost(Math.max(0,v||0)) }} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Button size="sm" onClick={generate} disabled={loading} className="flex-1 min-w-[140px]">{loading? t('quest.generating') : t('quest.generate')}</Button>
              {ops.some(o=>o.selected) && paybackMonths && (
                <div className="text-[11px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-600 flex items-center gap-1">
                  <Lightbulb className="h-3 w-3" /> {t('quest.payback')}: <span className="font-semibold">{paybackMonths}m</span>
                </div>
              )}
              {ops.some(o=>o.selected) && (
                <Button size="sm" variant="outline" onClick={()=>{ const el=document.getElementById('contact'); if(el) el.scrollIntoView({behavior:'smooth'}) }}>
                  {t('quest.ctaSelected')}
                </Button>
              )}
            </div>
            {error && <div className="text-xs text-destructive bg-destructive/10 border p-2 rounded">{error}</div>}
            <div className="text-[11px] text-muted-foreground flex flex-wrap gap-4">
              <span>{t('quest.baseline')}≈{derived.baselineHours || 0}{t('quest.hoursPerMonthShort')}</span>
              {ops.some(o=>o.selected) && <span>{t('quest.selected')}: {ops.filter(o=>o.selected).length}</span>}
              {ops.some(o=>o.selected) && <span>{t('quest.totalPerMonth')} ≈ {ops.filter(o=>o.selected).reduce((s,o)=> s+(o.monthlySavings||0),0)}</span>}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4 order-1 lg:order-2">
          {ops.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-muted-foreground text-sm">{t('quest.noIdeas')}</div>
              </CardContent>
            </Card>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {ops.map(o => {
              const impactPct = derived.baselineHours>0 ? Math.min(100, Math.round(((o.estHoursSaved||0)*(o.automationShare||0))/Math.max(1,derived.baselineHours)*100)) : 0
              return (
                <Card key={o.id} className={`transition-colors ${o.selected? 'border-emerald-500 bg-emerald-50/10':'hover:border-primary/40'}`}> 
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between gap-3">
                      <div className="flex-1">
                        <div className="font-semibold text-sm leading-snug line-clamp-2">{o.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-3 mt-1">{o.description}</div>
                      </div>
                      <Button size="sm" variant={o.selected? 'default':'outline'} onClick={()=>toggleSelect(o.id)} className="text-xs h-7">{o.selected? t('quest.remove'): t('quest.add')}</Button>
                    </div>
                    <div className="flex flex-wrap gap-3 text-[10px] font-medium text-muted-foreground">
                      <span>{t('quest.hoursPerMonthShort')} {o.estHoursSaved}</span>
                      <span>{t('quest.shareShort')} {(o.automationShare*100).toFixed(0)}%</span>
                      <span>{t('quest.complexityShort')} {o.complexity}</span>
                      <span>{t('quest.confidenceShort')} {(o.confidence*100).toFixed(0)}%</span>
                      {typeof o.monthlySavings==='number' && <span className="text-primary">${o.monthlySavings}{t('quest.perMonthShort')}</span>}
                    </div>
                    {o.selected && (
                      <Button variant="secondary" size="sm" className="h-6 px-2 text-[10px]" onClick={()=>{ const el=document.getElementById('contact'); if(el) el.scrollIntoView({behavior:'smooth'}) }}>
                        {t('quest.ctaInline')}
                      </Button>
                    )}
                    {impactPct>0 && (
                      <div className="h-1.5 bg-muted rounded overflow-hidden">
                        <div className="h-full bg-primary/70" style={{ width: impactPct+'%' }} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
// End simplified component
