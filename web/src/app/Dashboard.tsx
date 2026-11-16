import { Link } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowDownRight, ArrowRight, ArrowUpRight, Lock, TrendingUp } from 'lucide-react'
import { BUSINESS, EXPENSE_BREAKDOWN, FORECAST, INSIGHTS, MONTHLY } from '../data'
import { Badge, Card, cx, usd } from '../components/ui'
import { InsightCard } from '../components/InsightCard'
import { useStore } from '../store'

const k = (n: number) => `$${(n / 1000).toFixed(n >= 100000 ? 0 : 1)}k`

export default function Dashboard() {
  const { user, statuses, plan, feedback } = useStore()
  const last = MONTHLY[MONTHLY.length - 1]
  const prev = MONTHLY[MONTHLY.length - 2]
  const open = INSIGHTS.filter((i) => !['done', 'dismissed'].includes(statuses[i.id] ?? 'open'))
  const top = [...open].filter((i) => plan === 'growth' || !i.growthOnly).sort((a, b) => b.impact - a.impact).slice(0, 3)
  const realized = INSIGHTS.filter((i) => statuses[i.id] === 'done' && !i.impactLabel).reduce((s, i) => s + i.impact, 0)
  const potential = open.filter((i) => !i.impactLabel).reduce((s, i) => s + i.impact, 0)
  const doneCount = INSIGHTS.filter((i) => statuses[i.id] === 'done').length
  const useful = Object.values(feedback).filter((f) => f === 'up').length
  const rated = Object.values(feedback).length
  const score = Math.min(100, 68 + doneCount * 3)

  const kpis = [
    { label: 'Revenue (Nov)', value: k(last.revenue), delta: (last.revenue - prev.revenue) / prev.revenue, sub: 'vs. October' },
    { label: 'Net profit', value: k(last.profit), delta: (last.profit - prev.profit) / prev.profit, sub: `${(last.profit / last.revenue * 100).toFixed(1)}% margin` },
    { label: 'Gross margin', value: '66%', delta: -0.012, sub: 'peer median 68%' },
    { label: 'Cash on hand', value: '$41.2k', delta: 0.034, sub: '~14 weeks of expenses' },
  ]

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Good morning{user && !user.guest ? `, ${user.name.split(' ')[0]}` : ''}</p>
          <h1 className="text-2xl font-semibold tracking-tight">{BUSINESS.name}: overview</h1>
        </div>
        <p className="text-xs text-slate-500">Last synced 12 min ago · 5 sources</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6 lg:row-span-2">
          <p className="text-sm font-medium text-slate-500">Profit Health Score</p>
          <ScoreRing score={score} />
          <div className="mt-2 space-y-3">
            {[
              { l: 'Profitability', v: 58 + doneCount * 3 },
              { l: 'Cash health', v: 81 },
              { l: 'Growth', v: 72 },
              { l: 'Efficiency', v: 54 + doneCount * 4 },
              { l: 'Customer retention', v: 77 },
            ].map((s) => (
              <div key={s.l}>
                <div className="flex justify-between text-xs"><span className="text-slate-600">{s.l}</span><span className="font-medium">{Math.min(100, s.v)}</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-slate-100"><div className={cx('h-full rounded-full', s.v >= 75 ? 'bg-emerald-500' : s.v >= 60 ? 'bg-amber-400' : 'bg-rose-400')} style={{ width: `${Math.min(100, s.v)}%` }} /></div>
              </div>
            ))}
          </div>
          <p className="mt-5 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">Your biggest drag is <b>efficiency</b>: labor and wasted ad spend are higher than at similar cafés. Completing the top 3 actions below would raise your score to about <b>{Math.min(100, score + 9)}</b>.</p>
        </Card>

        <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-4">
          {kpis.map((m) => (
            <Card key={m.label} className="p-4">
              <p className="text-xs text-slate-500">{m.label}</p>
              <p className="mt-1 text-xl font-bold">{m.value}</p>
              <p className={cx('mt-1 flex items-center gap-0.5 text-xs font-medium', m.delta >= 0 ? 'text-emerald-600' : 'text-rose-600')}>
                {m.delta >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{Math.abs(m.delta * 100).toFixed(1)}%
                <span className="ml-1 font-normal text-slate-400">{m.sub}</span>
              </p>
            </Card>
          ))}
        </div>

        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Revenue vs. expenses (last 12 months)</p>
            <Badge tone="cyan">QuickBooks + Square + Shopify</Badge>
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer>
              <AreaChart data={MONTHLY} margin={{ left: -10, right: 8 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4f46e5" stopOpacity={0.25} /><stop offset="100%" stopColor="#4f46e5" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tickFormatter={k} tick={{ fontSize: 12 }} stroke="#94a3b8" domain={[60000, 'auto']} />
                <Tooltip formatter={(v) => usd(Number(v))} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#4f46e5" fill="url(#rev)" strokeWidth={2} />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#f43f5e" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Top actions this week</h2>
            <Link to="/app/insights" className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline">See all {open.length} <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="space-y-3">
            {top.map((i) => <InsightCard key={i.id} insight={i} />)}
            {top.length === 0 && <Card className="p-8 text-center text-sm text-slate-500">You're all caught up. New insights arrive with each sync.</Card>}
          </div>
        </div>
        <div className="space-y-4">
          <Card className="p-5">
            <p className="flex items-center gap-2 font-semibold"><TrendingUp className="h-4 w-4 text-emerald-600" />Impact tracker</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-emerald-50 p-3"><p className="text-xl font-bold text-emerald-700">{usd(realized)}</p><p className="text-xs text-emerald-800">monthly profit captured</p></div>
              <div className="rounded-lg bg-indigo-50 p-3"><p className="text-xl font-bold text-indigo-700">{usd(potential)}</p><p className="text-xs text-indigo-800">still available / mo</p></div>
            </div>
            <p className="mt-3 text-xs text-slate-500">{doneCount} of {INSIGHTS.length} actions completed · {rated ? `${useful}/${rated} rated useful` : 'rate recommendations to improve accuracy'}</p>
            <p className="mt-1 text-xs text-slate-500">That's <b>{(Math.max(realized, potential) / 75).toFixed(0)}x</b> your Growth plan's price.</p>
          </Card>
          <Card className="p-5">
            <p className="font-semibold">Where the money goes (Nov)</p>
            <div className="h-40">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={EXPENSE_BREAKDOWN} dataKey="value" nameKey="name" innerRadius={40} outerRadius={65} paddingAngle={2}>
                    {EXPENSE_BREAKDOWN.map((e) => <Cell key={e.name} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => usd(Number(v))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="space-y-1 text-xs">
              {EXPENSE_BREAKDOWN.map((e) => <li key={e.name} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: e.color }} /><span className="flex-1 text-slate-600">{e.name}</span><span className="font-medium">{usd(e.value)}</span></li>)}
            </ul>
          </Card>
          <Card className="relative overflow-hidden p-5">
            <p className="font-semibold">90-day profit forecast</p>
            <div className={cx('h-36', plan === 'starter' && 'blur-sm')}>
              <ResponsiveContainer>
                <LineChart data={FORECAST} margin={{ left: -20, right: 8, top: 10 }}>
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <YAxis tickFormatter={k} tick={{ fontSize: 11 }} stroke="#94a3b8" />
                  <Tooltip formatter={(v) => usd(Number(v))} />
                  <Line dataKey="base" name="Current path" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={2} dot={false} />
                  <Line dataKey="withActions" name="If you act" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {plan === 'starter' ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 text-center text-sm"><Lock className="h-4 w-4 text-indigo-600" /><p className="mt-1 font-medium">Forecasting is on Growth</p><Link to="/app/billing" className="text-indigo-600 hover:underline">Compare plans</Link></div>
            ) : <p className="text-xs text-slate-500">Acting on open recommendations adds about <b className="text-emerald-600">$12.4k</b> of profit over the next 3 months.</p>}
          </Card>
        </div>
      </div>
    </>
  )
}

function ScoreRing({ score }: { score: number }) {
  const r = 52, c = 2 * Math.PI * r
  const color = score >= 75 ? '#10b981' : score >= 60 ? '#f59e0b' : '#f43f5e'
  return (
    <div className="relative mx-auto my-4 h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="#f1f5f9" strokeWidth="12" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - score / 100)} style={{ transition: 'stroke-dashoffset .6s' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{score}</span>
        <span className="text-xs text-slate-500">{score >= 75 ? 'Healthy' : 'Room to improve'}</span>
      </div>
    </div>
  )
}
