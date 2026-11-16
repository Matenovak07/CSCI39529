import { useState } from 'react'
import { AlertTriangle, Check, KeyRound, Loader2, Lock, Plus, RefreshCw, ShieldCheck, X } from 'lucide-react'
import { INTEGRATIONS, PLANS, type Category } from '../data'
import { Badge, Button, Card, IntegrationIcon, PageHeader, cx } from '../components/ui'
import { useStore } from '../store'
import { API_CONFIG } from '../api/config'
import { connectIntegration, disconnectIntegration } from '../api/client'

export function Meter({ label, used, limit, fmt = (n: number) => n.toLocaleString() }: { label: string; used: number; limit: number; fmt?: (n: number) => string }) {
  const pct = Math.min(100, (used / limit) * 100)
  return (
    <div>
      <div className="flex justify-between text-sm"><span className="text-slate-600">{label}</span><span className="font-medium">{fmt(used)} <span className="text-slate-400">/ {fmt(limit)}</span></span></div>
      <div className="mt-1.5 h-2 rounded-full bg-slate-100"><div className={cx('h-full rounded-full', pct >= 100 ? 'bg-rose-500' : pct >= 80 ? 'bg-amber-400' : 'bg-indigo-600')} style={{ width: `${pct}%` }} /></div>
    </div>
  )
}

