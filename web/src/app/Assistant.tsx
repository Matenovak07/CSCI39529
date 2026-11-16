import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { ASSISTANT_SUGGESTIONS, assistantAnswer } from '../data'
import { Button, Card, PageHeader, cx } from '../components/ui'
import { Locked, useIsGrowth } from '../components/Locked'

interface Msg { role: 'user' | 'bot'; text: string }

export default function Assistant() {
  const growth = useIsGrowth()
  const [msgs, setMsgs] = useState<Msg[]>([{ role: 'bot', text: 'Hi! I can answer questions about your business using data from your 5 connected tools. What would you like to know?' }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, typing])

  if (!growth) return (<><PageHeader title="Ask ProfitLens" /><Locked feature="Ask ProfitLens" description="Ask questions about your business in plain English, like “Why did profit drop in September?”, and get answers based on your own connected data." /></>)

  const ask = (q: string) => {
    if (!q.trim() || typing) return
    setMsgs((m) => [...m, { role: 'user', text: q }])
    setInput('')
    setTyping(true)
    setTimeout(() => { setMsgs((m) => [...m, { role: 'bot', text: assistantAnswer(q) }]); setTyping(false) }, 900)
  }
  const submit = (e: FormEvent) => { e.preventDefault(); ask(input) }

  return (
    <>
      <PageHeader title="Ask ProfitLens" subtitle="Plain-English answers based on your own numbers. In this prototype, answers are pre-written for the demo business." />
      <Card className="flex h-[60vh] min-h-[420px] flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {msgs.map((m, i) => (
            <div key={i} className={cx('flex gap-3', m.role === 'user' && 'justify-end')}>
              {m.role === 'bot' && <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600"><Sparkles className="h-4 w-4 text-white" /></span>}
              <div className={cx('max-w-[75%] rounded-2xl px-4 py-2.5 text-sm', m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800')}>{m.text}</div>
            </div>
          ))}
          {typing && <div className="flex gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600"><Sparkles className="h-4 w-4 text-white" /></span><div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-500">Analyzing your data…</div></div>}
          <div ref={end} />
        </div>
        <div className="border-t border-slate-100 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {ASSISTANT_SUGGESTIONS.map((s) => <button key={s} onClick={() => ask(s)} className="rounded-full bg-white px-3 py-1 text-xs text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 cursor-pointer">{s}</button>)}
          </div>
          <form onSubmit={submit} className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about revenue, costs, customers, campaigns…" className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
            <Button type="submit" disabled={!input.trim() || typing}><Send className="h-4 w-4" /></Button>
          </form>
        </div>
      </Card>
    </>
  )
}
