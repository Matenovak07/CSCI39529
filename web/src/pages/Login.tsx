import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Info } from 'lucide-react'
import { Button, Card, Logo } from '../components/ui'
import { useStore } from '../store'

export const DEMO_EMAIL = 'demo@profitlens.app'
export const DEMO_PASSWORD = 'demo1234'

export default function Login() {
  const nav = useNavigate()
  const { login, onboarded } = useStore()
  const [email, setEmail] = useState(DEMO_EMAIL)
  const [password, setPassword] = useState(DEMO_PASSWORD)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (mode === 'login') {
      if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
        setError('Incorrect email or password. Use the demo credentials shown above.')
        return
      }
      login('Maya Chen', DEMO_EMAIL, false)
      nav(onboarded ? '/app' : '/onboarding')
    } else {
      login(name || 'New user', email, false)
      nav('/onboarding')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-slate-50 px-4 py-12">
      <Logo />
      <Card className="mt-8 w-full max-w-md p-8">
        <h1 className="text-xl font-semibold">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="mt-1 text-sm text-slate-500">{mode === 'login' ? 'Log in to your ProfitLens workspace.' : 'Start your 14-day free trial. No card required.'}</p>

        {mode === 'login' && (
          <div className="mt-5 flex gap-2 rounded-lg bg-indigo-50 p-3 text-sm text-indigo-900 ring-1 ring-indigo-100">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-medium">Demo credentials (pre-filled)</p>
              <p>Email: <code className="font-mono">{DEMO_EMAIL}</code></p>
              <p>Password: <code className="font-mono">{DEMO_PASSWORD}</code></p>
            </div>
          </div>
        )}

        <form onSubmit={submit} className="mt-5 space-y-4">
          {mode === 'signup' && (
            <label className="block text-sm font-medium">Your name
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" placeholder="Maya Chen" />
            </label>
          )}
          <label className="block text-sm font-medium">Work email
            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError('') }} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
          </label>
          <label className="block text-sm font-medium">Password
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError('') }} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
          </label>
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <Button type="submit" className="w-full py-2.5">{mode === 'login' ? 'Log in' : 'Create account'}</Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />or<span className="h-px flex-1 bg-slate-200" /></div>
        <Button variant="secondary" className="w-full" onClick={() => { login('Guest', 'guest@profitlens.app', true); nav('/app') }}>Continue as guest</Button>

        <p className="mt-6 text-center text-sm text-slate-500">
          {mode === 'login' ? <>New to ProfitLens? <button className="font-medium text-indigo-600 cursor-pointer" onClick={() => { setMode('signup'); setEmail(''); setPassword('') }}>Start a free trial</button></>
            : <>Already have an account? <button className="font-medium text-indigo-600 cursor-pointer" onClick={() => { setMode('login'); setEmail(DEMO_EMAIL); setPassword(DEMO_PASSWORD) }}>Log in</button></>}
        </p>
      </Card>
    </div>
  )
}
