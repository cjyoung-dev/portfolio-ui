import { ExternalLink } from 'lucide-react'
import type { Project, ProjectStatus } from '../../lib/api'

const statusConfig: Record<ProjectStatus, { label: string; color: string; bg: string }> = {
  active: {
    label: 'Active',
    color: 'var(--accent)',
    bg: 'color-mix(in srgb, var(--accent) 10%, transparent)',
  },
  complete: {
    label: 'Complete',
    color: 'var(--text-muted)',
    bg: 'var(--surface)',
  },
  archived: {
    label: 'Archived',
    color: 'var(--text-muted)',
    bg: 'var(--surface)',
  },
}

type Props = { data: Project[] }

export function ProjectsPretty({ data }: Props) {
  if (data.length === 0) {
    return (
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        No projects found for the selected filter.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map(project => {
        const status = statusConfig[project.status]
        return (
          <div
            key={project.id}
            className="flex flex-col gap-3 p-4 rounded-lg border"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  {project.name}
                </h3>
                <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  {project.year}
                </span>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full border shrink-0"
                style={{ color: status.color, backgroundColor: status.bg, borderColor: status.color }}
              >
                {status.label}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {project.description}
            </p>

            {/* Highlights */}
            {project.highlights.length > 0 && (
              <ul className="flex flex-col gap-1">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--accent)' }} className="mt-0.5 shrink-0">—</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
              {project.techStack.map(tech => (
                <span
                  key={tech}
                  className="font-mono text-xs px-2 py-0.5 rounded border"
                  style={{
                    color: 'var(--text-muted)',
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--background)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            {(project.repoUrl || project.liveUrl) && (
              <div className="flex gap-3 pt-1 border-t" style={{ borderColor: 'var(--border)' }}>
                {project.repoUrl && (

                  <a href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
                  style={{ color: 'var(--accent)' }}
                  >
                  Repository
                  </a>
                  )}
                {project.liveUrl && (

                  <a href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs transition-opacity hover:opacity-70"
                  style={{ color: 'var(--accent)' }}
                  >
                  <ExternalLink size={12} />
                  Live site
                  </a>
                  )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}