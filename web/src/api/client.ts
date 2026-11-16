import { INTEGRATIONS } from '../data'
import { API_CONFIG, DEMO_MODE } from './config'

export interface SyncResult { id: string; records: number; syncedAt: string; demo: boolean }

// Placeholder backend endpoint. A real deployment would point this at our own server,
// which holds the provider keys and does the actual API calls.
export const BACKEND_URL = 'https://api.profitlens.example/v1'

export async function connectIntegration(id: string, apiKey: string): Promise<SyncResult> {
  if (DEMO_MODE) {
    await new Promise((r) => setTimeout(r, 700))
    const records = INTEGRATIONS.find((i) => i.id === id)?.records ?? 0
    return { id, records, syncedAt: new Date().toISOString(), demo: true }
  }
  const res = await fetch(`${BACKEND_URL}/integrations/${id}/connect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey, provider: id, baseUrl: API_CONFIG[id]?.baseUrl }),
  })
  if (!res.ok) throw new Error(`Could not connect ${id}: ${res.status}`)
  return res.json()
}

export async function disconnectIntegration(id: string): Promise<void> {
  if (DEMO_MODE) {
    await new Promise((r) => setTimeout(r, 700))
    return
  }
  await fetch(`${BACKEND_URL}/integrations/${id}`, { method: 'DELETE' })
}
