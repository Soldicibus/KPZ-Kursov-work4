import { createFileRoute } from '@tanstack/react-router'
import { getClassById } from '@/features/class/api'
import { ClassEntityPage } from '@/features/class/pages/ClassEntityPage'

export const Route = createFileRoute('/class/$className')({
  loader: async ({ params }) => {
    const raw = params.className
    const name = raw ? decodeURIComponent(String(raw)) : ''
    if (!name || name === 'undefined') throw new Error('Missing className parameter')
    return getClassById(name)
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
  component: ClassEntityPage,
  })
