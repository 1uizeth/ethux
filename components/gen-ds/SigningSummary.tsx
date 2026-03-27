'use client'

import { useState } from 'react'

export function SigningSummary() {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="space-y-3">
      {/* Human-readable summary */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-zinc-100 leading-relaxed">
              You are swapping{' '}
              <span className="text-violet-300 font-semibold">500 USDC</span>{' '}
              for at least{' '}
              <span className="text-violet-300 font-semibold">0.198 ETH</span>
              {' '}via 2 hops
            </p>
            <p className="text-xs text-zinc-500 mt-1">USDC → WETH → ETH · Uniswap V2</p>
          </div>
        </div>
      </div>

      {/* Security check */}
      <div className="flex items-center gap-2 px-1">
        <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-xs text-zinc-500">Contract verified on Etherscan · Uniswap V2 Router 02</span>
      </div>

      {/* Slippage warning */}
      <div className="flex items-center gap-2 px-1">
        <div className="w-4 h-4 rounded-full bg-yellow-500/20 flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
          </svg>
        </div>
        <span className="text-xs text-zinc-500">Max slippage 0.5% · You receive at least 0.198 ETH or the transaction reverts</span>
      </div>

      {/* Technical details toggle */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full text-left text-xs text-zinc-600 hover:text-zinc-400 transition-colors flex items-center gap-1 px-1 font-mono"
      >
        <span>{showDetails ? '▼' : '▶'}</span>
        Technical details
      </button>

      {showDetails && (
        <div className="border border-zinc-800 rounded-lg p-3 bg-zinc-900/50 space-y-2 font-mono">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-600">Function</span>
            <span className="text-zinc-400">swapExactTokensForETH</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-600">amountIn</span>
            <span className="text-zinc-400">500000000 (6 decimals)</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-600">amountOutMin</span>
            <span className="text-zinc-400">198000000000000000</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-600">path</span>
            <span className="text-zinc-400">0xa0b8…48 → 0xc02a…cc2</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-600">deadline</span>
            <span className="text-zinc-400">20 minutes from now</span>
          </div>
        </div>
      )}
    </div>
  )
}
