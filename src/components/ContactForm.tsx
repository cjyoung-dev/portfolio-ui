import { useState } from 'react'
import { Send } from 'lucide-react'
import { api, type Contact } from '../lib/api'

const emptyForm: Contact = { name: '', company: '', email: '', message: '' }

type SubmitState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; statusCode: number; message: string }
  | { status: 'error'; message: string }

export function ContactForm() {
  const [form, setForm] = useState<Contact>(emptyForm)
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' })

  function updateField(field: keyof Contact, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const isValid = form.name.trim() && form.company.trim() && form.email.trim() && form.message.trim()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid) return
    setSubmitState({ status: 'loading' })
    try {
      const { status, data } = await api.contact(form)
      setSubmitState({ status: 'success', statusCode: status, message: data.data.message })
      setForm(emptyForm)
    } catch (err) {
      setSubmitState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong',
      })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Form column */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {([
          { field: 'name', label: 'Name', type: 'text', placeholder: 'Jane Doe' },
          { field: 'company', label: 'Company', type: 'text', placeholder: 'Acme Inc.' },
          { field: 'email', label: 'Email', type: 'email', placeholder: 'jane@acme.com' },
        ] as const).map(({ field, label, type, placeholder }) => (
          <label key={field} className="flex flex-col gap-1.5">
            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              {label}
            </span>
            <input
              type={type}
              required
              value={form[field]}
              onChange={e => updateField(field, e.target.value)}
              placeholder={placeholder}
              className="text-sm px-3 py-2 rounded border outline-none transition-colors"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--text)',
              }}
            />
          </label>
        ))}

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            Message
          </span>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={e => updateField('message', e.target.value)}
            placeholder="What would you like to talk about?"
            className="text-sm px-3 py-2 rounded border outline-none resize-none transition-colors"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
            }}
          />
        </label>

        <button
          type="submit"
          disabled={!isValid || submitState.status === 'loading'}
          className="flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-1"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--background)' }}
        >
          <Send size={14} />
          {submitState.status === 'loading' ? 'Sending…' : 'Send message'}
        </button>

        {submitState.status === 'success' && (
          <p className="text-xs font-mono" style={{ color: 'var(--accent)' }}>
            {submitState.statusCode} — {submitState.message}
          </p>
        )}
        {submitState.status === 'error' && (
          <p className="text-xs font-mono text-red-400">{submitState.message}</p>
        )}
      </form>

      {/* JSON preview column */}
      <div
        className="rounded-lg border overflow-hidden flex flex-col"
        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
      >
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
            POST
          </span>
          <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            /api/contact
          </span>
        </div>
        <div className="p-4 flex-1">
          <pre className="font-mono text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--text)' }}>{'{'}</span>
            {'\n'}
            {(['name', 'company', 'email', 'message'] as const).map((field, i, arr) => (
              <span key={field}>
                {'  '}
                <span style={{ color: 'var(--accent)' }}>"{field}"</span>
                <span style={{ color: 'var(--text)' }}>: </span>
                <span style={{ color: form[field] ? 'var(--text)' : 'var(--text-muted)', opacity: form[field] ? 1 : 0.4 }}>
                  "{form[field] || '…'}"
                </span>
                {i < arr.length - 1 ? <span style={{ color: 'var(--text)' }}>,</span> : null}
                {'\n'}
              </span>
            ))}
            <span style={{ color: 'var(--text)' }}>{'}'}</span>
          </pre>
        </div>
      </div>

    </div>
  )
}