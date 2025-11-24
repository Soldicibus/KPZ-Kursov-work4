import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/timetable/timetable/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/timetable/timetable/new"!</div>
}
