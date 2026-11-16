import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Loader2, Lock } from 'lucide-react'
import { INTEGRATIONS, type Category } from '../data'
import { Button, Card, IntegrationIcon, Logo, cx } from '../components/ui'
import { useStore } from '../store'

const GOALS = ['Increase profit margin', 'Grow revenue', 'Cut wasted ad spend', 'Improve cash flow', 'Keep more customers', 'Control labor costs']
const STEPS = ['Your business', 'Connect tools', 'Analyze']

export default function Onboarding() {
  const nav = useNavigate()
  const { set, connected, toggleIntegration } = useStore()
  const [step, setStep] = useState(0)
  const [industry, setIndustry] = useState('Café / restaurant')
  const [size, setSize] = useState('11–25')
  const [goals, setGoals] = useState<string[]>(['Increase profit margin', 'Cut wasted ad spend'])
  const [connecting, setConnecting] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const connect = (id: string) => {
    if (connected.includes(id)) { toggleIntegration(id); return }
    setConnecting(id)
    setTimeout(() => { toggleIntegration(id); setConnecting(null) }, 900)
  }

  const analyze = () => {
    setStep(2)
    let p = 0
    const t = setInterval(() => {
      p += 4
      setProgress(p)
      if (p >= 100) { clearInterval(t); set({ onboarded: true }); setTimeout(() => nav('/app'), 500) }
    }, 90)
  }

  const cats: Category[] = ['Accounting', 'Sales', 'CRM', 'Advertising']
  const analysisSteps = ['Syncing transactions and invoices', 'Matching customers across tools', 'Linking ad spend to orders', 'Comparing against 1,200+ similar businesses', 'Ranking recommendations by dollar impact']

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Logo />
        <ol className="mt-8 flex items-center gap-3 text-sm">
          {STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span className={cx('flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold', i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600')}>{i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}</span>
              <span className={i === step ? 'font-medium' : 'text-slate-500'}>{s}</span>
              {i < STEPS.length - 1 && <span className="mx-1 h-px w-8 bg-slate-300" />}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <Card className="fade-in mt-6 p-8">
            <h1 className="text-xl font-semibold">Tell us about your business</h1>
            <p className="mt-1 text-sm text-slate-500">We use this to pick the right benchmarks and recommendations.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">Industry
                <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
                  {['Café / restaurant', 'Retail store', 'E-commerce', 'Professional services', 'Home services', 'Health and wellness', 'Other'].map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
              <label className="text-sm font-medium">Team size
                <select value={size} onChange={(e) => setSize(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
                  {['Just me', '2–10', '11–25', '26–50', '51–200'].map((o) => <option key={o}>{o}</option>)}
                </select>
              </label>
            </div>
            <p className="mt-6 text-sm font-medium">What are your goals? <span className="font-normal text-slate-500">(pick any)</span></p>
            <div className="mt-2 flex flex-wrap gap-2">
              {GOALS.map((g) => {
                const on = goals.includes(g)
                return <button key={g} onClick={() => setGoals(on ? goals.filter((x) => x !== g) : [...goals, g])} className={cx('rounded-full px-3 py-1.5 text-sm ring-1 cursor-pointer', on ? 'bg-indigo-600 text-white ring-indigo-600' : 'bg-white text-slate-700 ring-slate-300 hover:bg-slate-50')}>{g}</button>
              })}
            </div>
            <div className="mt-8 flex justify-end"><Button onClick={() => setStep(1)}>Continue</Button></div>
          </Card>
        )}

        {step === 1 && (
          <Card className="fade-in mt-6 p-8">
            <h1 className="text-xl font-semibold">Connect your tools</h1>
            <p className="mt-1 text-sm text-slate-500">Connect at least one tool. The more you connect, the more ProfitLens can find. <span className="text-indigo-600">Demo mode: real connections would use each tool's API key or OAuth sign-in. Here the connection is simulated and the data is example data.</span></p>
            <div className="mt-6 space-y-6">
              {cats.map((c) => (
                <div key={c}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{c}</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2">
                    {INTEGRATIONS.filter((i) => i.category === c).map((i) => {
                      const on = connected.includes(i.id)
                      return (
                        <button key={i.id} onClick={() => connect(i.id)} disabled={connecting !== null} className={cx('flex items-center gap-3 rounded-lg border p-3 text-left transition cursor-pointer', on ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 hover:border-indigo-300')}>
                          <IntegrationIcon id={i.id} />
                          <span className="flex-1 text-sm font-medium">{i.name}</span>
                          {connecting === i.id ? <Loader2 className="h-4 w-4 animate-spin text-indigo-600" /> : on ? <span className="flex items-center gap-1 text-xs font-medium text-emerald-700"><Check className="h-4 w-4" />Connected</span> : <span className="text-xs font-medium text-indigo-600">Connect</span>}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-slate-500"><Lock className="h-3.5 w-3.5" />Read-only access. You can disconnect at any time from Integrations.</p>
            <div className="mt-6 flex justify-between">
              <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
              <Button onClick={analyze} disabled={connected.length === 0}>Analyze my business ({connected.length} connected)</Button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="fade-in mt-6 p-8">
            <h1 className="text-xl font-semibold">Analyzing your business…</h1>
            <p className="mt-1 text-sm text-slate-500">Processing 12 months of data from {connected.length} tools.</p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} /></div>
            <ul className="mt-6 space-y-3">
              {analysisSteps.map((s, i) => {
                const done = progress >= (i + 1) * 20
                const active = !done && progress >= i * 20
                return <li key={s} className="flex items-center gap-3 text-sm">{done ? <Check className="h-4 w-4 text-emerald-600" /> : active ? <Loader2 className="h-4 w-4 animate-spin text-indigo-600" /> : <span className="h-4 w-4 rounded-full border border-slate-300" />}<span className={done ? 'text-slate-900' : 'text-slate-500'}>{s}</span></li>
              })}
            </ul>
          </Card>
        )}
      </div>
    </div>
  )
}
