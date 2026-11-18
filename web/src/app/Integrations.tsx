import { useState } from 'react'
import { INTEGRATIONS, PLANS, type Category } from '../data'
import { Badge, Button, Card, IntegrationIcon, PageHeader, cx } from '../components/ui'
import { useStore } from '../store'
import { API_CONFIG } from '../api/config'
import { connectIntegration, disconnectIntegration } from '../api/client'

const CATEGORIES: Category[] = ['Accounting', 'Sales', 'CRM', 'Advertising']

export function Meter({ label, used, limit }: { label: string; used: number; limit: number }) {
  const percent = Math.min(100, (used / limit) * 100)
  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="text-slate-600">{label}</span>
        <span className="font-medium">{used.toLocaleString()} / {limit.toLocaleString()}</span>
      </div>
      <div className="mt-1 h-2 rounded-full bg-slate-100">
        <div
          className={cx('h-full rounded-full', percent >= 100 ? 'bg-red-600' : 'bg-brand')}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default function Integrations() {
  const { connected, toggleIntegration, plan, set } = useStore()
  const [busyId, setBusyId] = useState<string | null>(null)
  const [modalId, setModalId] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState('')

  const atLimit = connected.length >= PLANS[plan].integrations
  const modalTool = INTEGRATIONS.find((tool) => tool.id === modalId)
  const modalConfig = modalId ? API_CONFIG[modalId] : undefined

  const connect = async (id: string) => {
    setModalId(null)
    setBusyId(id)
    await connectIntegration(id, apiKey)
    toggleIntegration(id)
    setBusyId(null)
    setApiKey('')
  }

  const disconnect = async (id: string) => {
    setBusyId(id)
    await disconnectIntegration(id)
    toggleIntegration(id)
    setBusyId(null)
  }

  const renderButton = (id: string) => {
    const isConnected = connected.includes(id)
    if (busyId === id) return <Button variant="secondary" disabled className="w-full">Working...</Button>
    if (isConnected) return <Button variant="secondary" className="w-full" onClick={() => disconnect(id)}>Disconnect</Button>
    if (atLimit) return <Button variant="secondary" className="w-full" onClick={() => set({ plan: 'growth' })}>Upgrade to connect more</Button>
    return <Button className="w-full" onClick={() => { setApiKey(''); setModalId(id) }}>Connect</Button>
  }

  return (
    <>
      <PageHeader
        title="Integrations"
        subtitle={`Connect your business tools (read-only). ${connected.length} of ${PLANS[plan].integrations} used on the ${PLANS[plan].name} plan.`}
      />

      {CATEGORIES.map((category) => (
        <section key={category} className="mb-8">
          <h2 className="mb-3 font-semibold">{category}</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {INTEGRATIONS.filter((tool) => tool.category === category).map((tool) => (
              <Card key={tool.id} className="flex flex-col p-4">
                <div className="flex items-center gap-3">
                  <IntegrationIcon id={tool.id} />
                  <p className="flex-1 font-medium">{tool.name}</p>
                  {connected.includes(tool.id) && <Badge tone="green">Connected</Badge>}
                </div>
                <p className="mt-3 flex-1 text-sm text-slate-600">{tool.howItWorks}</p>
                <div className="mt-4">{renderButton(tool.id)}</div>
              </Card>
            ))}
          </div>
        </section>
      ))}

      {modalTool && modalConfig && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setModalId(null)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
            <Card className="p-6">
              <h3 className="font-semibold">Connect {modalTool.name}</h3>
              <p className="mt-2 text-sm text-slate-600">{modalTool.howItWorks}</p>
              <label className="mt-4 block text-sm font-medium">
                {modalConfig.keyLabel}
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={modalConfig.keyPlaceholder}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </label>
              <p className="mt-3 rounded-lg bg-brand-light p-3 text-xs text-brand-dark">
                Demo mode: leave it blank or type anything. Nothing is stored or sent.
              </p>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setModalId(null)}>Cancel</Button>
                <Button onClick={() => connect(modalTool.id)}>Connect</Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}