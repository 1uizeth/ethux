import { FramingsIndex } from '@/components/framings/FramingsIndex'
import { OPPORTUNITY_AREAS } from '@/data/framings'

export const metadata = {
  title: 'Problem Framings · ethux.design',
}

export default function FramingsPage() {
  const totalPainPoints = OPPORTUNITY_AREAS.reduce((sum, a) => sum + a.painPoints.length, 0)
  const criticalCount = OPPORTUNITY_AREAS.flatMap(a => a.painPoints).filter(p => p.severity === 'Critical').length

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <p className="text-xs font-mono text-violet-400 uppercase tracking-widest">
          Problem Framings Index
        </p>
        <h1 className="text-2xl font-semibold text-zinc-100">
          {totalPainPoints} structural questions across 8 opportunity areas
        </h1>
        <p className="text-zinc-500 text-sm leading-relaxed max-w-2xl">
          Each pain point is reframed as a precise structural question that opens up the design space
          instead of collapsing it into one answer.{' '}
          <span className="text-red-400">{criticalCount} are Critical severity.</span>
          {' '}These framings are the classification layer between what a contract exposes and what design decisions it forces.
        </p>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-3 pt-2">
          {OPPORTUNITY_AREAS.map(area => (
            <a
              key={area.id}
              href={`#${area.id}`}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors font-mono border border-zinc-900 hover:border-zinc-800 px-2.5 py-1 rounded-lg"
            >
              {area.title}
              <span className="text-zinc-700">{area.painPoints.length}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Index */}
      <FramingsIndex />
    </div>
  )
}
