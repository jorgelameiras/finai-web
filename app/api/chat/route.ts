import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_BASE = `You are a personal finance AI assistant embedded in FinAI. The user's financial data:
- Balance: $12,840.50 | Monthly income: $4,200 | Monthly spend: $3,200
- Top categories: Housing $1,850, Food $642, Transport $380, Shopping $280
- Subscriptions: Netflix $15.99, Spotify $9.99, iCloud $0.99, Adobe Creative $54.99
[TRANSACTION_DATA]

IMPORTANT: You can create custom tabs in the FinAI dashboard by including an action block at the END of your response.
Format: [FINAI_ACTION]{"action":"create_tab","label":"Tab Name","icon":"IconName","description":"What this tab tracks","categoryFilter":"Category","keywordFilter":"keyword","chartType":"bar"}[/FINAI_ACTION]

Available icons: Fuel, ShoppingCart, Coffee, Dumbbell, Home, Car, Plane, Music, Gamepad2, Heart, Zap, Package
Chart types: bar, line, pie
Only include this block if the user explicitly asks to create a new tab or tracking section. Never include it for regular questions.
Be helpful, concise, and reference their actual numbers.`

const ALLOWED_PROVIDERS = ['claude', 'openai', 'openclaw'] as const
type Provider = typeof ALLOWED_PROVIDERS[number]

const MAX_MESSAGE_LENGTH = 4000
const MAX_TRANSACTIONS = 50

function isValidProvider(p: unknown): p is Provider {
  return typeof p === 'string' && ALLOWED_PROVIDERS.includes(p as Provider)
}

function isValidPublicUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:') return false
    const hostname = parsed.hostname.toLowerCase()
    if (
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '0.0.0.0' ||
      hostname === '[::1]' ||
      hostname === '169.254.169.254' ||
      hostname === 'metadata.google.internal' ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      hostname.endsWith('.internal') ||
      hostname.endsWith('.local') ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)
    ) {
      return false
    }
    return true
  } catch {
    return false
  }
}

function sanitizeString(s: unknown, maxLen: number): string | null {
  if (typeof s !== 'string') return null
  const trimmed = s.trim()
  if (trimmed.length === 0 || trimmed.length > maxLen) return null
  return trimmed
}

interface TransactionInput {
  merchant: string
  amount: number
  category: string
  date: string
}

function sanitizeTransactions(txs: unknown): TransactionInput[] {
  if (!Array.isArray(txs)) return []
  return txs
    .slice(0, MAX_TRANSACTIONS)
    .filter((t): t is TransactionInput =>
      typeof t === 'object' && t !== null &&
      typeof t.merchant === 'string' && t.merchant.length <= 200 &&
      typeof t.amount === 'number' && isFinite(t.amount) &&
      typeof t.category === 'string' && t.category.length <= 100 &&
      typeof t.date === 'string' && t.date.length <= 20
    )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (!isValidProvider(body.provider)) {
      return NextResponse.json({ error: 'Invalid AI provider' }, { status: 400 })
    }
    const provider = body.provider

    const apiKey = sanitizeString(body.apiKey, 500)
    if (!apiKey) {
      return NextResponse.json({ error: 'No AI provider configured' }, { status: 400 })
    }

    const message = sanitizeString(body.message, MAX_MESSAGE_LENGTH)
    if (!message) {
      return NextResponse.json({ error: 'Message is required and must be under 4000 characters' }, { status: 400 })
    }

    const transactions = sanitizeTransactions(body.transactions)

    let txContext = ''
    if (transactions.length > 0) {
      txContext = '\nRelevant transactions:\n' + transactions.map((t) =>
        `- ${t.merchant}: $${Math.abs(t.amount)} (${t.category}, ${t.date})`
      ).join('\n')
    }

    const systemPrompt = SYSTEM_BASE.replace('[TRANSACTION_DATA]', txContext)

    let responseText = ''

    if (provider === 'claude') {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-opus-4-5',
          max_tokens: 1024,
          system: systemPrompt,
          messages: [{ role: 'user', content: message }],
        }),
      })
      const data = await res.json()
      if (!res.ok) return NextResponse.json({ error: data.error?.message || 'Claude API error' }, { status: 502 })
      responseText = data.content[0].text

    } else if (provider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message },
          ],
        }),
      })
      const data = await res.json()
      if (!res.ok) return NextResponse.json({ error: data.error?.message || 'OpenAI API error' }, { status: 502 })
      responseText = data.choices[0].message.content

    } else if (provider === 'openclaw') {
      const rawUrl = typeof body.openclawUrl === 'string' ? body.openclawUrl.replace(/\/$/, '') : ''
      if (!rawUrl || !isValidPublicUrl(rawUrl)) {
        return NextResponse.json({ error: 'Invalid or missing OpenClaw URL. Must be a public HTTPS URL.' }, { status: 400 })
      }

      const res = await fetch(`${rawUrl}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message },
          ],
        }),
      })
      const data = await res.json()
      if (!res.ok) return NextResponse.json({ error: 'OpenClaw API error' }, { status: 502 })
      responseText = data.choices?.[0]?.message?.content || data.response || data.text || 'No response'
    }

    return NextResponse.json({ text: responseText })
  } catch (err) {
    console.error('Chat proxy error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
