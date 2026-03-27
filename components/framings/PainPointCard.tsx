import type { PainPoint } from '@/lib/types'
import { SeverityBadge } from '@/components/ui/Badge'

export function PainPointCard({ painPoint }: { painPoint: PainPoint }) {
  return (
    <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/50 hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-sm font-semibold text-zinc-200">{painPoint.title}</h3>
        <SeverityBadge severity={painPoint.severity} />
      </div>

      <p className="text-xs text-zinc-500 leading-relaxed mb-4">
        {painPoint.description}
      </p>

      <div className="border-t border-zinc-800 pt-4">
        <p className="text-xs text-zinc-400 mb-1 font-mono uppercase tracking-wider">Problem framing</p>
        <blockquote className="text-sm text-zinc-200 leading-relaxed italic border-l-2 border-violet-500 pl-3">
          {painPoint.framing}
        </blockquote>
      </div>

      {painPoint.solutionsLive.length > 0 && (
        <div className="mt-4">
          <p className="text-xs text-zinc-600 font-mono uppercase tracking-wider mb-2">Solutions live</p>
          <ul className="space-y-1">
            {painPoint.solutionsLive.map((s, i) => (
              <li key={i} className="text-xs text-zinc-500 flex gap-2">
                <span className="text-zinc-700 shrink-0">—</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
