'use client'

import { useState } from 'react'

const INITIAL_APPROVALS = [
  {
    id: '1',
    token: 'USDC',
    spender: 'Uniswap V2 Router',
    spenderShort: '0x7a25…8D',
    amount: 'Unlimited',
    unlimited: true,
    daysAgo: 12,
    revoked: false,
  },
  {
    id: '2',
    token: 'DAI',
    spender: 'Uniswap V2 Router',
    spenderShort: '0x7a25…8D',
    amount: '500 DAI',
    unlimited: false,
    daysAgo: 0,
    revoked: false,
  },
]

export function ApprovalManager() {
  const [approvals, setApprovals] = useState(INITIAL_APPROVALS)

  const revoke = (id: string) => {
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, revoked: true } : a))
  }

  const active = approvals.filter(a => !a.revoked)

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-zinc-500 px-1">
        <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center">
          <span className="text-orange-400 text-[9px] font-bold">{active.length}</span>
        </div>
        <span>
          {active.length === 0
            ? 'No active approvals for this contract'
            : `${active.length} active approval${active.length > 1 ? 's' : ''} for this contract`}
        </span>
      </div>

      <div className="space-y-2">
        {approvals.map(approval => (
          <div
            key={approval.id}
            className={`rounded-lg border p-3 transition-all ${
              approval.revoked
                ? 'border-zinc-900 bg-zinc-900/20 opacity-40'
                : 'border-zinc-800 bg-zinc-900/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center">
                  <span className="text-xs font-mono text-zinc-400">{approval.token.slice(0, 2)}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-200 font-medium">{approval.token}</span>
                    <span className="text-zinc-600 text-xs">→</span>
                    <span className="text-xs text-zinc-500">{approval.spender}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {approval.unlimited ? (
                      <span className="text-xs text-orange-400 font-mono">Unlimited</span>
                    ) : (
                      <span className="text-xs text-zinc-400 font-mono">{approval.amount}</span>
                    )}
                    <span className="text-zinc-700">·</span>
                    <span className="text-xs text-zinc-600">
                      {approval.daysAgo === 0 ? 'today' : `${approval.daysAgo} days ago`}
                    </span>
                  </div>
                </div>
              </div>

              {approval.revoked ? (
                <span className="text-xs text-zinc-600 font-mono">Revoked</span>
              ) : (
                <button
                  onClick={() => revoke(approval.id)}
                  className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 px-2 py-1 rounded transition-colors font-mono"
                >
                  Revoke
                </button>
              )}
            </div>

            {approval.unlimited && !approval.revoked && (
              <div className="mt-2 flex items-center gap-1.5 text-xs text-orange-400/70">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                Unlimited approvals remain active until you revoke them
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
