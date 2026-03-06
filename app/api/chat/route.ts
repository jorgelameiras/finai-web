import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_CONTEXT = `You are FinAI, a personal finance assistant. The user is in demo mode with the following financial data: Balance: $12,840.50, Monthly income: $4,200, Monthly spend: $3,200. Top spending categories: Housing $1,850, Food $642, Transport $380, Shopping $280. Active subscriptions: Netflix $15.99/mo, Spotify $9.99/mo, iCloud $0.99/mo, Adobe Creative $54.99/mo. Total subscription cost: $81.96/mo. Be helpful, concise, and specific. Always reference their actual numbers when relevant.`

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) return NextResponse.json({ error: 'API key not configured' }, { status: 500 })

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: SYSTEM_CONTEXT + '\n\nUser: ' + message }] }]
        })
      }
    )
    const data = await res.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) return NextResponse.json({ error: 'No response from AI' }, { status: 502 })
    return NextResponse.json({ text })
  } catch (err) {
    console.error('Gemini proxy error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
