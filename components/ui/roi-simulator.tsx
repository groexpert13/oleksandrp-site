"use client"
import * as React from "react"
import { BrainCircuit } from "lucide-react"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useTranslation, useLanguage } from "@/lib/i18n/language-context"

type SimResult = {
  monthlySavings: number
  paybackMonths: number
  series: { month: number; cumulative: number }[]
  narrative?: string
}

export function RoiSimulatorSection() {
  const { t } = useTranslation()
  const { language } = useLanguage()
  const [hoursPerMonth, setHoursPerMonth] = React.useState(80)
  const [hourlyRate, setHourlyRate] = React.useState(30)
  const [automationShare, setAutomationShare] = React.useState(0.5)
  const [implementationCost, setImplementationCost] = React.useState(3000)
  const [months, setMonths] = React.useState(12)
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<SimResult | null>(null)

  const formatCurrency = React.useCallback((n: number) => {
    try {
      // Heuristic: if site language is "uk" use UAH, otherwise USD
      const lang = (navigator.language || "en").toLowerCase()
      const currency = lang.startsWith("uk") ? "UAH" : "USD"
      return new Intl.NumberFormat(lang.startsWith("uk") ? "uk" : "en", { style: "currency", currency, maximumFractionDigits: 0 }).format(n)
    } catch {
      return `$${Math.round(n).toLocaleString()}`
    }
  }, [])

  const simulate = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/roi/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hoursPerMonth, hourlyRate, automationShare, implementationCost, months, narrative: true, locale: language }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Simulation error")
      setData(json)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const exportPdf = async () => {
    if (!data) return
    try {
      const res = await fetch("/api/roi/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: { hoursPerMonth, hourlyRate, automationShare, implementationCost, months }, result: data }),
      })
      if (!res.ok) {
        let detail = "Export failed"
        try { const j = await res.json(); detail = j?.error || j?.detail || detail } catch {}
        throw new Error(detail)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "roi-report.pdf"
      a.click()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
    }
  }

  React.useEffect(() => {
    const applyInitial = () => {
      try {
        const raw = localStorage.getItem('automation-quest-state')
        if (raw) {
          const saved = JSON.parse(raw)
          if (Array.isArray(saved.ops)) {
            const selected = saved.ops.filter((o:any)=>o.selected)
            const totalHours = selected.reduce((s:number,o:any)=> s + (o.estHoursSaved||0)* (o.automationShare||0),0)
            if (totalHours > 0) setHoursPerMonth(Math.min(400, Math.round(totalHours)))
            if (typeof saved.hourlyRate === 'number') setHourlyRate(saved.hourlyRate)
            if (typeof saved.implementationCost === 'number') setImplementationCost(saved.implementationCost)
          }
        }
        const transferRaw = localStorage.getItem('automation-quest-transfer')
        if (transferRaw) {
          const tr = JSON.parse(transferRaw)
          if (typeof tr.baselineHours === 'number' && tr.baselineHours > 0 && typeof tr.refinedAutomationShare === 'number') {
            setHoursPerMonth(Math.min(400, Math.round(tr.baselineHours)))
            setAutomationShare(Math.min(1, Math.max(0, tr.refinedAutomationShare)))
          }
          if (typeof tr.hourlyRate === 'number') setHourlyRate(tr.hourlyRate)
          if (typeof tr.implementationCost === 'number') setImplementationCost(tr.implementationCost)
          localStorage.removeItem('automation-quest-transfer')
        }
      } catch {}
    }
    applyInitial()
    simulate()
    const handler = () => { applyInitial(); simulate() }
    window.addEventListener('automation-quest-transfer', handler as EventListener)
    return ()=> window.removeEventListener('automation-quest-transfer', handler as EventListener)
    // язык в зависимостях, чтобы пересчитать при смене
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  return (
    <Section id="roi" background="default">
      <SectionHeader title={t("roi.title")} subtitle={t("roi.subtitle")} />
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2 xl:grid-cols-5">
        <div className="lg:col-span-1 xl:col-span-2">
        <Card className="h-fit">
          <CardContent className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-5">
            <div>
              <label className="text-xs sm:text-sm text-muted-foreground font-medium">{t("roi.hoursPerMonth")}</label>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-3 items-center">
                <Slider min={0} max={400} value={[hoursPerMonth]} onValueChange={(v)=>setHoursPerMonth(Array.isArray(v)? v[0] : hoursPerMonth)} className="order-2 sm:order-1" />
                <Input type="number" value={hoursPerMonth} onChange={(e)=>setHoursPerMonth(Math.max(0, Number(e.target.value)||0))} className="w-full sm:w-24 order-1 sm:order-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm text-muted-foreground font-medium">{t("roi.hourlyRate")}</label>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-3 items-center">
                <Slider min={0} max={200} value={[hourlyRate]} onValueChange={(v)=>setHourlyRate(Array.isArray(v)? v[0] : hourlyRate)} className="order-2 sm:order-1" />
                <Input type="number" value={hourlyRate} onChange={(e)=>setHourlyRate(Math.max(0, Number(e.target.value)||0))} className="w-full sm:w-24 order-1 sm:order-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm text-muted-foreground font-medium">{t("roi.automationShare")}: <span className="text-primary font-semibold">{(automationShare*100).toFixed(0)}%</span></label>
              <div className="mt-2">
                <Slider min={0} max={100} value={[automationShare*100]} onValueChange={(v)=>setAutomationShare((Array.isArray(v)? v[0] : 0)/100)} />
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm text-muted-foreground font-medium">{t("roi.implementationCost")}</label>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-3 items-center">
                <Slider min={0} max={50000} value={[implementationCost]} onValueChange={(v)=>setImplementationCost(Array.isArray(v)? v[0] : implementationCost)} className="order-2 sm:order-1" />
                <Input type="number" value={implementationCost} onChange={(e)=>setImplementationCost(Math.max(0, Number(e.target.value)||0))} className="w-full sm:w-32 order-1 sm:order-2 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs sm:text-sm text-muted-foreground font-medium">{t("roi.months")}</label>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 sm:gap-3 items-center">
                <Slider min={3} max={36} value={[months]} onValueChange={(v)=>setMonths(Array.isArray(v)? v[0] : months)} className="order-2 sm:order-1" />
                <Input type="number" value={months} onChange={(e)=>setMonths(Math.max(1, Number(e.target.value)||12))} className="w-full sm:w-20 order-1 sm:order-2 text-sm" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
              <Button onClick={simulate} disabled={loading} size="sm" className="flex-1">{loading ? t("roi.calculating") : t("roi.calculate")}</Button>
              <Button variant="outline" onClick={exportPdf} disabled={!data} size="sm" className="flex-1 sm:flex-none">{t("roi.exportPdf")}</Button>
            </div>
          </CardContent>
        </Card>
        </div>

        <div className="lg:col-span-1 xl:col-span-3 space-y-3 sm:space-y-4">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-xs text-muted-foreground mb-1">{t("roi.monthlySavings")}</div>
                  <div className="text-xl sm:text-2xl font-bold text-primary">{data ? formatCurrency(data.monthlySavings) : "—"}</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-xs text-muted-foreground mb-1">{t("roi.payback")}</div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-600">{data ? `${data.paybackMonths} ${t("roi.monthsShort")}` : "—"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 sm:p-4 md:p-6">
              <div className="mb-3">
                <h3 className="text-sm font-medium text-muted-foreground">{t("roi.cumulative")}</h3>
              </div>
              <ChartContainer id="roi" config={{ savings: { label: t("roi.cumulative"), color: "hsl(var(--chart-1))" }}} className="h-[200px] sm:h-[300px]">
                <AreaChart data={(data?.series || []).map(s => ({ month: s.month, savings: s.cumulative }))}>
                  <defs>
                    <linearGradient id="fillSavings" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.3} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis tickLine={false} axisLine={false} className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area type="monotone" dataKey="savings" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#fillSavings)" />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {data?.narrative && (
            <Card className="border-muted">
              <CardContent className="p-4 sm:p-5 space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <BrainCircuit className="h-4 w-4" />
                  <span className="font-medium text-sm uppercase tracking-wide">{t("roi.aiAnalysis")}</span>
                </div>
                <div className="text-sm whitespace-pre-wrap leading-relaxed text-muted-foreground">{data.narrative}</div>
                <div className="rounded-md bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-primary mb-1">{t('roi.ctaTitle')}</p>
                  </div>
                  <Button size="sm" className="shrink-0" onClick={()=>{
                    const el = document.getElementById('contact'); if (el) el.scrollIntoView({ behavior: 'smooth'});
                  }}>{t('roi.ctaButton')}</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Section>
  )
}


