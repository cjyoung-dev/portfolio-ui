import type { Skill, SkillCategory } from '../../lib/api'

const categoryLabels: Record<SkillCategory, string> = {
  language:  'Languages',
  frontend:  'Frontend',
  backend:   'Backend',
  database:  'Database',
  tooling:   'Tooling',
  other:     'Other',
}

const proficiencyConfig = {
  familiar:  { dots: 1, label: 'Familiar' },
  proficient: { dots: 2, label: 'Proficient' },
  expert:    { dots: 3, label: 'Expert' },
}

type Props = { data: Skill[] }

export function SkillsPretty({ data }: Props) {
  const grouped = data.reduce<Partial<Record<SkillCategory, Skill[]>>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category]!.push(skill)
    return acc
  }, {})

  const categoryOrder: SkillCategory[] = ['language', 'frontend', 'backend', 'database', 'tooling', 'other']
  const presentCategories = categoryOrder.filter(c => grouped[c]?.length)

  return (
    <div className="flex flex-col gap-6">
      {presentCategories.map(category => (
        <div key={category} className="flex flex-col gap-3">
          <h3 className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            {categoryLabels[category]}
          </h3>
          <div className="flex flex-wrap gap-2">
            {grouped[category]!.map(skill => {
              const prof = proficiencyConfig[skill.proficiency]
              return (
                <div
                  key={skill.name}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
                >
                  <span style={{ color: 'var(--text)' }}>{skill.name}</span>
                  <span className="flex gap-0.5" title={prof.label}>
                    {[1, 2, 3].map(i => (
                      <span
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{
                          backgroundColor: i <= prof.dots ? 'var(--accent)' : 'var(--border)',
                        }}
                      />
                    ))}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}