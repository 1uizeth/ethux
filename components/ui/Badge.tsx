import type { Severity } from '@/lib/types'

const SEVERITY_STYLES: Record<Severity, string> = {
  Critical: 'bg-red-500/10 text-red-400 border border-red-500/20',
  High: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  Medium: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  Info: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
}

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium ${SEVERITY_STYLES[severity]}`}>
      {severity}
    </span>
  )
}

const CONFIDENCE_STYLES = {
  high: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  medium: 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20',
  low: 'bg-zinc-500/5 text-zinc-600 border border-zinc-700/20',
}

export function ConfidenceBadge({ confidence }: { confidence: 'high' | 'medium' | 'low' }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium ${CONFIDENCE_STYLES[confidence]}`}>
      {confidence}
    </span>
  )
}
