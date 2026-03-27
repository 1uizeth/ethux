import type { AbiItem, FramingMatch, ClassifierResult } from '@/lib/types'
import { EXACT_MATCHES, PATTERN_MATCHES } from '@/lib/data/classification'

export function classifyAbi(abi: AbiItem[], contractName?: string): ClassifierResult {
  const functions = abi
    .filter(item => item.type === 'function' && item.name)
    .map(item => item.name!)

  // Map: framingId → best match accumulated across all functions
  const accumulated = new Map<string, { match: Omit<FramingMatch, 'triggeredBy'>; triggeredBy: Set<string> }>()

  const confidenceRank = { high: 3, medium: 2, low: 1 }

  function addMatch(fnName: string, match: Omit<FramingMatch, 'triggeredBy'>) {
    const existing = accumulated.get(match.framingId)
    if (!existing) {
      accumulated.set(match.framingId, {
        match,
        triggeredBy: new Set([fnName]),
      })
    } else {
      existing.triggeredBy.add(fnName)
      // Keep the highest confidence match
      if (confidenceRank[match.confidence] > confidenceRank[existing.match.confidence]) {
        existing.match = match
      }
    }
  }

  for (const fnName of functions) {
    // Try exact match first
    const exactMatches = EXACT_MATCHES[fnName]
    if (exactMatches) {
      for (const m of exactMatches) addMatch(fnName, m)
      continue
    }

    // Try pattern matching
    for (const { pattern, matches } of PATTERN_MATCHES) {
      if (pattern.test(fnName)) {
        for (const m of matches) addMatch(fnName, m)
      }
    }
  }

  // Sort by confidence desc
  const sorted = Array.from(accumulated.entries())
    .map(([, { match, triggeredBy }]) => ({
      ...match,
      triggeredBy: Array.from(triggeredBy),
    }))
    .sort((a, b) => confidenceRank[b.confidence] - confidenceRank[a.confidence])

  return { matches: sorted, functions, contractName }
}
