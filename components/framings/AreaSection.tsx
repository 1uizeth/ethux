import type { OpportunityArea } from '@/lib/types'
import { PainPointCard } from './PainPointCard'

export function AreaSection({ area, index }: { area: OpportunityArea; index: number }) {
  const criticalCount = area.painPoints.filter(p => p.severity === 'Critical').length
  const highCount = area.painPoints.filter(p => p.severity === 'High').length

  return (
    <section id={area.id} className="scroll-mt-16">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="text-xs font-mono text-zinc-700 w-6 shrink-0">{String(index + 1).padStart(2, '0')}</span>
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">{area.title}</h2>
          <div className="flex gap-3 mt-1">
            {criticalCount > 0 && (
              <span className="text-xs text-red-500 font-mono">{criticalCount} critical</span>
            )}
            {highCount > 0 && (
              <span className="text-xs text-orange-500 font-mono">{highCount} high</span>
            )}
            <span className="text-xs text-zinc-600 font-mono">{area.painPoints.length} total</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-zinc-500 leading-relaxed mb-6 ml-10 italic">
        {area.tagline}
      </p>

      <div className="ml-10 grid gap-4">
        {area.painPoints.map(painPoint => (
          <PainPointCard key={painPoint.id} painPoint={painPoint} />
        ))}
      </div>
    </section>
  )
}
