'use client'

import { useState } from 'react'

const GAS_OPTIONS = [
  { label: 'Slow', time: '~2 min', gwei: '2.1', usd: '$0.08', eth: '0.000034 ETH', selected: false },
  { label: 'Standard', time: '~30 sec', gwei: '3.4', usd: '$0.14', eth: '0.000055 ETH', selected: true },
  { label: 'Fast', time: '~10 sec', gwei: '5.8', usd: '$0.23', eth: '0.000093 ETH', selected: false },
]

export function GasEstimator() {
  const [selected, setSelected] = useState(1)
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {GAS_OPTIONS.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => setSelected(i)}
            className={`rounded-lg border p-3 text-left transition-all ${
              selected === i
                ? 'border-violet-500 bg-violet-500/10'
                : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
            }`}
          >
            <div className="text-xs font-mono text-zinc-400 mb-2">{opt.label}</div>
            <div className="text-sm font-semibold text-zinc-100">{opt.usd}</div>
            <div className="text-xs text-zinc-500 mt-1">{opt.time}</div>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-600 px-1">
        <span>Estimates may vary ±15% with network conditions</span>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-zinc-500 hover:text-zinc-300 transition-colors font-mono"
        >
          {showAdvanced ? 'Hide' : 'Advanced'} ↓
        </button>
      </div>

      {showAdvanced && (
        <div className="border border-zinc-800 rounded-lg p-3 bg-zinc-900/50 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-zinc-500">Gas price</span>
            <span className="text-zinc-300 font-mono">{GAS_OPTIONS[selected].gwei} gwei</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-500">Token amount</span>
            <span className="text-zinc-300 font-mono">{GAS_OPTIONS[selected].eth}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-zinc-500">Gas limit (est.)</span>
            <span className="text-zinc-300 font-mono">~155,000</span>
          </div>
        </div>
      )}
    </div>
  )
}
