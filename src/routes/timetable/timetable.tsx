import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/timetable/timetable')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/timetable/timetable"!</div>
}
