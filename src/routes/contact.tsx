import { createFileRoute } from '@tanstack/react-router'
import { ContactForm } from '../components/ContactForm'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
          Get in touch
        </h1>
        <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'var(--text-muted)' }}>
          Fill out the form below and I'll get back to you. Watch the panel on the right
          build the actual request as you type.
        </p>
      </div>
      <ContactForm />
    </div>
  )
}