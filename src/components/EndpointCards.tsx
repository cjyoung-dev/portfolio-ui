import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

const ENDPOINTS = [
  {
    method: 'GET',
    path: '/api/profile',
    label: 'profile',
    description: 'Who I am',
  },
  {
    method: 'GET',
    path: '/api/projects',
    label: 'projects',
    description: 'What I\'ve built',
  },
  {
    method: 'GET',
    path: '/api/skills',
    label: 'skills',
    description: 'What I know',
  },
  {
    method: 'GET',
    path: '/api/experience',
    label: 'experience',
    description: 'Where I\'ve been',
  },
] as const

export function EndpointCards() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-24">

      {/* Divider with label */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
        <span className="font-mono text-xs uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}>
          API endpoints
        </span>
        <div className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {ENDPOINTS.map((ep) => (
          <Link
            key={ep.path}
            to="/api"
            className="group flex flex-col gap-3 p-4 rounded-lg border transition-colors"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)'
            }}
          >
            {/* Method badge + path */}
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-xs px-1.5 py-0.5 rounded"
                style={{
                  color: 'var(--accent)',
                  backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                }}
              >
                {ep.method}
              </span>
              <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                {ep.label}
              </span>
            </div>

            {/* Path */}
            <p className="font-mono text-xs" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
              {ep.path}
            </p>

            {/* Description + arrow */}
            <div className="flex items-center justify-between mt-auto">
              <span className="text-sm" style={{ color: 'var(--text)' }}>
                {ep.description}
              </span>
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
                style={{ color: 'var(--accent)' }}
              />
            </div>
          </Link>
        ))}
      </div>

    </section>
  )
}