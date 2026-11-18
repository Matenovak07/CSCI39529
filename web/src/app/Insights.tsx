import { useState } from 'react'
import { INSIGHTS, type InsightArea } from '../data'
import { InsightCard } from '../components/InsightCard'
import { Button, Card, PageHeader, cx } from '../components/ui'
import { useStore } from '../store'

const AREAS: ('All' | InsightArea)[] = ['All', 'Marketing', 'Expenses', 'Customers', 'Operations', 'Pricing', 'Cash flow']
const FILTERS = ['To do', 'Done', 'Dismissed'] as const

export default function Insights() {
  const { statuses, plan, set } = useStore()
  const [area, setArea] = useState<(typeof AREAS)[number]>('All')
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('To do')

  const sortedByImpact = [...INSIGHTS].sort((a, b) => b.impact - a.impact)

  // Starter plan only sees the three biggest non-growth insights
  const starterIds = sortedByImpact.filter((i) => !i.growthOnly).slice(0, 3).map((i) => i.id)
  const isLocked = (id: string) => plan === 'starter' && !starterIds.includes(id)

  const matches = sortedByImpact.filter((insight) => {
    const status = statuses[insight.id] ?? 'open'
    if (area !== 'All' && insight.area !== area) return false
    if (filter === 'To do') return status === 'open' || status === 'in_progress'
    if (filter === 'Done') return status === 'done'
    return status === 'dismissed'
  })
  const visible = matches.filter((i) => !isLocked(i.id))
  const lockedCount = matches.length - visible.length

  return (
    <>
      <PageHeader title="Insights" subtitle="Things we found across your connected tools in the last 90 days." />

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1">
          {AREAS.map((a) => (
            <button
              key={a}
              onClick={() => setArea(a)}
              className={cx(
                'cursor-pointer rounded-full px-3 py-1 text-sm',
                area === a ? 'bg-brand text-white' : 'border border-slate-300 bg-white',
              )}
            >
              {a}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cx('cursor-pointer rounded-lg px-3 py-1 text-sm', filter === f ? 'bg-slate-200 font-medium' : 'text-slate-600')}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {visible.map((insight) => <InsightCard key={insight.id} insight={insight} />)}
        {visible.length === 0 && lockedCount === 0 && (
          <Card className="p-8 text-center text-slate-500">Nothing here. Try another filter.</Card>
        )}
        {lockedCount > 0 && (
          <Card className="flex items-center justify-between gap-4 p-5">
            <p>
              <b>{lockedCount} more insights</b> are available on the Growth plan.
            </p>
            <Button onClick={() => set({ plan: 'growth' })}>Upgrade to Growth</Button>
          </Card>
        )}
      </div>
    </>
  )
}