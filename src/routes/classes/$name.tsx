import { createFileRoute } from '@tanstack/react-router'
import { JSX, useEffect } from 'react'

export const Route = createFileRoute('/classes/$name')({
  component: RouteComponent,
})

function RouteComponent(): JSX.Element {
  useEffect(() => {
    const parts = window.location.pathname.split('/')
    const name = parts[2] ?? ''
    const encoded = encodeURIComponent(name)
    window.location.replace(`/class/${encoded}`)
  }, [])

  return <div>Redirecting to the new class URL…</div>
}
