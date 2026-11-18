import { ADDONS, INTEGRATIONS, PLANS, type PlanId } from '../data'
import { Badge, Button, Card, PageHeader, cx } from '../components/ui'
import { useStore } from '../store'
import { Meter } from './Integrations'

export default function Billing() {
  const { plan, set, billing, connected } = useStore()
  const current = PLANS[plan]
  const recordsUsed = INTEGRATIONS
    .filter((tool) => connected.includes(tool.id))
    .reduce((total, tool) => total + tool.records, 0)

  const priceFor = (id: PlanId) =>
    billing === 'annual' ? (PLANS[id].annual / 12).toFixed(2) : PLANS[id].monthly

  return (
    <>
      <PageHeader title="Billing" subtitle="Demo only. Switch plans to see what changes. You won't be charged." />

      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-lg font-semibold">Current plan: {current.name}</p>
          <div className="flex gap-1">
            {(['monthly', 'annual'] as const).map((option) => (
              <button
                key={option}
                onClick={() => set({ billing: option })}
                className={cx(
                  'cursor-pointer rounded-lg px-3 py-1 text-sm capitalize',
                  billing === option ? 'bg-slate-200 font-medium' : 'text-slate-600',
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Meter label="Connected tools" used={connected.length} limit={current.integrations} />
          <Meter label="Records processed" used={recordsUsed} limit={current.records} />
        </div>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {(Object.keys(PLANS) as PlanId[]).map((id) => {
          const isCurrent = id === plan
          return (
            <Card key={id} className={cx('p-6', isCurrent && 'border-2 border-brand')}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{PLANS[id].name}</h3>
                {isCurrent && <Badge tone="indigo">Current</Badge>}
              </div>
              <p className="mt-1 text-sm text-slate-500">{PLANS[id].tagline}</p>
              <p className="mt-4 text-3xl font-bold">
                ${priceFor(id)}
                <span className="text-sm font-normal text-slate-500"> / month</span>
              </p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
                {PLANS[id].features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <Button
                className="mt-6 w-full"
                variant={isCurrent ? 'secondary' : 'primary'}
                disabled={isCurrent}
                onClick={() => set({ plan: id })}
              >
                {isCurrent ? 'Your plan' : `Switch to ${PLANS[id].name}`}
              </Button>
            </Card>
          )
        })}
      </div>

      <h2 className="mb-3 mt-8 font-semibold">Add-ons</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {ADDONS.map((addon) => (
          <Card key={addon.name} className="p-5">
            <p className="font-semibold">{addon.name}</p>
            <p className="text-sm text-brand">{addon.price}</p>
            <p className="mt-2 text-sm text-slate-600">{addon.desc}</p>
          </Card>
        ))}
      </div>
    </>
  )
}