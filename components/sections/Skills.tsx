'use client'

// components/sections/Skills.tsx
// Staggered badge grid for tech stack, grouped by category.

import { Badge } from '@/components/ui/Badge'
import { RevealItem, SectionReveal } from '@/components/ui/SectionReveal'
import { skillCategories, skills } from '@/lib/content'

type BadgeColor = 'primary' | 'secondary' | 'highlight' | 'muted'

const categoryOrder = ['frontend', 'backend', 'ai'] as const
export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 bg-[#2A1F15]">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <SectionReveal>
          <p className="font-[JetBrains_Mono,monospace] text-xs text-[#93816C] tracking-[0.2em] uppercase mb-4">
            — Skills & Tools
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2
            className="font-[Bricolage_Grotesque,sans-serif] font-bold text-4xl md:text-5xl text-[#F2E6D3] mb-16 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            What I work with
          </h2>
        </SectionReveal>

        {/* Categories */}
        <div className="space-y-12">
          {categoryOrder.map(cat => {
            const catInfo = skillCategories[cat]
            const catSkills = skills.filter(s => s.category === cat)

            return (
              <div key={cat}>
                {/* Category label */}
                <SectionReveal delay={0.05}>
                  <p
                    className="font-[JetBrains_Mono,monospace] text-xs tracking-[0.15em] uppercase mb-5"
                    style={{
                      color:
                        catInfo.color === 'primary'
                          ? '#E8834D'
                          : catInfo.color === 'secondary'
                            ? '#82A788'
                            : '#E8B94D'
                    }}
                  >
                    {catInfo.label}
                  </p>
                </SectionReveal>

                {/* Badge grid with stagger */}
                <SectionReveal staggerChildren={0.07}>
                  <div className="flex flex-wrap gap-3">
                    {catSkills.map(skill => (
                      <RevealItem key={skill.name}>
                        <Badge
                          label={skill.name}
                          color={catInfo.color as BadgeColor}
                        />
                      </RevealItem>
                    ))}
                  </div>
                </SectionReveal>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
