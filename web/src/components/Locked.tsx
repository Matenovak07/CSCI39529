import { Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from './ui'
import { useStore } from '../store'

export function useIsGrowth() {
  return useStore().plan === 'growth'
}

export function Locked({ feature, description }: { feature: string; description: string }) {
  const navigate = useNavigate()
  const { set } = useStore()

  return (
    <Card className="flex flex-col items-center p-10 text-center">
      <Lock className="h-6 w-6 text-brand" />
      <h2 className="mt-3 text-lg font-semibold">{feature} is on the Growth plan</h2>
      <p className="mt-2 max-w-md text-slate-600">{description}</p>
      <div className="mt-5 flex gap-2">
        <Button onClick={() => set({ plan: 'growth' })}>Upgrade to Growth</Button>
        <Button variant="secondary" onClick={() => navigate('/app/billing')}>Compare plans</Button>
      </div>
    </Card>
  )
}