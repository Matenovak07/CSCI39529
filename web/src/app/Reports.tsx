import { useState } from 'react'
import { BUSINESS, INSIGHTS, MONTHLY } from '../data'
import { Button, Card, PageHeader, usd } from '../components/ui'

export default function Reports() {
  const [requested, setRequested] = useState(false)

  const thisMonth = MONTHLY[MONTHLY.length - 1]
  const topThree = INSIGHTS
    .filter((i) => !i.impactLabel)
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 3)

  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="A monthly summary you can share with your accountant or lender."
        right={<Button variant="secondary" onClick={() => window.print()}>Print / save as PDF</Button>}
      />

      <Card className="p-8">
        <p className="text-xs font-semibold uppercase text-brand">Monthly summary, November</p>
        <h2 className="text-xl font-bold">{BUSINESS.name}</h2>

        <div className="my-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-slate-500">Revenue</p>
            <p className="text-xl font-bold">{usd(thisMonth.revenue)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Expenses</p>
            <p className="text-xl font-bold">{usd(thisMonth.expenses)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Profit</p>
            <p className="text-xl font-bold text-leaf">{usd(thisMonth.profit)}</p>
          </div>
        </div>

        <p className="text-slate-700">
          Revenue grew 1.1% over October. Net margin held at 6.0%, below the 7.8% peer median.
          Labor at Alberta St. and rising dairy costs were the main drags. Cash is healthy at $41.2k,
          but $8,420 in wholesale invoices are more than 45 days overdue.
        </p>

        <h3 className="mb-2 mt-6 font-semibold">Top recommendations</h3>
        <ol className="list-decimal space-y-1 pl-5">
          {topThree.map((insight) => (
            <li key={insight.id}>
              {insight.title} <span className="text-leaf">(+{usd(insight.impact)}/mo)</span>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="mt-4 flex items-center justify-between gap-4 p-5">
        <div>
          <p className="font-semibold">Need a custom report?</p>
          <p className="text-sm text-slate-500">Lender packages and investor updates, from $99.</p>
        </div>
        <Button onClick={() => setRequested(true)} disabled={requested}>
          {requested ? 'Request received' : 'Request a report'}
        </Button>
      </Card>
    </>
  )
}