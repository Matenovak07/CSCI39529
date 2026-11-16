import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Layout from './app/Layout'
import Dashboard from './app/Dashboard'
import Insights from './app/Insights'
import Benchmarks from './app/Benchmarks'
import Integrations from './app/Integrations'
import Reports from './app/Reports'
import Billing from './app/Billing'
import Assistant from './app/Assistant'
import { useStore } from './store'
import type { ReactNode } from 'react'

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useStore()
  return user ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding" element={<RequireAuth><Onboarding /></RequireAuth>} />
      <Route path="/app" element={<RequireAuth><Layout /></RequireAuth>}>
        <Route index element={<Dashboard />} />
        <Route path="insights" element={<Insights />} />
        <Route path="benchmarks" element={<Benchmarks />} />
        <Route path="assistant" element={<Assistant />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="reports" element={<Reports />} />
        <Route path="billing" element={<Billing />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
