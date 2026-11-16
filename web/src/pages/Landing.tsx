import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, BarChart3, Check, Lightbulb, Lock, PlugZap, ShieldCheck, Sparkles, Target } from 'lucide-react'
import { ADDONS, INTEGRATIONS, PLANS, type PlanId } from '../data'
import { Button, IntegrationIcon, Logo, cx } from '../components/ui'
import { useStore } from '../store'

export default function Landing() {
  const nav = useNavigate()
  const { login, user } = useStore()
  const [annual, setAnnual] = useState(false)

  const tryDemo = () => {
    if (!user) login('Guest', 'guest@profitlens.app', true)
    nav('/app')
  }

  return (
    <div className="bg-white">
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden gap-8 text-sm text-slate-600 md:flex">
            <a href="#how" className="hover:text-slate-900">How it works</a>
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
            <a href="#security" className="hover:text-slate-900">Security</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">Log in</Link>
            <Button onClick={tryDemo}>Try the live demo</Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#e0e7ff,_transparent_60%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100">
              <Sparkles className="h-3.5 w-3.5" /> Business intelligence for small businesses
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Your business data, turned into <span className="text-indigo-600">clear next steps</span> that grow profit.
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              ProfitLens connects the accounting, CRM, sales and ad tools you already use. It finds where you're losing money and where you could earn more, and tells you exactly what to do about it, without a data analyst or consultant.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={tryDemo} className="px-5 py-3 text-base">Explore the demo, no signup needed <ArrowRight className="h-4 w-4" /></Button>
              <a href="#pricing"><Button variant="secondary" className="px-5 py-3 text-base">See pricing</Button></a>
            </div>
            <p className="mt-4 text-sm text-slate-500">Plans from $25/month. Read-only access. Cancel anytime.</p>
          </div>
          <HeroPreview />
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-8">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs font-medium uppercase tracking-wider text-slate-500">Connects with the tools you already use</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-6">
            {INTEGRATIONS.map((i) => (
              <div key={i.id} className="flex items-center gap-2 text-sm text-slate-600"><IntegrationIcon id={i.id} size="sm" />{i.name}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight">From scattered data to a weekly to-do list</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">Get started in about five minutes. You don't need spreadsheets, SQL or an analyst.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: PlugZap, title: '1. Connect', body: 'Sign in to QuickBooks, Shopify, HubSpot, Google Ads and others with one click each. Access is read-only.' },
            { icon: BarChart3, title: '2. We analyze', body: 'Our models combine data across your tools to find trends, inefficiencies and missed revenue, then compare you to similar businesses.' },
            { icon: Lightbulb, title: '3. You act', body: 'You get a ranked list of specific actions, each with an estimated dollar impact, the evidence behind it, and step-by-step instructions.' },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border border-slate-200 p-6">
              <s.icon className="h-8 w-8 text-indigo-600" />
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold tracking-tight">Insight you can act on, not just more dashboards</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Target, title: 'Profit Health Score', body: 'One score built from margin, cash, growth and efficiency, explained in plain English.' },
              { icon: Lightbulb, title: 'Recommended actions', body: 'Ranked by dollar impact and effort, with the evidence and the source data behind each one.' },
              { icon: BarChart3, title: 'Peer benchmarks', body: 'See how your margins, labor costs and ad returns compare to similar businesses.' },
              { icon: Sparkles, title: 'Ask ProfitLens', body: 'Ask questions like "Why did profit drop in September?" and get answers based on your own data.' },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                <f.icon className="h-7 w-7 text-cyan-300" />
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight">Simple pricing that pays for itself</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">In the demo business, ProfitLens found over 50x the Growth plan's monthly price in potential monthly profit.</p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-lg bg-slate-100 p-1 text-sm">
            <button onClick={() => setAnnual(false)} className={cx('rounded-md px-4 py-1.5 cursor-pointer', !annual && 'bg-white shadow-sm font-medium')}>Monthly</button>
            <button onClick={() => setAnnual(true)} className={cx('rounded-md px-4 py-1.5 cursor-pointer', annual && 'bg-white shadow-sm font-medium')}>Annual <span className="text-emerald-600">2 months free</span></button>
          </div>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {(Object.keys(PLANS) as PlanId[]).map((id) => {
            const p = PLANS[id]
            const featured = id === 'growth'
            return (
              <div key={id} className={cx('relative rounded-2xl p-8', featured ? 'bg-indigo-600 text-white shadow-xl' : 'border border-slate-200')}>
                {featured && <span className="absolute -top-3 left-8 rounded-full bg-cyan-300 px-3 py-1 text-xs font-semibold text-slate-900">Most popular</span>}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className={cx('mt-1 text-sm', featured ? 'text-indigo-100' : 'text-slate-500')}>{p.tagline}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${annual ? Math.round(p.annual / 12 * 100) / 100 : p.monthly}</span>
                  <span className={featured ? 'text-indigo-100' : 'text-slate-500'}>/month{annual && `, billed $${p.annual}/yr`}</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2"><Check className={cx('h-5 w-5 shrink-0', featured ? 'text-cyan-300' : 'text-indigo-600')} />{f}</li>
                  ))}
                </ul>
                <Button onClick={tryDemo} variant={featured ? 'secondary' : 'primary'} className="mt-8 w-full">Start 14-day free trial</Button>
              </div>
            )
          })}
        </div>
        <div className="mx-auto mt-10 max-w-4xl">
          <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500">Optional add-ons</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {ADDONS.map((a) => (
              <div key={a.name} className="rounded-xl border border-slate-200 p-5">
                <div className="flex items-baseline justify-between gap-2"><h4 className="font-semibold">{a.name}</h4><span className="text-sm text-indigo-600">{a.price}</span></div>
                <p className="mt-2 text-sm text-slate-600">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3">
          {[
            { icon: Lock, title: 'Read-only by default', body: 'We request the minimum OAuth scopes and never move money or edit your records unless you approve a specific action.' },
            { icon: ShieldCheck, title: 'Encrypted and isolated', body: 'Data is encrypted in transit and at rest, and each customer\'s data is logically isolated from everyone else\'s.' },
            { icon: BarChart3, title: 'Anonymized benchmarks', body: 'Benchmarks only use aggregated, anonymized data where that\'s legally permitted, and you can opt out at any time.' },
          ].map((s) => (
            <div key={s.title} className="flex gap-4">
              <s.icon className="h-6 w-6 shrink-0 text-indigo-600" />
              <div><h3 className="font-semibold">{s.title}</h3><p className="mt-1 text-sm text-slate-600">{s.body}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl font-bold tracking-tight">See what ProfitLens would find in your business</h2>
        <p className="mt-3 text-slate-600">Explore a fully loaded demo of a two-location café with 12 months of data.</p>
        <Button onClick={tryDemo} className="mt-8 px-6 py-3 text-base">Open the live demo <ArrowRight className="h-4 w-4" /></Button>
      </section>

      <footer className="border-t border-slate-100 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} ProfitLens. This is a prototype: all data shown is simulated.
      </footer>
    </div>
  )
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Profit Health Score</p>
            <p className="text-3xl font-bold">68<span className="text-base font-medium text-slate-400">/100</span></p>
          </div>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">Room to improve</span>
        </div>
        <div className="mt-4 space-y-3">
          {[
            { t: '312 loyal customers have gone quiet', v: '+$1,150/mo', c: 'bg-emerald-500' },
            { t: 'Tue/Wed afternoons are overstaffed', v: '+$720/mo', c: 'bg-indigo-500' },
            { t: 'Google Ads campaign losing money', v: '+$640/mo', c: 'bg-pink-500' },
          ].map((r) => (
            <div key={r.t} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3">
              <span className={cx('h-2 w-2 rounded-full', r.c)} />
              <span className="flex-1 text-sm">{r.t}</span>
              <span className="text-sm font-semibold text-emerald-600">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-slate-900 px-4 py-3 text-white shadow-xl md:block">
        <p className="text-xs text-slate-400">Found this month</p>
        <p className="text-xl font-bold">$4,017/mo <span className="text-sm font-normal text-cyan-300">potential profit</span></p>
      </div>
    </div>
  )
}
