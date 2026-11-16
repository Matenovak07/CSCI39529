import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BarChart3, CreditCard, FileText, LayoutDashboard, Lightbulb, LogOut, MessageSquare, PlugZap, RotateCcw } from 'lucide-react'
import { BUSINESS, PLANS } from '../data'
import { Badge, Logo, cx } from '../components/ui'
import { useStore } from '../store'

const NAV = [
  { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/app/insights', label: 'Insights and actions', icon: Lightbulb },
  { to: '/app/benchmarks', label: 'Benchmarks', icon: BarChart3, growth: true },
  { to: '/app/assistant', label: 'Ask ProfitLens', icon: MessageSquare, growth: true },
  { to: '/app/reports', label: 'Reports', icon: FileText },
  { to: '/app/integrations', label: 'Integrations', icon: PlugZap },
  { to: '/app/billing', label: 'Plan and billing', icon: CreditCard },
]

export default function Layout() {
  const { user, plan, logout, reset, statuses } = useStore()
  const nav = useNavigate()
  const openCount = 8 - Object.values(statuses).filter((s) => s === 'done' || s === 'dismissed').length

  return (
    <div className="min-h-screen md:flex">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="px-5 py-5"><Logo to="/app" /></div>
        <div className="mx-3 rounded-lg bg-slate-50 p-3 ring-1 ring-slate-200">
          <p className="text-sm font-medium">{BUSINESS.name}</p>
          <p className="text-xs text-slate-500">{BUSINESS.locations.length} locations · {BUSINESS.industry.split(' (')[0]}</p>
        </div>
        <nav className="mt-4 flex-1 space-y-0.5 px-3">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => cx('flex items-center gap-3 rounded-lg px-3 py-2 text-sm', isActive ? 'bg-indigo-50 font-medium text-indigo-700' : 'text-slate-600 hover:bg-slate-50')}>
              <n.icon className="h-4 w-4" />
              <span className="flex-1">{n.label}</span>
              {n.to === '/app/insights' && openCount > 0 && <span className="rounded-full bg-indigo-600 px-1.5 text-[10px] font-semibold text-white">{openCount}</span>}
              {n.growth && plan === 'starter' && <span className="text-[10px] font-semibold uppercase text-indigo-500">Growth</span>}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-3">
          <div className="flex items-center gap-3 px-2 py-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">{user?.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="truncate text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
          <button onClick={() => { logout(); nav('/') }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 cursor-pointer"><LogOut className="h-4 w-4" />Log out</button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 bg-indigo-50 px-6 py-2 text-xs text-indigo-900">
          <span>Prototype demo: all data is simulated for <b>{BUSINESS.name}</b> Your changes are saved in this browser only.</span>
          <span className="flex items-center gap-3">
            <Badge tone="indigo">{PLANS[plan].name} plan</Badge>
            <button onClick={() => { reset(); nav('/') }} className="flex items-center gap-1 font-medium hover:underline cursor-pointer"><RotateCcw className="h-3 w-3" />Reset demo</button>
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <Logo to="/app" />
          <button onClick={() => { logout(); nav('/') }} className="text-sm text-slate-600">Log out</button>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-2 py-2 md:hidden">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => cx('whitespace-nowrap rounded-lg px-3 py-1.5 text-sm', isActive ? 'bg-indigo-50 font-medium text-indigo-700' : 'text-slate-600')}>{n.label}</NavLink>
          ))}
        </nav>
        <main className="fade-in mx-auto max-w-6xl px-4 py-8 md:px-8"><Outlet /></main>
      </div>
    </div>
  )
}
