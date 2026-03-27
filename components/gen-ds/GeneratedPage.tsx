'use client'

import { useState } from 'react'
import type { ClassifierResult } from '@/lib/types'
import { PAIN_POINTS_BY_ID } from '@/data/framings'
import { BatchedApproveSwap } from './BatchedApproveSwap'
import { SigningSummary } from './SigningSummary'
import { GasEstimator } from './GasEstimator'
import { ApprovalManager } from './ApprovalManager'
import { TransactionStepper } from './TransactionStepper'
import { AddressVerifier } from './AddressVerifier'

// Map framing IDs to their gen-ds component
const GEN_DS_COMPONENTS: Partial<Record<string, React.ComponentType>> = {
  'redundant-approvals': BatchedApproveSwap,
  'blind-signing': SigningSummary,
  'unpredictable-gas': GasEstimator,
  'approval-management': ApprovalManager,
  'signing-fatigue': TransactionStepper,
  'missing-signing-context': TransactionStepper,
  'wrong-address': AddressVerifier,
}

// Framing IDs for which we have a component (deduped in case two framings map to same component)
const COMPONENT_ORDER = [
  'blind-signing',
  'redundant-approvals',
  'signing-fatigue',
  'approval-management',
  'unpredictable-gas',
  'wrong-address',
]

interface Props {
  address: string
  result: ClassifierResult
  error?: string
}

