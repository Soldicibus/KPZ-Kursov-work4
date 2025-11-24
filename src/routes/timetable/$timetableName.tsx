import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/timetable/$timetableName')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/timetable/$timetableName"!</div>
}
