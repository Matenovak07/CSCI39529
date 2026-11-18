import { BENCHMARKS } from '../data'
import { Card, PageHeader, cx } from '../components/ui'
import { Locked, useIsGrowth } from '../components/Locked'

function formatValue(value: number, unit: string) {
  return unit === '$' ? `$${value.toFixed(2)}` : `${value}${unit}`
}

export default function Benchmarks() {
  const isGrowth = useIsGrowth()

  if (!isGrowth) {
    return (
      <>
        <PageHeader title="Benchmarks" />
        <Locked
          feature="Benchmarks"
          description="See how your margins, labor costs and ad returns compare to similar businesses."
        />
      </>
    )
  }

  return (
    <>
      <PageHeader
        title="Benchmarks"
        subtitle="How you compare to 142 independent cafés (anonymized data, updated weekly)."
      />
      <Card className="divide-y divide-slate-200">
        {BENCHMARKS.map((row) => {
          const youAreBetter = row.higherBetter ? row.you >= row.peer : row.you <= row.peer
          return (
            <div key={row.metric} className="flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-medium">{row.metric}</p>
                <p className="text-xs text-slate-500">{row.higherBetter ? 'Higher is better' : 'Lower is better'}</p>
              </div>
              <div className="text-right text-sm">
                <p className={cx('text-lg font-bold', youAreBetter ? 'text-leaf' : 'text-red-700')}>
                  {formatValue(row.you, row.unit)}
                </p>
                <p className="text-slate-500">peers: {formatValue(row.peer, row.unit)}</p>
              </div>
            </div>
          )
        })}
      </Card>
    </>
  )
}