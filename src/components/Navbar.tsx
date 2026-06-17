import { Link } from '@tanstack/react-router'
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/api', label: 'API' },
  { to: '/contact', label: 'Contact' },
] as const;

export function Navbar() {
  const { theme, setTheme } = useTheme();

  return(
    <header style={{borderBottom: 'var(--border)', backgroundColor: 'var(--backgroundColor)'}} className="sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className='max-w-5xl mx-auto px-6 h-14 flex items-center justify-between'>
        <Link to='/' className='font-mono text-sm font-medium' style={{color: 'var(--text)'}}>
          cj<span style={{color: 'var(--accent)'}}>.</span>young
        </Link>

        <nav className='flex items-center gap-1'>
          {NAV_LINKS.map(({to, label}) => (
            <Link
              key={to}
              to={to}
              style={{color: 'var(--text-muted)'}}
              activeProps={{style: {color: 'var(--text)'}}}
              className='px-3 py-1.5 rounded text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/5'
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          style={{borderColor: 'var(--border)', color: 'var(--text-muted)'}}
          className="w-8 h-8 flex items-center justify-center rounded border transition-colors hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  )
}

