import { createFileRoute } from '@tanstack/react-router'
import { SubjectEntityPage } from '@/features/subject/pages/SubjectEntityPage'

const apiBase = import.meta.env.VITE_API_BASE_URL ?? '/v1'

export const Route = createFileRoute('/subject/$subjectName' as any)({
  loader: async ({ params }) => {
    const raw = (params as any).subjectName
    const name = raw ? decodeURIComponent(String(raw)) : ''
    if (!name || name === 'undefined') throw new Error('Missing subjectName parameter')
    const res = await fetch(`${apiBase}/subject/${encodeURIComponent(name)}`)
    if (!res.ok) throw new Error(`Failed to load subject: ${res.statusText}`)
    return res.json()
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
  component: SubjectEntityPage,
})

export default Route
