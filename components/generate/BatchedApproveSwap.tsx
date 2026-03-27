'use client'

import { useState } from 'react'

type Step = 'idle' | 'approving' | 'approved' | 'swapping' | 'done'

export function BatchedApproveSwap() {
  const [step, setStep] = useState<Step>('idle')
  const [fromAmount, setFromAmount] = useState('500')

  const advance = () => {
    if (step === 'idle') setStep('approving')
    else if (step === 'approving') setStep('approved')
    else if (step === 'approved') setStep('swapping')
    else if (step === 'swapping') setStep('done')
    else setStep('idle')
  }

  const steps = [
    { id: 'approve', label: 'Approve USDC', done: ['approved', 'swapping', 'done'].includes(step), active: step === 'approving' },
    { id: 'swap', label: 'Swap to ETH', done: step === 'done', active: ['swapping'].includes(step) },
  ]

  return (
    <div className="space-y-4">
      {/* Swap form */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">You pay</span>
          <span className="text-xs text-zinc-600">Balance: 1,240 USDC</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={fromAmount}
            onChange={e => setFromAmount(e.target.value)}
            className="flex-1 bg-transparent text-2xl font-mono text-zinc-100 outline-none"
          />
          <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-lg">
            <div className="w-4 h-4 rounded-full bg-blue-500/40 flex items-center justify-center">
              <span className="text-[8px] text-blue-300">$</span>
            </div>
            <span className="text-sm font-medium text-zinc-200">USDC</span>
          </div>
        </div>
        <div className="text-xs text-zinc-600">≈ $500.00</div>
      </div>

      <div className="flex justify-center">
        <div className="text-zinc-700">↓</div>
      </div>

      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">You receive</span>
          <span className="text-xs text-zinc-600">Balance: 0.42 ETH</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 text-2xl font-mono text-zinc-400">~0.198</div>
          <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-lg">
            <div className="w-4 h-4 rounded-full bg-violet-500/40 flex items-center justify-center">
              <span className="text-[8px] text-violet-300">Ξ</span>
            </div>
            <span className="text-sm font-medium text-zinc-200">ETH</span>
          </div>
        </div>
        <div className="text-xs text-zinc-600">≈ $498.50 · 0.5% slippage max</div>
      </div>

      {/* Step progress — shown when not idle */}
      {step !== 'idle' && (
        <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-3">
          <div className="flex items-center gap-0">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-2 py-1 rounded text-xs transition-all ${
                  s.done ? 'text-green-400' : s.active ? 'text-violet-300' : 'text-zinc-600'
                }`}>
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                    s.done ? 'bg-green-500/20' : s.active ? 'bg-violet-500/30 animate-pulse' : 'bg-zinc-800'
                  }`}>
                    {s.done ? (
                      <svg className="w-2.5 h-2.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-[9px] font-mono">{i + 1}</span>
                    )}
                  </div>
                  {s.label}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-6 h-px ${s.done ? 'bg-green-500/30' : 'bg-zinc-800'}`} />
                )}
              </div>
            ))}
          </div>

          {step === 'approving' && (
            <p className="text-xs text-zinc-500 mt-2 ml-1">
              Approving USDC spend for Uniswap — check your wallet
            </p>
          )}
          {step === 'approved' && (
            <p className="text-xs text-zinc-500 mt-2 ml-1">
              USDC approved. Ready to swap.
            </p>
          )}
          {step === 'swapping' && (
            <p className="text-xs text-zinc-500 mt-2 ml-1">
              Swap in progress — confirm in your wallet
            </p>
          )}
          {step === 'done' && (
            <p className="text-xs text-green-400 mt-2 ml-1">
              Swap complete. 0.198 ETH received.
            </p>
          )}
        </div>
      )}

      {/* CTA */}
      <button
        onClick={advance}
        className={`w-full py-3 rounded-lg text-sm font-medium transition-all ${
          step === 'done'
            ? 'bg-green-500/20 text-green-300 border border-green-500/20'
            : step === 'idle'
            ? 'bg-violet-600 hover:bg-violet-500 text-white'
            : 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
        }`}
      >
        {step === 'idle' && 'Approve & Swap'}
        {step === 'approving' && 'Waiting for approval…'}
        {step === 'approved' && 'Confirm Swap →'}
        {step === 'swapping' && 'Swap pending…'}
        {step === 'done' && '✓ Done — swap again?'}
      </button>

      {step === 'idle' && (
        <p className="text-xs text-zinc-600 text-center">
          2 steps required · approval + swap · ~$0.14 total gas
        </p>
      )}
    </div>
  )
}
