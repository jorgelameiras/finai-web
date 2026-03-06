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

export async function POST(req: NextRequest) {
  try {
    const { message, provider, apiKey, openclawUrl, transactions } = await req.json()

    if (!provider || !apiKey) {
      return NextResponse.json({ error: 'No AI provider configured' }, { status: 400 })
    }

    let txContext = ''
    if (transactions && transactions.length > 0) {
      txContext = '\nRelevant transactions:\n' + transactions.map((t: { merchant: string; amount: number; category: string; date: string }) =>
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
      const baseUrl = openclawUrl?.replace(/\/$/, '') || ''
      const res = await fetch(`${baseUrl}/v1/chat/completions`, {
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
