import { useState } from 'react'
import type { Insight } from '../data'
import { Badge, Button, Card, IntegrationIcon, cx, usd } from './ui'
import { useStore } from '../store'

const kindColor = { Inefficiency: 'rose', Opportunity: 'green', Risk: 'amber' } as const

export function InsightCard({ insight, defaultOpen = false }: { insight: Insight; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const { statuses, setStatus } = useStore()

  const status = statuses[insight.id] ?? 'open'
  const finished = status === 'done' || status === 'dismissed'

  return (
    <Card className={cx(finished && 'opacity-60')}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-start gap-4 p-5 text-left"
      >
        <div className="flex-1">
          <div className="mb-2 flex gap-2">
            <Badge tone={kindColor[insight.kind]}>{insight.kind}</Badge>
            <Badge>{insight.area}</Badge>
            {finished && <Badge tone="green">{status === 'done' ? 'Done' : 'Dismissed'}</Badge>}
          </div>
          <h3 className="font-semibold">{insight.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{insight.summary}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-leaf">
            {insight.impactLabel ? usd(insight.impact) : `+${usd(insight.impact)}`}
          </p>
          <p className="text-xs text-slate-500">{insight.impactLabel ?? 'per month'}</p>
        </div>
      </button>

      {open && (
        <div className="grid gap-6 border-t border-slate-200 p-5 md:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-semibold">What we found</h4>
            <ul className="space-y-1 text-sm">
              {insight.evidence.map((item) => (
                <li key={item.label} className="flex justify-between gap-4">
                  <span className="text-slate-500">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-600">{insight.why}</p>
            <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
              From: {insight.sources.map((id) => <IntegrationIcon key={id} id={id} size="sm" />)}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold">What to do</h4>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              {insight.actions.map((action) => <li key={action}>{action}</li>)}
            </ul>
            <div className="mt-4 flex gap-2">
              {finished ? (
                <Button variant="secondary" onClick={() => setStatus(insight.id, 'open')}>Reopen</Button>
              ) : (
                <>
                  <Button onClick={() => setStatus(insight.id, 'done')}>Mark done</Button>
                  <Button variant="ghost" onClick={() => setStatus(insight.id, 'dismissed')}>Not relevant</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}