import { useState } from 'react'
import { Play } from 'lucide-react'

type FilterOption = { label: string; value: string }
type FilterConfig = { param: string; label: string; options: FilterOption[] }

type RequestState =
  | { status: 'idle' }
  | { status: 'loading'; startedAt: number }
  | { status: 'success'; data: unknown; duration: number; size: number }
  | { status: 'error'; message: string }

type Props = {
  method?: 'GET' | 'POST'
  path: string
  filters?: FilterConfig[]
  onRun: (params: Record<string, string>) => Promise<unknown>
  renderPretty: (data: unknown) => React.ReactNode
}

export function EndpointBlock({
                                method = 'GET',
                                path,
                                filters = [],
                                onRun,
                                renderPretty,
                              }: Props) {
  const [params, setParams] = useState<Record<string, string>>({})
  const [reqState, setReqState] = useState<RequestState>({ status: 'idle' })
  const [view, setView] = useState<'pretty' | 'raw'>('pretty')

  function updateParam(param: string, value: string) {
    setParams(prev => {
      const next = { ...prev }
      if (value === '') {
        delete next[param]
      } else {
        next[param] = value
      }
      return next
    })
  }

  const displayPath = (() => {
    const qs = new URLSearchParams(params).toString()
    return qs ? `${path}?${qs}` : path
  })()

  async function handleRun() {
    setReqState({ status: 'loading', startedAt: Date.now() })
    setView('pretty')
    try {
      const start = Date.now()
      const data = await onRun(params)
      const duration = Date.now() - start
      const json = JSON.stringify(data)
      setReqState({ status: 'success', data, duration, size: new Blob([json]).size })
    } catch (err) {
      setReqState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Unknown error',
      })
    }
  }

  return (
    <div
      className="rounded-lg border overflow-hidden"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
    >
      {/* Request bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
      >
        <span
          className="font-mono text-xs font-medium px-2 py-0.5 rounded"
          style={{
            color: 'var(--accent)',
            backgroundColor: 'color-mix(in srgb, var(--accent) 10%, transparent)',
          }}
        >
          {method}
        </span>
        <span className="font-mono text-xs flex-1 truncate" style={{ color: 'var(--text-muted)' }}>
          {displayPath}
        </span>
        <button
          onClick={handleRun}
          disabled={reqState.status === 'loading'}
          className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--background)',
            borderColor: 'var(--accent)',
          }}
        >
          <Play size={10} />
          {reqState.status === 'loading' ? 'Running…' : 'Run'}
        </button>
      </div>

      {/* Filters */}
      {filters.length > 0 && (
        <div
          className="flex items-center gap-4 px-4 py-2 border-b flex-wrap"
          style={{ borderColor: 'var(--border)' }}
        >
          {filters.map(filter => (
            <label key={filter.param} className="flex items-center gap-2">
              <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                {filter.label}=
              </span>
              <select
                value={params[filter.param] ?? ''}
                onChange={e => updateParam(filter.param, e.target.value)}
                className="font-mono text-xs px-2 py-1 rounded border appearance-none"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--surface)',
                  color: 'var(--text)',
                }}
              >
                {filter.options.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      )}

      {/* Response meta bar */}
      {reqState.status === 'success' && (
        <div
          className="flex items-center gap-3 px-4 py-2 border-b text-xs font-mono"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
        >
          <span style={{ color: 'var(--accent)' }}>200 OK</span>
          <span style={{ color: 'var(--text-muted)' }}>{reqState.duration}ms</span>
          <span style={{ color: 'var(--text-muted)' }}>
            {(reqState.size / 1024).toFixed(1)} KB
          </span>
          <div
            className="ml-auto flex rounded overflow-hidden border"
            style={{ borderColor: 'var(--border)' }}
          >
            {(['pretty', 'raw'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-3 py-0.5 text-xs capitalize transition-colors"
                style={{
                  backgroundColor: view === v ? 'var(--border)' : 'transparent',
                  color: view === v ? 'var(--text)' : 'var(--text-muted)',
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {reqState.status === 'error' && (
        <div className="px-4 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
          <span className="font-mono text-xs text-red-400">{reqState.message}</span>
        </div>
      )}

      {/* Response body */}
      <div className="p-4">
        {reqState.status === 'idle' && (
          <p className="font-mono text-xs text-center py-4" style={{ color: 'var(--text-muted)', opacity: 0.4 }}>
            press Run to execute request
          </p>
        )}
        {reqState.status === 'loading' && (
          <p className="font-mono text-xs text-center py-4 animate-pulse" style={{ color: 'var(--accent)' }}>
            waiting for response…
          </p>
        )}
        {reqState.status === 'success' && (
          view === 'pretty'
            ? renderPretty(reqState.data)
            : (
              <pre className="font-mono text-xs leading-relaxed overflow-auto"
                   style={{ color: 'var(--text-muted)' }}>
                {JSON.stringify(reqState.data, null, 2)}
              </pre>
            )
        )}
      </div>
    </div>
  )
}