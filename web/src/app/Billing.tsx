import { Check } from 'lucide-react'
import { ADDONS, INTEGRATIONS, PLANS, type PlanId } from '../data'
import { Badge, Button, Card, PageHeader, cx } from '../components/ui'
import { useStore } from '../store'
import { Meter } from './Integrations'

export default function Billing() {
  const { plan, set, billing, connected } = useStore()
  const current = PLANS[plan]
  const records = INTEGRATIONS.filter((i) => connected.includes(i.id)).reduce((s, i) => s + i.records, 0)
  const price = billing === 'annual' ? `$${current.annual}/year` : `$${current.monthly}/month`

  return (
    <>
      <PageHeader title="Plan and billing" subtitle="Switch plans to see how features change. This is a demo, so you won't be charged." />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Current plan</p>
              <p className="text-xl font-semibold">{current.name} <span className="text-base font-normal text-slate-500">· {price}</span></p>
              <p className="text-xs text-slate-500">Trial ends in 11 days · renews automatically</p>
            </div>
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 text-sm">
              <button onClick={() => set({ billing: 'monthly' })} className={cx('rounded-md px-3 py-1 cursor-pointer', billing === 'monthly' && 'bg-white font-medium shadow-sm')}>Monthly</button>
              <button onClick={() => set({ billing: 'annual' })} className={cx('rounded-md px-3 py-1 cursor-pointer', billing === 'annual' && 'bg-white font-medium shadow-sm')}>Annual (-17%)</button>
            </div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Meter label="Connected platforms" used={connected.length} limit={current.integrations} />
            <Meter label="Records processed" used={records} limit={current.records} />
            <Meter label="Users" used={1} limit={current.users} />
            <Meter label="Locations" used={Math.min(2, current.locations)} limit={current.locations} />
          </div>
        </Card>
        <Card className="p-5">
          <p className="font-semibold">Payment method</p>
          <p className="mt-2 text-sm text-slate-600">Visa ending 4242 · exp 08/28</p>
          <p className="mt-4 font-semibold">Recent invoices</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            <li className="flex justify-between"><span>Trial started</span><span>$0.00</span></li>
          </ul>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {(Object.keys(PLANS) as PlanId[]).map((id) => {
          const p = PLANS[id]
          const active = id === plan
          return (
            <Card key={id} className={cx('p-6', active && 'ring-2 ring-indigo-600')}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                {active ? <Badge tone="indigo">Current plan</Badge> : id === 'growth' && <Badge tone="green">Recommended</Badge>}
              </div>
              <p className="mt-1 text-sm text-slate-500">{p.tagline}</p>
              <p className="mt-4 text-3xl font-bold">${billing === 'annual' ? (p.annual / 12).toFixed(2) : p.monthly}<span className="text-sm font-normal text-slate-500">/month{billing === 'annual' && ', billed annually'}</span></p>
              <ul className="mt-4 space-y-2 text-sm">{p.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 shrink-0 text-indigo-600" />{f}</li>)}</ul>
              <Button className="mt-6 w-full" variant={active ? 'secondary' : 'primary'} disabled={active} onClick={() => set({ plan: id })}>{active ? 'Your current plan' : id === 'growth' ? 'Upgrade to Growth' : 'Switch to Starter'}</Button>
            </Card>
          )
        })}
      </div>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wider text-slate-500">Add-ons and services</h2>
      <div className="mt-3 grid gap-4 md:grid-cols-3">
        {ADDONS.map((a) => (
          <Card key={a.name} className="p-5">
            <div className="flex items-baseline justify-between gap-2"><p className="font-semibold">{a.name}</p><span className="text-sm text-indigo-600">{a.price}</span></div>
            <p className="mt-2 text-sm text-slate-600">{a.desc}</p>
          </Card>
        ))}
      </div>
    </>
  )
}
