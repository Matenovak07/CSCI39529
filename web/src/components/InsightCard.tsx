import { useState } from 'react'
import { CheckCircle2, ChevronDown, PlayCircle, ThumbsDown, ThumbsUp, X } from 'lucide-react'
import type { Insight } from '../data'
import { Badge, Button, Card, IntegrationIcon, cx, usd } from './ui'
import { useStore, type InsightStatus } from '../store'

const kindTone = { Inefficiency: 'rose', Opportunity: 'green', Risk: 'amber' } as const
const statusLabel: Record<InsightStatus, string> = { open: 'New', in_progress: 'In progress', done: 'Done', dismissed: 'Dismissed' }

export function InsightCard({ insight, defaultOpen = false }: { insight: Insight; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const [checked, setChecked] = useState<number[]>([])
  const { statuses, setStatus, feedback, setFeedback } = useStore()
  const status = statuses[insight.id] ?? 'open'
  const fb = feedback[insight.id]
  const faded = status === 'done' || status === 'dismissed'

  return (
    <Card className={cx('overflow-hidden transition', faded && 'opacity-70')}>
      <button onClick={() => setOpen(!open)} className="flex w-full items-start gap-4 p-5 text-left cursor-pointer">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={kindTone[insight.kind]}>{insight.kind}</Badge>
            <Badge>{insight.area}</Badge>
            {status !== 'open' && <Badge tone={status === 'done' ? 'green' : status === 'in_progress' ? 'indigo' : 'slate'}>{statusLabel[status]}</Badge>}
          </div>
          <h3 className={cx('mt-2 font-semibold', status === 'done' && 'line-through decoration-slate-400')}>{insight.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{insight.summary}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-lg font-bold text-emerald-600">{insight.impactLabel ? usd(insight.impact) : `+${usd(insight.impact)}`}</p>
          <p className="text-xs text-slate-500">{insight.impactLabel ?? 'per month (est.)'}</p>
          <ChevronDown className={cx('ml-auto mt-2 h-4 w-4 text-slate-400 transition', open && 'rotate-180')} />
        </div>
      </button>

      {open && (
        <div className="fade-in border-t border-slate-100 bg-slate-50/60 p-5">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Evidence</p>
              <dl className="mt-2 divide-y divide-slate-200 rounded-lg bg-white ring-1 ring-slate-200">
                {insight.evidence.map((e) => (
                  <div key={e.label} className="flex justify-between gap-4 px-3 py-2 text-sm"><dt className="text-slate-500">{e.label}</dt><dd className="text-right font-medium">{e.value}</dd></div>
                ))}
              </dl>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Why we flagged this</p>
              <p className="mt-1 text-sm text-slate-700">{insight.why}</p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">Sources: {insight.sources.map((s) => <IntegrationIcon key={s} id={s} size="sm" />)}</span>
                <span>Confidence: <b className="text-slate-700">{Math.round(insight.confidence * 100)}%</b></span>
                <span>Effort: <b className="text-slate-700">{insight.effort}</b></span>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recommended actions</p>
              <ul className="mt-2 space-y-2">
                {insight.actions.map((a, i) => {
                  const on = checked.includes(i) || status === 'done'
                  return (
                    <li key={a}>
                      <label className="flex cursor-pointer gap-3 rounded-lg bg-white p-3 text-sm ring-1 ring-slate-200">
                        <input type="checkbox" className="mt-0.5 accent-indigo-600" checked={on} onChange={() => setChecked(on ? checked.filter((c) => c !== i) : [...checked, i])} />
                        <span className={cx(on && 'text-slate-400 line-through')}>{a}</span>
                      </label>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {status !== 'in_progress' && status !== 'done' && <Button variant="secondary" onClick={() => setStatus(insight.id, 'in_progress')}><PlayCircle className="h-4 w-4" />Start</Button>}
                {status !== 'done' && <Button onClick={() => setStatus(insight.id, 'done')}><CheckCircle2 className="h-4 w-4" />Mark done</Button>}
                {status !== 'dismissed' && status !== 'done' && <Button variant="ghost" onClick={() => setStatus(insight.id, 'dismissed')}><X className="h-4 w-4" />Not relevant</Button>}
                {(status === 'done' || status === 'dismissed') && <Button variant="ghost" onClick={() => setStatus(insight.id, 'open')}>Reopen</Button>}
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                Was this recommendation useful?
                <button aria-label="Useful" onClick={() => setFeedback(insight.id, 'up')} className={cx('rounded-md p-1.5 cursor-pointer', fb === 'up' ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-slate-100')}><ThumbsUp className="h-4 w-4" /></button>
                <button aria-label="Not useful" onClick={() => setFeedback(insight.id, 'down')} className={cx('rounded-md p-1.5 cursor-pointer', fb === 'down' ? 'bg-rose-100 text-rose-700' : 'hover:bg-slate-100')}><ThumbsDown className="h-4 w-4" /></button>
                {fb && <span className="text-xs text-slate-400">Thanks! This helps tune your recommendations.</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
