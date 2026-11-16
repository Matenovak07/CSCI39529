import { useState } from 'react'
import { Download, FileText, Mail } from 'lucide-react'
import { BUSINESS, INSIGHTS, MONTHLY } from '../data'
import { Badge, Button, Card, PageHeader, cx, usd } from '../components/ui'
import { useStore } from '../store'

export default function Reports() {
  const { plan } = useStore()
  const [digest, setDigest] = useState({ weekly: plan === 'growth', monthly: true, slack: false })
  const [requested, setRequested] = useState(false)
  const last = MONTHLY[MONTHLY.length - 1]
  const top = [...INSIGHTS].filter((i) => !i.impactLabel).sort((a, b) => b.impact - a.impact).slice(0, 3)

  return (
    <>
      <PageHeader title="Reports" subtitle="Automatic summaries you can share with partners, lenders or your accountant." right={<Button variant="secondary" onClick={() => window.print()}><Download className="h-4 w-4" />Download PDF</Button>} />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-8 lg:col-span-2">
          <div className="flex items-start justify-between border-b border-slate-100 pb-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Monthly business summary</p>
              <h2 className="mt-1 text-xl font-semibold">{BUSINESS.name}</h2>
              <p className="text-sm text-slate-500">November · prepared by ProfitLens</p>
            </div>
            <FileText className="h-8 w-8 text-slate-300" />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4 text-center">
            <div><p className="text-xs text-slate-500">Revenue</p><p className="text-lg font-bold">{usd(last.revenue)}</p></div>
            <div><p className="text-xs text-slate-500">Expenses</p><p className="text-lg font-bold">{usd(last.expenses)}</p></div>
            <div><p className="text-xs text-slate-500">Net profit</p><p className="text-lg font-bold text-emerald-600">{usd(last.profit)}</p></div>
          </div>
          <h3 className="mt-6 font-semibold">Summary</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">Revenue grew 1.1% over October, driven by holiday retail bags and wholesale. Net margin held at 6.0%, below the 7.8% peer median. Labor at Alberta St. and rising dairy costs were the main drags. Cash is healthy at $41.2k, but $8,420 in wholesale receivables are more than 45 days overdue.</p>
          <h3 className="mt-6 font-semibold">Top recommendations</h3>
          <ol className="mt-2 space-y-2 text-sm">
            {top.map((i, n) => <li key={i.id} className="flex gap-3"><span className="font-semibold text-indigo-600">{n + 1}.</span><span className="flex-1">{i.title}</span><span className="font-medium text-emerald-600">+{usd(i.impact)}/mo</span></li>)}
          </ol>
          <p className="mt-6 text-xs text-slate-400">Sources: QuickBooks Online, Square POS, Shopify, HubSpot CRM, Google Ads. Figures are estimates based on trailing 90-day data.</p>
        </Card>
        <div className="space-y-4">
          <Card className="p-5">
            <p className="flex items-center gap-2 font-semibold"><Mail className="h-4 w-4" />Email and alerts</p>
            <div className="mt-3 space-y-3 text-sm">
              {([['monthly', 'Monthly summary (PDF)', false], ['weekly', 'Weekly digest', true], ['slack', 'Slack alerts for urgent issues', true]] as const).map(([key, label, growthOnly]) => {
                const disabled = growthOnly && plan === 'starter'
                return (
                  <label key={key} className={cx('flex items-center justify-between gap-3', disabled ? 'text-slate-400' : 'cursor-pointer')}>
                    <span>{label} {disabled && <Badge tone="indigo">Growth</Badge>}</span>
                    <input type="checkbox" className="h-4 w-4 accent-indigo-600" disabled={disabled} checked={digest[key] && !disabled} onChange={() => setDigest({ ...digest, [key]: !digest[key] })} />
                  </label>
                )
              })}
            </div>
          </Card>
          <Card className="p-5">
            <p className="font-semibold">Need a custom report?</p>
            <p className="mt-1 text-sm text-slate-500">Lender packages, investor updates, multi-location deep dives. Built by our analysts from your connected data.</p>
            <p className="mt-3 text-sm font-medium text-indigo-600">From $99 per report</p>
            <Button className="mt-3 w-full" onClick={() => setRequested(true)} disabled={requested}>{requested ? 'Request received ✓' : 'Request a custom report'}</Button>
          </Card>
        </div>
      </div>
    </>
  )
}
