import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className='max-w-5xl mx-auto px-6 pt-24 pb-16'>
      <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono mb-8'
      style={{borderColor: 'var(--accent)', color: 'var(--accent)', backgroundColor: 'color-mix(in srgb, var(--accent) 8%, transparent)'}}>
      <span className='relative flex h-2 w-2'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full opacity-75'
        style={{backgroundColor: 'var(--accent)'}}/>
        <span className="relative inline-flex h-2 w-2 rounded-full"
        style={{ backgroundColor: 'var(--accent)' }} />
      </span>
        Open to opportunities
      </div>

      <div className='flex items-center gap-3 mb-4'>
        <div className='h-px w-6' style={{backgroundColor: 'var(--accent)'}}/>
        <span className='p-1 font-mono text-xs uppercase tracking-widest'
            style={{backgroundColor: 'var(--accent)'}}>
          Application & Web Developer
        </span>
      </div>

      <h1 className="text-6xl font-bold tracking-tight leading-[1.05] mb-3"
          style={{ color: 'var(--text)' }}>
        Carson Young<span style={{ color: 'var(--accent)' }}>.</span>
      </h1>
      <h2 className="text-6xl font-bold tracking-tight leading-[1.05] mb-8"
          style={{ color: 'var(--text-muted)', opacity: 0.4 }}>
        Building for the web.
      </h2>

      {/* Description */}
      <p className="text-base leading-relaxed max-w-lg mb-10"
         style={{ color: 'var(--text-muted)' }}>
        Full-stack developer specialising in TypeScript, React, and Node.js.
        I build clean, well-architected applications — and this site is one of them.
      </p>

      {/* CTAs */}
      <div className="flex items-center gap-3">
        <Link
          to="/api"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--background)' }}
        >
          View my work
          <ArrowRight size={14} />
        </Link>

        <a href="https://github.com/cjyoung-dev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium border transition-colors hover:bg-black/5 dark:hover:bg-white/5"
        style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
        >
        GitHub
      </a>
    </div>

</section>
  )
}