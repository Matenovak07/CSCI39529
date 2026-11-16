import { useState } from 'react'
import { Info, Users } from 'lucide-react'
import { BENCHMARKS } from '../data'
import { Badge, Card, PageHeader, cx } from '../components/ui'
import { Locked, useIsGrowth } from '../components/Locked'

export default function Benchmarks() {
  const growth = useIsGrowth()
  const [share, setShare] = useState(true)
  if (!growth) return (<><PageHeader title="Benchmarks" /><Locked feature="Peer benchmarking" description="See how your margins, labor costs, ad returns and customer retention compare to similar businesses, using anonymized data aggregated across ProfitLens customers." /></>)

  const fmt = (v: number, unit: string) => unit === '$' ? `$${v.toFixed(2)}` : `${v}${unit}`

  return (
    <>
      <PageHeader title="Benchmarks" subtitle="How you compare to similar businesses, based on anonymized and aggregated data." />
      <Card className="mb-4 flex flex-wrap items-center gap-4 p-4">
        <Users className="h-5 w-5 text-indigo-600" />
        <div className="flex-1 text-sm">
          <p className="font-medium">Your peer group: 142 independent cafés</p>
          <p className="text-slate-500">1–3 locations · $750k–$2M annual revenue · Pacific Northwest · trailing 90 days</p>
        </div>
        <Badge tone="indigo">Updated weekly</Badge>
      </Card>

      <Card className="divide-y divide-slate-100">
        {BENCHMARKS.map((b) => {
          const better = b.higherBetter ? b.you >= b.peer : b.you <= b.peer
          const max = Math.max(b.you, b.peer) * 1.25
          return (
            <div key={b.metric} className="grid items-center gap-4 p-5 md:grid-cols-[1fr_2fr_auto]">
              <div>
                <p className="font-medium">{b.metric}</p>
                <p className="text-xs text-slate-500">{b.higherBetter ? 'Higher is better' : 'Lower is better'}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs"><span className="w-12 text-slate-500">You</span><div className="h-3 flex-1 rounded-full bg-slate-100"><div className={cx('h-full rounded-full', better ? 'bg-emerald-500' : 'bg-rose-400')} style={{ width: `${b.you / max * 100}%` }} /></div><span className="w-16 text-right font-semibold">{fmt(b.you, b.unit)}</span></div>
                <div className="flex items-center gap-3 text-xs"><span className="w-12 text-slate-500">Peers</span><div className="h-3 flex-1 rounded-full bg-slate-100"><div className="h-full rounded-full bg-slate-400" style={{ width: `${b.peer / max * 100}%` }} /></div><span className="w-16 text-right text-slate-600">{fmt(b.peer, b.unit)}</span></div>
              </div>
              <div className="text-right">
                <p className={cx('text-lg font-bold', b.percentile >= 50 ? 'text-emerald-600' : 'text-rose-600')}>{b.percentile}<span className="text-xs">th</span></p>
                <p className="text-xs text-slate-500">percentile</p>
              </div>
            </div>
          )
        })}
      </Card>

      <Card className="mt-4 flex items-start gap-3 p-4 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
        <div className="flex-1 text-slate-600">
          Benchmarks only include businesses that opted in. Data is anonymized and aggregated, and a figure is only shown when at least 25 businesses contribute to it. Your individual numbers are never shared.
        </div>
        <label className="flex shrink-0 cursor-pointer items-center gap-2 text-xs font-medium">
          <input type="checkbox" className="accent-indigo-600" checked={share} onChange={() => setShare(!share)} />Contribute my anonymized data
        </label>
      </Card>
    </>
  )
}
