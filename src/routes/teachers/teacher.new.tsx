import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teachers/teacher/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/teachers/teacher/new"!</div>
}
