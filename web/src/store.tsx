import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { DEFAULT_CONNECTED, type PlanId } from './data'

export type InsightStatus = 'open' | 'in_progress' | 'done' | 'dismissed'

interface State {
  user: { name: string; email: string; guest: boolean } | null
  onboarded: boolean
  plan: PlanId
  billing: 'monthly' | 'annual'
  connected: string[]
  statuses: Record<string, InsightStatus>
  feedback: Record<string, 'up' | 'down'>
}

const initial: State = {
  user: null, onboarded: false, plan: 'growth', billing: 'monthly',
  connected: DEFAULT_CONNECTED, statuses: {}, feedback: {},
}

const KEY = 'profitlens-demo-v1'

function load(): State {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...initial, ...JSON.parse(raw) } : initial
  } catch {
    return initial
  }
}

interface Ctx extends State {
  set: (patch: Partial<State>) => void
  login: (name: string, email: string, guest: boolean) => void
  logout: () => void
  reset: () => void
  setStatus: (id: string, s: InsightStatus) => void
  setFeedback: (id: string, f: 'up' | 'down') => void
  toggleIntegration: (id: string) => void
}

const StoreCtx = createContext<Ctx | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(load)
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)) }, [state])

  const set = (patch: Partial<State>) => setState((s) => ({ ...s, ...patch }))
  const value: Ctx = {
    ...state,
    set,
    login: (name, email, guest) => set({ user: { name, email, guest } }),
    logout: () => set({ user: null }),
    reset: () => setState({ ...initial }),
    setStatus: (id, st) => setState((s) => ({ ...s, statuses: { ...s.statuses, [id]: st } })),
    setFeedback: (id, f) => setState((s) => ({ ...s, feedback: { ...s.feedback, [id]: f } })),
    toggleIntegration: (id) => setState((s) => ({
      ...s, connected: s.connected.includes(id) ? s.connected.filter((c) => c !== id) : [...s.connected, id],
    })),
  }
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const c = useContext(StoreCtx)
  if (!c) throw new Error('useStore outside provider')
  return c
}
