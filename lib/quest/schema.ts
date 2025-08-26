// Basic types for Automation Quest MVP (Sprint 1)
export type QuestAnswer = {
  id: string
  question: string
  value: string | number | boolean
}

export type Opportunity = {
  id: string
  title: string
  description: string
  estHoursSaved: number // estimated hours saved per month
  automationShare: number // 0..1 (how much of the task can be automated)
  complexity: number // 1 (low) - 5 (high)
  confidence: number // 0..1
  monthlySavings?: number // derived on server using hourlyRate * estHoursSaved * automationShare
}

export type GenerateOpportunitiesRequest = {
  answers: QuestAnswer[]
  hourlyRate?: number
  locale?: string
}

export type GenerateOpportunitiesResponse = {
  opportunities: Opportunity[]
  model?: string
  fallback?: boolean
}

export type BlueprintRequest = {
  answers: QuestAnswer[]
  opportunities: Opportunity[]
  locale?: string
  title?: string
}

// Sprint 2 additions
export type NextQuestionRequest = {
  answers: QuestAnswer[]
  locale?: string
}

export type NextQuestion = {
  id: string
  label: string
  type: 'text' | 'number'
  placeholder?: string
  rationale?: string
}

export type NextQuestionResponse = {
  question?: NextQuestion
  fallback?: boolean
}

export type SummaryRequest = {
  answers: QuestAnswer[]
  opportunities: Opportunity[]
  implementationCost?: number
  targetPayback?: number
  locale?: string
}

export type SummaryResponse = {
  summary: string
  model?: string
  fallback?: boolean
}