export default function Integrations() {
  const { connected, toggleIntegration, plan, set } = useStore()
  const [busy, setBusy] = useState<string | null>(null)
  const [requested, setRequested] = useState(false)
  const limits = PLANS[plan]
  const atLimit = connected.length >= limits.integrations
  const records = INTEGRATIONS.filter((i) => connected.includes(i.id)).reduce((s, i) => s + i.records, 0)

  const [modal, setModal] = useState<string | null>(null)
  const [apiKey, setApiKey] = useState('')

  const connect = async (id: string) => {
    setModal(null); setBusy(id)
    await connectIntegration(id, apiKey)
    toggleIntegration(id); setBusy(null); setApiKey('')
  }
  const disconnect = async (id: string) => {
    setBusy(id)
    await disconnectIntegration(id)
    toggleIntegration(id); setBusy(null)
  }
  const modalTool = INTEGRATIONS.find((i) => i.id === modal)
  const modalCfg = modal ? API_CONFIG[modal] : undefined

  const cats: Category[] = ['Accounting', 'Sales', 'CRM', 'Advertising']

  return (
    <>
      <PageHeader title="Integrations" subtitle="Connect your business tools. ProfitLens only requests read-only access." />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="space-y-4 p-5 lg:col-span-2">
          <p className="font-semibold">Usage this month: {limits.name} plan</p>
          <Meter label="Connected platforms" used={connected.length} limit={limits.integrations} />
          <Meter label="Records processed" used={records} limit={limits.records} />
          <div className="grid grid-cols-2 gap-4">
            <Meter label="Users" used={1} limit={limits.users} />
            <Meter label="Locations" used={Math.min(2, limits.locations)} limit={limits.locations} />
          </div>
          {plan === 'starter' && (connected.length > limits.integrations || records > limits.records) && (
            <div className="flex items-center gap-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 ring-1 ring-amber-200">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span className="flex-1">You're over your Starter limits. Only your first 3 tools will sync until you upgrade or disconnect some.</span>
              <Button onClick={() => set({ plan: 'growth' })} className="py-1.5">Upgrade</Button>
            </div>
          )}
        </Card>
        <Card className="p-5">
          <p className="flex items-center gap-2 font-semibold"><ShieldCheck className="h-4 w-4 text-emerald-600" />Data security</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {['Connects by API key or OAuth: we never see your passwords', 'Read-only scopes by default', 'AES-256 encryption at rest, TLS 1.2+ in transit', 'Disconnecting deletes synced data within 30 days', 'SOC 2 Type II on the roadmap'].map((t) => <li key={t} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />{t}</li>)}
          </ul>
        </Card>
      </div>

      {cats.map((c) => (
        <section key={c} className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">{c}</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {INTEGRATIONS.filter((i) => i.category === c).map((i) => {
              const on = connected.includes(i.id)
              const blocked = !on && atLimit
              return (
                <Card key={i.id} className="flex flex-col p-4">
                  <div className="flex items-center gap-3">
                    <IntegrationIcon id={i.id} />
                    <div className="flex-1">
                      <p className="font-medium">{i.name}</p>
                      {on ? <p className="flex items-center gap-1 text-xs text-emerald-600"><RefreshCw className="h-3 w-3" />Synced 12 min ago · {i.records.toLocaleString()} records</p> : <p className="text-xs text-slate-500">Not connected</p>}
                    </div>
                    {on && <Badge tone="green">Connected</Badge>}
                  </div>
                  <p className="mt-3 text-sm text-slate-600">{i.howItWorks}</p>
                  <ul className="mt-3 flex-1 space-y-1 text-xs text-slate-500">
                    {i.scopes.map((s) => <li key={s} className="flex items-center gap-1.5"><Lock className="h-3 w-3" />{s}</li>)}
                  </ul>
                  <div className="mt-4">
                    {busy === i.id ? <Button variant="secondary" disabled className="w-full"><Loader2 className="h-4 w-4 animate-spin" />{on ? 'Disconnecting…' : 'Connecting…'}</Button>
                      : on ? <Button variant="danger" className="w-full ring-1 ring-rose-100" onClick={() => disconnect(i.id)}>Disconnect</Button>
                        : blocked ? <Button variant="secondary" className="w-full" onClick={() => set({ plan: 'growth' })}><Lock className="h-4 w-4" />Upgrade to connect more</Button>
                          : <Button className="w-full" onClick={() => { setApiKey(''); setModal(i.id) }}><Plus className="h-4 w-4" />Connect</Button>}
                  </div>
                </Card>
              )
            })}
          </div>
        </section>
      ))}

      <Card className="mt-8 flex flex-wrap items-center gap-4 p-5">
        <div className="flex-1">
          <p className="font-semibold">Don't see your tool?</p>
          <p className="text-sm text-slate-500">We build custom integrations for industry-specific POS, ERP and in-house systems (quoted separately).</p>
        </div>
        <Button variant="secondary" onClick={() => setRequested(true)} disabled={requested}>{requested ? 'Request sent ✓' : 'Request an integration'}</Button>
      </Card>

      {modalTool && modalCfg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" onClick={() => setModal(null)}>
          <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <Card className="fade-in p-6">
            <div className="flex items-center gap-3">
              <IntegrationIcon id={modalTool.id} />
              <p className="flex-1 font-semibold">Connect {modalTool.name}</p>
              <button onClick={() => setModal(null)} className="cursor-pointer text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
            </div>
            <p className="mt-3 text-sm text-slate-600">{modalTool.howItWorks}</p>
            <label className="mt-4 block text-sm font-medium">{modalCfg.keyLabel}
              <div className="mt-1 flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
                <KeyRound className="h-4 w-4 text-slate-400" />
                <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder={modalCfg.keyPlaceholder} className="w-full bg-transparent text-sm outline-none" />
              </div>
            </label>
            <p className="mt-2 text-xs text-slate-500">
              {modalCfg.authType === 'oauth' ? 'In the real product this is an OAuth sign-in; the token is issued automatically.' : 'In the real product you paste a read-only key from your account settings.'}{' '}
              API: <span className="font-mono">{modalCfg.baseUrl}</span>
            </p>
            <div className="mt-4 rounded-lg bg-indigo-50 p-3 text-xs text-indigo-900 ring-1 ring-indigo-100">Demo mode: leave it blank or type anything. The key is not stored or sent anywhere, and the app shows example data.</div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setModal(null)}>Cancel</Button>
              <Button onClick={() => connect(modalTool.id)}><Plus className="h-4 w-4" />Connect</Button>
            </div>
          </Card>
          </div>
        </div>
      )}
    </>
  )
}
