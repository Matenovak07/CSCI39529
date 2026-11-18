import { useEffect, useRef, useState, type FormEvent } from 'react'
import { ASSISTANT_SUGGESTIONS, assistantAnswer } from '../data'
import { Button, Card, PageHeader, cx } from '../components/ui'
import { Locked, useIsGrowth } from '../components/Locked'

interface Message {
  from: 'user' | 'bot'
  text: string
}

const GREETING: Message = {
  from: 'bot',
  text: 'Hi! Ask me anything about your business, or tap one of the questions below.',
}

export default function Assistant() {
  const isGrowth = useIsGrowth()
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!isGrowth) {
    return (
      <>
        <PageHeader title="Ask ProfitLens" />
        <Locked
          feature="Ask ProfitLens"
          description="Ask questions about your business in plain English and get answers from your own data."
        />
      </>
    )
  }

  const ask = (question: string) => {
    if (!question.trim()) return
    setMessages((current) => [
      ...current,
      { from: 'user', text: question },
      { from: 'bot', text: assistantAnswer(question) },
    ])
    setInput('')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    ask(input)
  }

  return (
    <>
      <PageHeader title="Ask ProfitLens" subtitle="In this demo the answers are pre-written." />
      <Card className="flex h-[60vh] flex-col">
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {messages.map((message, index) => (
            <div key={index} className={cx('flex', message.from === 'user' && 'justify-end')}>
              <p
                className={cx(
                  'max-w-[75%] rounded-2xl px-4 py-2 text-sm',
                  message.from === 'user' ? 'bg-brand text-white' : 'bg-slate-100',
                )}
              >
                {message.text}
              </p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-slate-200 p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {ASSISTANT_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => ask(suggestion)}
                className="cursor-pointer rounded-full border border-slate-300 px-3 py-1 text-xs hover:bg-slate-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about revenue, costs, customers..."
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </Card>
    </>
  )
}