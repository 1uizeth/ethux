'use client'

import { useState } from 'react'

type StepState = 'pending' | 'current' | 'complete' | 'failed'

const STEPS = [
  { id: 'approve-a', label: 'Approve USDC', gas: '$0.04', description: 'Allow Uniswap to spend your USDC' },
  { id: 'approve-b', label: 'Approve DAI', gas: '$0.04', description: 'Allow Uniswap to spend your DAI' },
  { id: 'add-liquidity', label: 'Add Liquidity', gas: '$0.18', description: 'Deposit USDC + DAI into the USDC/DAI pool' },
]

export function TransactionStepper() {
  const [currentStep, setCurrentStep] = useState(-1) // -1 = not started
  const [failed, setFailed] = useState(false)

  const getState = (index: number): StepState => {
    if (failed && index === currentStep) return 'failed'
    if (index < currentStep) return 'complete'
    if (index === currentStep) return 'current'
    return 'pending'
  }

  const start = () => {
    setCurrentStep(0)
    setFailed(false)
  }

  const advance = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const retry = () => {
    setFailed(false)
  }

  const simulateFail = () => {
    setFailed(true)
  }

  const done = currentStep >= STEPS.length

  return (
    <div className="space-y-4">
      {/* Upfront scope */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="text-xs text-zinc-500 mb-3">This action requires {STEPS.length} steps</div>
        <div className="space-y-2">
          {STEPS.map((step, i) => {
            const state = getState(i)
            return (
              <div key={step.id} className={`flex items-center gap-3 p-2 rounded-md transition-all ${
                state === 'current' ? 'bg-violet-500/10' :
                state === 'complete' ? 'opacity-60' :
                state === 'failed' ? 'bg-red-500/10' : ''
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-mono transition-all ${
                  state === 'complete' ? 'bg-green-500/20 text-green-400' :
                  state === 'current' ? 'bg-violet-500/30 text-violet-300 ring-1 ring-violet-500/50 animate-pulse' :
                  state === 'failed' ? 'bg-red-500/20 text-red-400' :
                  'bg-zinc-800 text-zinc-600'
                }`}>
                  {state === 'complete' ? (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : state === 'failed' ? '✕' : i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium ${
                    state === 'current' ? 'text-violet-200' :
                    state === 'complete' ? 'text-zinc-500' :
                    state === 'failed' ? 'text-red-300' :
                    'text-zinc-400'
                  }`}>
                    {step.label}
                  </div>
                  {state === 'current' && (
                    <div className="text-xs text-zinc-500 mt-0.5">{step.description}</div>
                  )}
                </div>
                <span className={`text-xs font-mono shrink-0 ${
                  state === 'complete' ? 'text-zinc-600' : 'text-zinc-600'
                }`}>{step.gas}</span>
              </div>
            )
          })}
        </div>

        <div className="mt-3 pt-3 border-t border-zinc-800 flex justify-between text-xs text-zinc-600">
          <span>Total estimated gas</span>
          <span className="font-mono">~$0.26</span>
        </div>
      </div>

      {/* Action buttons */}
      {currentStep === -1 && (
        <button
          onClick={start}
          className="w-full py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all"
        >
          Start — complete all {STEPS.length} steps
        </button>
      )}

      {currentStep >= 0 && !done && !failed && (
        <div className="flex gap-2">
          <button
            onClick={advance}
            className="flex-1 py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-all"
          >
            {currentStep < STEPS.length - 1 ? `Step ${currentStep + 1} done → Continue` : 'Finish'}
          </button>
          <button
            onClick={simulateFail}
            className="px-4 py-3 rounded-lg border border-zinc-800 text-zinc-600 text-sm hover:text-zinc-400 hover:border-zinc-700 transition-all"
          >
            Simulate fail
          </button>
        </div>
      )}

      {failed && (
        <div className="space-y-2">
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400">
            Step {currentStep + 1} failed: transaction rejected in wallet. Your previous steps are still valid — you only need to retry this step.
          </div>
          <button
            onClick={retry}
            className="w-full py-3 rounded-lg border border-red-500/20 bg-red-500/10 text-red-300 text-sm font-medium hover:bg-red-500/20 transition-all"
          >
            Retry step {currentStep + 1}
          </button>
        </div>
      )}

      {done && (
        <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-300 text-center">
          All steps complete. Liquidity added successfully.
        </div>
      )}
    </div>
  )
}
