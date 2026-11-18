import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { INTEGRATIONS } from '../data'

export const usd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function Logo({ to = '/' }: { to?: string; light?: boolean }) {
  return (
    <Link to={to} className="flex items-center gap-2 text-lg font-bold">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">P</span>
      ProfitLens
    </Link>
  )
}

const buttonStyles = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'border border-slate-300 bg-white hover:bg-slate-50',
  ghost: 'hover:bg-slate-100',
  danger: 'text-red-700 hover:bg-red-50',
}

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: keyof typeof buttonStyles }) {
  return (
    <button
      {...props}
      className={cx(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50',
        buttonStyles[variant],
        className,
      )}
    />
  )
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('rounded-xl border border-slate-200 bg-white', className)}>{children}</div>
}

const badgeStyles = {
  slate: 'bg-slate-100 text-slate-700',
  green: 'bg-leaf-light text-leaf',
  amber: 'bg-amber-100 text-amber-800',
  rose: 'bg-red-100 text-red-800',
  indigo: 'bg-brand-light text-brand-dark',
  cyan: 'bg-brand-light text-brand-dark',
}

export function Badge({ children, tone = 'slate' }: { children: ReactNode; tone?: keyof typeof badgeStyles }) {
  return (
    <span className={cx('inline-block rounded-full px-2 py-0.5 text-xs font-medium', badgeStyles[tone])}>
      {children}
    </span>
  )
}

const iconSizes = { sm: 'h-6 w-6 text-[10px]', md: 'h-9 w-9 text-xs', lg: 'h-12 w-12 text-sm' }

export function IntegrationIcon({ id, size = 'md' }: { id: string; size?: keyof typeof iconSizes }) {
  const tool = INTEGRATIONS.find((t) => t.id === id)
  if (!tool) return null
  return (
    <span
      title={tool.name}
      className={cx('inline-flex shrink-0 items-center justify-center rounded-lg font-bold text-white', iconSizes[size])}
      style={{ background: tool.color }}
    >
      {tool.initials}
    </span>
  )
}

export function PageHeader({ title, subtitle, right }: { title: string; subtitle?: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {right}
    </div>
  )
}