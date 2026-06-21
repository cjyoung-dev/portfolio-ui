import { createFileRoute } from '@tanstack/react-router'
import {EndpointBlock} from '../components/EndpointBlock.tsx';
import {ProfilePretty} from '../components/pretty/ProfilePretty.tsx';
import {ProjectsPretty} from '../components/pretty/ProjectsPretty.tsx';
import {SkillsPretty} from '../components/pretty/SkillsPretty.tsx';
import {ExperiencePretty} from '../components/pretty/ExperiencePretty.tsx';
import {api, type Profile, type Project, type Skill, type Experience} from '../lib/api.ts';

export const Route = createFileRoute('/api')({
  component: ApiPage,
})

const SECTIONS = [
  {
    title: 'Profile',
    description: 'Who I am - contact details and a short summary.',
    path: 'api/profile',
    filters: [],
    run: (_params: Record<string, string>) => api.profile().then(r => r.data),
    renderPretty: (data: unknown) => <ProfilePretty data={data as Profile}/>,
  },
  {
    title: 'Projects',
    description: "Things I've built — filter by status or technology stack.",
    path: '/api/projects',
    filters: [
      {
        param: 'status',
        label: 'status',
        options: [
          { label: 'All', value: '' },
          { label: 'Active', value: 'active' },
          { label: 'Complete', value: 'complete' },
          { label: 'Archived', value: 'archived' },
        ],
      },
    ],
    run: (params: Record<string, string>) => api.projects(params).then(r => r.data),
    renderPretty: (data: unknown) => <ProjectsPretty data={data as Project[]} />,
  },
  {
    title: 'Skills',
    description: 'What I know — filter by category or proficiency level.',
    path: '/api/skills',
    filters: [
      {
        param: 'category',
        label: 'category',
        options: [
          { label: 'All', value: '' },
          { label: 'Languages', value: 'language' },
          { label: 'Frontend', value: 'frontend' },
          { label: 'Backend', value: 'backend' },
          { label: 'Database', value: 'database' },
          { label: 'Tooling', value: 'tooling' },
          { label: 'Other', value: 'other' },
        ],
      },
      {
        param: 'proficiency',
        label: 'proficiency',
        options: [
          { label: 'All', value: '' },
          { label: 'Familiar', value: 'familiar' },
          { label: 'Proficient', value: 'proficient' },
          { label: 'Expert', value: 'expert' },
        ],
      },
    ],
    run: (params: Record<string, string>) => api.skills(params).then(r => r.data),
    renderPretty: (data: unknown) => <SkillsPretty data={data as Skill[]} />,
  },
  {
    title: 'Experience',
    description: 'Where I have been — work history and education.',
    path: '/api/experience',
    filters: [
      {
        param: 'type',
        label: 'type',
        options: [
          { label: 'All', value: '' },
          { label: 'Work', value: 'work' },
          { label: 'Education', value: 'education' },
        ],
      },
    ],
    run: (params: Record<string, string>) => api.experience(params).then(r => r.data),
    renderPretty: (data: unknown) => <ExperiencePretty data={data as Experience[]} />,
  },
] as const

function ApiPage() {
  return(
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col gap-16">

      {/* Page header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--text)' }}>
          API Explorer
        </h1>
        <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'var(--text-muted)' }}>
          Each section below makes a real request to my portfolio API. Hit Run on any endpoint
          to fetch live data, then toggle between Pretty and Raw to see the formatted result
          or the raw JSON response.
        </p>
      </div>

      {/* Endpoint sections */}
      {SECTIONS.map(section => (
        <section key={section.path} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
              {section.title}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {section.description}
            </p>
          </div>
          <EndpointBlock
            path={section.path}
            filters={section.filters as any}
            onRun={section.run}
            renderPretty={section.renderPretty}
          />
        </section>
      ))}

    </div>
  )
}