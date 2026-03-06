export type AIProvider = 'claude' | 'openai' | 'openclaw'

export interface AIConfig {
  provider: AIProvider
  apiKey: string
  openclawUrl?: string
}

export interface CustomTab {
  id: string
  label: string
  icon: string
  description: string
  categoryFilter?: string
  keywordFilter?: string
  chartType: 'line' | 'bar' | 'pie'
  createdAt: string
}

export const AI_PROVIDERS = [
  { id: 'claude', label: 'Claude (Anthropic)', placeholder: 'sk-ant-api03-...' },
  { id: 'openai', label: 'ChatGPT (OpenAI)', placeholder: 'sk-proj-...' },
  { id: 'openclaw', label: 'OpenClaw', placeholder: 'Your OpenClaw API key' },
] as const

export function loadAIConfig(): AIConfig | null {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem('aiConfig')
  return raw ? JSON.parse(raw) : null
}

export function saveAIConfig(config: AIConfig) {
  localStorage.setItem('aiConfig', JSON.stringify(config))
}

export function loadCustomTabs(): CustomTab[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem('customTabs')
  return raw ? JSON.parse(raw) : []
}

export function saveCustomTab(tab: CustomTab) {
  const tabs = loadCustomTabs()
  const existing = tabs.findIndex(t => t.id === tab.id)
  if (existing >= 0) tabs[existing] = tab
  else tabs.push(tab)
  localStorage.setItem('customTabs', JSON.stringify(tabs))
}

export function deleteCustomTab(id: string) {
  const tabs = loadCustomTabs().filter(t => t.id !== id)
  localStorage.setItem('customTabs', JSON.stringify(tabs))
}
