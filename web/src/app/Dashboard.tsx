import { Link } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { BUSINESS, INSIGHTS, MONTHLY } from '../data'
import { Card, usd } from '../components/ui'
import { InsightCard } from '../components/InsightCard'
import { useStore } from '../store'

const thousands = (n: number) => `$${(n / 1000).toFixed(0)}k`

export default function Dashboard() {
  const { user, statuses, plan } = useStore()

  const thisMonth = MONTHLY[MONTHLY.length - 1]
  const lastMonth = MONTHLY[MONTHLY.length - 2]
  const revenueChange = ((thisMonth.revenue - lastMonth.revenue) / lastMonth.revenue) * 100

  const openInsights = INSIGHTS.filter((i) => !['done', 'dismissed'].includes(statuses[i.id] ?? 'open'))
  const topActions = openInsights
    .filter((i) => plan === 'growth' || !i.growthOnly)
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 3)
  const savingsAvailable = openInsights
    .filter((i) => !i.impactLabel)
    .reduce((total, i) => total + i.impact, 0)

  const firstName = user && !user.guest ? user.name.split(' ')[0] : ''

  return (
    <>
      <h1 className="text-2xl font-bold">
        {firstName ? `Welcome back, ${firstName}` : BUSINESS.name}
      </h1>
      <p className="mb-6 text-slate-500">Here is how November went.</p>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-t-4 border-t-brand p-5">
          <p className="text-sm text-slate-500">Revenue</p>
          <p className="text-3xl font-bold">{usd(thisMonth.revenue)}</p>
          <p className="text-sm text-leaf">+{revenueChange.toFixed(1)}% vs. October</p>
        </Card>
        <Card className="border-t-4 border-t-leaf p-5">
          <p className="text-sm text-slate-500">Profit</p>
          <p className="text-3xl font-bold">{usd(thisMonth.profit)}</p>
          <p className="text-sm text-slate-500">
            {((thisMonth.profit / thisMonth.revenue) * 100).toFixed(1)}% margin
          </p>
        </Card>
        <Card className="border-t-4 border-t-amber-500 p-5">
          <p className="text-sm text-slate-500">Money left on the table</p>
          <p className="text-3xl font-bold">{usd(savingsAvailable)}/mo</p>
          <p className="text-sm text-slate-500">{openInsights.length} open recommendations</p>
        </Card>
      </div>

      <Card className="mt-4 p-5">
        <h2 className="mb-4 font-semibold">Revenue and expenses, last 12 months</h2>
        <div className="h-60">
          <ResponsiveContainer>
            <AreaChart data={MONTHLY}>
              <CartesianGrid stroke="#e2d9cc" vertical={false} />
              <XAxis dataKey="month" stroke="#a8998a" />
              <YAxis tickFormatter={thousands} stroke="#a8998a" domain={[60000, 'auto']} />
              <Tooltip formatter={(value) => usd(Number(value))} />
              <Area dataKey="revenue" name="Revenue" stroke="#c2410c" fill="#fed7aa" strokeWidth={2} />
              <Area dataKey="expenses" name="Expenses" stroke="#78716c" fill="transparent" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="mb-3 mt-8 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Do these first</h2>
        <Link to="/app/insights" className="text-sm font-medium text-brand hover:underline">
          See all {openInsights.length}
        </Link>
      </div>
      <div className="space-y-3">
        {topActions.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
        {topActions.length === 0 && (
          <Card className="p-8 text-center text-slate-500">You're all caught up.</Card>
        )}
      </div>
    </>
  )
}