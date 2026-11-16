import { Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from './ui'
import { useStore } from '../store'

export function useIsGrowth() {
  return useStore().plan === 'growth'
}

export function Locked({ feature, description }: { feature: string; description: string }) {
  const nav = useNavigate()
  const { set } = useStore()
  return (
    <Card className="flex flex-col items-center p-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50"><Lock className="h-5 w-5 text-indigo-600" /></span>
      <h2 className="mt-4 text-lg font-semibold">{feature} is a Growth plan feature</h2>
      <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>
      <div className="mt-6 flex gap-2">
        <Button onClick={() => set({ plan: 'growth' })}>Upgrade to Growth ($75/mo)</Button>
        <Button variant="secondary" onClick={() => nav('/app/billing')}>Compare plans</Button>
      </div>
    </Card>
  )
}
