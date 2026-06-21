import type { Experience, ExperienceType } from '../../lib/api'

const typeConfig: Record<ExperienceType, { label: string }> = {
  work:      { label: 'Work' },
  education: { label: 'Education' },
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'Present'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

type Props = { data: Experience[] }

export function ExperiencePretty({ data }: Props) {
  if (data.length === 0) {
    return (
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
        No experience found for the selected filter.
      </p>
    )
  }

  return (
    <div className="flex flex-col">
      {data.map((entry, index) => (
        <div
          key={entry.id}
          className="flex gap-4"
        >
          {/* Timeline spine */}
          <div className="flex flex-col items-center">
            <div
              className="w-2 h-2 rounded-full mt-1.5 shrink-0"
              style={{ backgroundColor: 'var(--accent)' }}
            />
            {index < data.length - 1 && (
              <div className="w-px flex-1 my-1" style={{ backgroundColor: 'var(--border)' }} />
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2 pb-8">
            <div className="flex items-start gap-2 flex-wrap">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                  {entry.role}
                </h3>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {entry.organization}
                </span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                  {formatDate(entry.startDate)} — {formatDate(entry.endDate)}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded border"
                  style={{ color: 'var(--text-muted)', borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
                >
                  {typeConfig[entry.type].label}
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {entry.description}
            </p>

            {entry.highlights.length > 0 && (
              <ul className="flex flex-col gap-1">
                {entry.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--accent)' }} className="mt-0.5 shrink-0">—</span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}