export function GeneratedPage({ address, result, error }: Props) {
  const [showAllFunctions, setShowAllFunctions] = useState(false)

  const matchedIds = new Set(result.matches.map(m => m.framingId))

  // Which components to render: ordered by COMPONENT_ORDER, only if in matches,
  // and deduplicated (TransactionStepper covers both signing-fatigue and missing-signing-context)
  const renderedComponents: Array<{ framingId: string; Component: React.ComponentType }> = []
  const usedComponents = new Set<React.ComponentType>()

  for (const framingId of COMPONENT_ORDER) {
    if (!matchedIds.has(framingId)) continue
    const Component = GEN_DS_COMPONENTS[framingId]
    if (!Component || usedComponents.has(Component)) continue
    usedComponents.add(Component)
    renderedComponents.push({ framingId, Component })
  }

  return (
    <div className="space-y-8">
      {/* Contract header */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {result.contractName ? (
                <h1 className="text-lg font-semibold text-zinc-100">{result.contractName}</h1>
              ) : (
                <h1 className="text-lg font-semibold text-zinc-100">Unknown Contract</h1>
              )}
              {!error && (
                <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded font-mono">
                  Verified
                </span>
              )}
            </div>
            <p className="text-xs font-mono text-zinc-500">{address}</p>
            <p className="text-xs text-zinc-600 mt-1">Ethereum Mainnet</p>
          </div>
          <a
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors shrink-0 font-mono"
          >
            Etherscan ↗
          </a>
        </div>

        {error && (
          <div className="mt-3 rounded-lg border border-orange-500/20 bg-orange-500/5 p-3 text-xs text-orange-400">
            {error === 'not-verified' && 'Contract source not verified on Etherscan. Showing pattern-based analysis only.'}
            {error === 'rate-limited' && 'Etherscan rate limit reached. Showing pattern-based analysis only.'}
            {error === 'network-error' && 'Could not reach Etherscan. Showing demo analysis.'}
            {error === 'unknown' && 'ABI fetch failed. Showing pattern-based analysis.'}
          </div>
        )}
      </div>

      {/* Framings detected */}
      {result.matches.length > 0 && (
        <div>
          <h2 className="text-xs font-mono text-zinc-600 uppercase tracking-wider mb-3">
            Problem framings detected — {result.matches.length}
          </h2>
          <div className="flex flex-wrap gap-2">
            {result.matches.map(match => {
              const painPoint = PAIN_POINTS_BY_ID[match.framingId]
              if (!painPoint) return null
              return (
                <a
                  key={match.framingId}
                  href={`/framings#${painPoint.areaId}`}
                  className="group flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 hover:border-zinc-700 transition-colors"
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    match.confidence === 'high' ? 'bg-violet-400' :
                    match.confidence === 'medium' ? 'bg-zinc-500' : 'bg-zinc-700'
                  }`} />
                  <span className="text-xs text-zinc-300 group-hover:text-zinc-100 transition-colors">
                    {painPoint.title}
                  </span>
                  <span className="text-xs text-zinc-700 font-mono">{match.confidence}</span>
                </a>
              )
            })}
          </div>
        </div>
      )}

      {/* No matches */}
      {result.matches.length === 0 && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center">
          <p className="text-zinc-500 text-sm">No problem framings matched for this contract.</p>
          <p className="text-zinc-700 text-xs mt-2">The contract may use non-standard function names or be a view-only contract.</p>
        </div>
      )}

      {/* Generated components */}
      {renderedComponents.length > 0 && (
        <div>
          <h2 className="text-xs font-mono text-zinc-600 uppercase tracking-wider mb-4">
            Generated design system — {renderedComponents.length} component{renderedComponents.length > 1 ? 's' : ''}
          </h2>
          <div className="space-y-6">
            {renderedComponents.map(({ framingId, Component }) => {
              const painPoint = PAIN_POINTS_BY_ID[framingId]
              const match = result.matches.find(m => m.framingId === framingId)
              return (
                <div key={framingId} className="rounded-xl border border-zinc-800 overflow-hidden">
                  {/* Component header */}
                  <div className="border-b border-zinc-800 bg-zinc-900/80 px-5 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-zinc-600 font-mono uppercase tracking-wider mb-1">
                          {painPoint?.areaTitle}
                        </p>
                        <h3 className="text-sm font-semibold text-zinc-200">
                          {painPoint?.title}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-2 italic leading-relaxed max-w-xl">
                          {painPoint?.framing}
                        </p>
                      </div>
                      <span className={`text-xs font-mono px-2 py-1 rounded shrink-0 ${
                        match?.confidence === 'high'
                          ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                          : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                      }`}>
                        {match?.confidence} confidence
                      </span>
                    </div>
                    {match && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {match.triggeredBy.map(fn => (
                          <span key={fn} className="text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-500 px-2 py-0.5 rounded">
                            {fn}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Component preview */}
                  <div className="bg-zinc-950 p-5">
                    <Component />
                  </div>

                  {/* Design decision note */}
                  <div className="border-t border-zinc-800/50 bg-zinc-900/30 px-5 py-3">
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      <span className="text-zinc-500">Design decision: </span>
                      {match?.reason}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Functions analyzed */}
      {result.functions.length > 0 && (
        <div>
          <button
            onClick={() => setShowAllFunctions(!showAllFunctions)}
            className="flex items-center gap-2 text-xs text-zinc-600 hover:text-zinc-400 transition-colors font-mono"
          >
            <span>{showAllFunctions ? '▼' : '▶'}</span>
            Functions analyzed ({result.functions.length})
          </button>

          {showAllFunctions && (
            <div className="mt-3 rounded-xl border border-zinc-800 overflow-hidden">
              {result.functions.map((fn, i) => {
                const matches = result.matches.filter(m => m.triggeredBy.includes(fn))
                return (
                  <div
                    key={fn}
                    className={`flex items-center gap-4 px-4 py-2.5 text-xs ${
                      i < result.functions.length - 1 ? 'border-b border-zinc-800/50' : ''
                    } ${matches.length > 0 ? 'bg-zinc-900/30' : ''}`}
                  >
                    <span className="font-mono text-zinc-400 min-w-0 flex-1">{fn}</span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {matches.map(m => {
                        const pp = PAIN_POINTS_BY_ID[m.framingId]
                        return pp ? (
                          <span key={m.framingId} className="text-zinc-600 border border-zinc-800 px-1.5 py-0.5 rounded font-mono">
                            {pp.title}
                          </span>
                        ) : null
                      })}
                      {matches.length === 0 && (
                        <span className="text-zinc-800">no match</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
