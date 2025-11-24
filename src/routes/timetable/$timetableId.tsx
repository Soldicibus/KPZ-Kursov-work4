import { createFileRoute } from '@tanstack/react-router'
import { TimetableEntityPage } from '@/features/timetable/pages/TimetableEntityPage'

const apiBase = import.meta.env.VITE_API_BASE_URL ?? '/v1'

export const Route = createFileRoute('/timetable/$timetableId')({
    loader: async ({ params }) => {
        const timetableId = (params as any).timetableId
        const res = await fetch(`${apiBase}/timetable/${timetableId}`)
        if (!res.ok) throw new Error(`Failed to load timetable: ${res.statusText}`)
        return res.json()
    },
    pendingComponent: () => <div>Loading...</div>,
    errorComponent: ({ error }) => <div>Error: {error.message}</div>,
    component: TimetableEntityPage,
})

function RouteComponent() {
  return <div>Hello "/timetable/$timetableId"!</div>
}
