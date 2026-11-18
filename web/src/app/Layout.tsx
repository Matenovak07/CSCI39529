import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BUSINESS, PLANS } from '../data'
import { Logo, cx } from '../components/ui'
import { useStore } from '../store'

const NAV_LINKS = [
  { to: '/app', label: 'Overview', end: true },
  { to: '/app/insights', label: 'Insights' },
  { to: '/app/benchmarks', label: 'Benchmarks' },
  { to: '/app/assistant', label: 'Ask ProfitLens' },
  { to: '/app/reports', label: 'Reports' },
  { to: '/app/integrations', label: 'Integrations' },
  { to: '/app/billing', label: 'Billing' },
]

export default function Layout() {
  const { user, plan, logout, reset } = useStore()
  const navigate = useNavigate()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cx('rounded-lg px-3 py-2 text-sm', isActive ? 'bg-brand-light font-medium text-brand-dark' : 'hover:bg-slate-100')

  return (
    <div className="min-h-screen md:flex">
      <aside className="border-b border-slate-200 bg-white p-4 md:w-56 md:border-b-0 md:border-r">
        <Logo to="/app" />
        <p className="mt-4 text-sm font-medium">{BUSINESS.name}</p>
        <p className="text-xs text-slate-500">{PLANS[plan].name} plan</p>

        <nav className="mt-4 flex gap-1 overflow-x-auto md:flex-col">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 hidden text-sm md:block">
          <p className="truncate font-medium">{user?.name}</p>
          <button onClick={() => { logout(); navigate('/') }} className="cursor-pointer text-slate-500 hover:underline">
            Log out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between bg-brand-light px-6 py-2 text-xs text-brand-dark">
          <span>Demo with made-up data. Your changes are saved in this browser only.</span>
          <button onClick={() => { reset(); navigate('/') }} className="cursor-pointer font-medium hover:underline">
            Reset demo
          </button>
        </div>
        <main className="mx-auto max-w-5xl px-4 py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}