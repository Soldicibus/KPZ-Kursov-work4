import { createFileRoute } from '@tanstack/react-router'
import { TeacherEntityPage } from '@/features/teacher/pages/TeacherEntityPage'

const apiBase = import.meta.env.VITE_API_BASE_URL ?? '/v1'

export const Route = createFileRoute('/teachers/$teacherId')({
    loader: async ({ params }) => {
        const teacherId = (params as any).teacherId
        const res = await fetch(`${apiBase}/teachers/${teacherId}`)
        if (!res.ok) throw new Error(`Failed to load teacher: ${res.statusText}`)
        return res.json()
    },
    pendingComponent: () => <div>Loading...</div>,
    errorComponent: ({ error }) => <div>Error: {error.message}</div>,
    component: TeacherEntityPage,
})

export default Route