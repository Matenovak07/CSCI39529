import { useMemo, useState } from 'react'
import { Lock } from 'lucide-react'
import { INSIGHTS, type InsightArea } from '../data'
import { InsightCard } from '../components/InsightCard'
import { Button, Card, PageHeader, cx, usd } from '../components/ui'
import { useStore } from '../store'

const AREAS: ('All' | InsightArea)[] = ['All', 'Marketing', 'Expenses', 'Customers', 'Operations', 'Pricing', 'Cash flow']
const STATUS = [
  { id: 'active', label: 'To do' },
  { id: 'done', label: 'Done' },
  { id: 'dismissed', label: 'Dismissed' },
  { id: 'all', label: 'All' },
] as const

export default function Insights() {
  const { statuses, plan, set } = useStore()
  const [area, setArea] = useState<(typeof AREAS)[number]>('All')
  const [status, setStatus] = useState<(typeof STATUS)[number]['id']>('active')
  const [sort, setSort] = useState<'impact' | 'effort' | 'confidence'>('impact')

  const sorted = useMemo(() => {
    const effortRank = { Low: 0, Medium: 1, High: 2 }
    return [...INSIGHTS].sort((a, b) =>
      sort === 'impact' ? b.impact - a.impact : sort === 'effort' ? effortRank[a.effort] - effortRank[b.effort] : b.confidence - a.confidence)
  }, [sort])

  const starterVisible = useMemo(() => new Set(
    [...INSIGHTS].filter((i) => !i.growthOnly).sort((a, b) => b.impact - a.impact).slice(0, 3).map((i) => i.id),
  ), [])
  const isLocked = (id: string) => plan === 'starter' && !starterVisible.has(id)

  const filtered = sorted.filter((i) => {
    const st = statuses[i.id] ?? 'open'
    if (area !== 'All' && i.area !== area) return false
    if (status === 'active') return st === 'open' || st === 'in_progress'
    if (status === 'done') return st === 'done'
    if (status === 'dismissed') return st === 'dismissed'
    return true
  })
  const visible = filtered.filter((i) => !isLocked(i.id))
  const locked = filtered.filter((i) => isLocked(i.id))
  const monthlyOpen = INSIGHTS.filter((i) => !i.impactLabel && !['done', 'dismissed'].includes(statuses[i.id] ?? 'open')).reduce((s, i) => s + i.impact, 0)

  return (
    <>
      <PageHeader title="Insights and actions" subtitle={<>Found across your connected tools in the last 90 days. <b className="text-emerald-600">{usd(monthlyOpen)}/mo</b> of potential profit is still open.</>} />
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-1">
          {AREAS.map((a) => <button key={a} onClick={() => setArea(a)} className={cx('rounded-full px-3 py-1 text-sm cursor-pointer', area === a ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50')}>{a}</button>)}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-sm">
            {STATUS.map((s) => <button key={s.id} onClick={() => setStatus(s.id)} className={cx('rounded-md px-3 py-1 cursor-pointer', status === s.id && 'bg-white font-medium shadow-sm')}>{s.label}</button>)}
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm">
            <option value="impact">Sort: highest impact</option>
            <option value="effort">Sort: easiest first</option>
            <option value="confidence">Sort: most confident</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {visible.map((i, idx) => <InsightCard key={i.id} insight={i} defaultOpen={idx === 0 && status === 'active'} />)}
        {visible.length === 0 && locked.length === 0 && <Card className="p-10 text-center text-sm text-slate-500">Nothing here yet. Try a different filter.</Card>}
        {locked.length > 0 && (
          <Card className="p-5">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50"><Lock className="h-4 w-4 text-indigo-600" /></span>
              <div className="flex-1">
                <p className="font-semibold">{locked.length} more insight{locked.length > 1 ? 's' : ''} worth {usd(locked.reduce((s, i) => s + (i.impactLabel ? 0 : i.impact), 0))}/mo</p>
                <p className="text-sm text-slate-500">The Starter plan shows your top 3 actions. Upgrade to Growth to see the full feed, including pricing and conversion insights.</p>
              </div>
              <Button onClick={() => set({ plan: 'growth' })}>Upgrade to Growth</Button>
            </div>
            <div className="mt-4 space-y-2">
              {locked.map((i) => <div key={i.id} className="select-none rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-400 blur-[3px]">{i.title}: {i.summary}</div>)}
            </div>
          </Card>
        )}
      </div>
    </>
  )
}
