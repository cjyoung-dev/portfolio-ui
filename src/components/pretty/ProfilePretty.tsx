import { MapPin, Mail } from 'lucide-react';
import type {Profile} from '../../lib/api.ts';

const availabilityConfig = {
  open: {label: 'Open to opportunities', color: 'var(--color-success)'},
  employed: {label: 'Currently employed', color: 'var(--color-warning)'},
} as const;

type Props = {data: Profile}

export function ProfilePretty({data}: Props) {
  return(
    <div className="flex flex-col gap-5">

      {/* Name + availability */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
            {data.name}
          </h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {data.title}
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full border"
          style={{
            color: data.availability === 'open' ? 'var(--accent)' : 'var(--text-muted)',
            borderColor: data.availability === 'open' ? 'var(--accent)' : 'var(--border)',
            backgroundColor: data.availability === 'open'
              ? 'color-mix(in srgb, var(--accent) 10%, transparent)'
              : 'var(--surface)',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: data.availability === 'open' ? 'var(--accent)' : 'var(--text-muted)' }}
          />
          {availabilityConfig[data.availability].label}
        </span>
      </div>

      {/* Summary */}
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
        {data.summary}
      </p>

      {/* Links */}
      <div className="flex flex-wrap gap-4 pt-1">
        <span className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-muted)' }}>
          <MapPin size={13} />
          {data.location}
        </span>

        <a href={`mailto:${data.email}`}
        className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
        style={{ color: 'var(--accent)' }}
        >
        <Mail size={13} />
        {data.email}
      </a>

      <a href={data.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
      style={{ color: 'var(--accent)' }}
      >

      GitHub
    </a>

  <a href={data.linkedinUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
  style={{ color: 'var(--accent)' }}
>

  LinkedIn
  </a>
</div>

</div>
  )
}