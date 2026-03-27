'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { isValidAddress } from '@/lib/etherscan'

const EXAMPLES = [
  {
    name: 'Uniswap V2 Router 02',
    address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    tags: ['swap', 'approve', 'addLiquidity', 'multicall'],
    note: 'The canonical DEX example — covers most transaction clarity framings',
  },
  {
    name: 'USDC (USD Coin)',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    tags: ['transfer', 'approve', 'permit'],
    note: 'ERC-20 with Permit2 support — covers token approval and transfer framings',
  },
  {
    name: 'Wrapped Ether',
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    tags: ['deposit', 'withdraw', 'transfer', 'approve'],
    note: 'Core wrapping contract — covers deposit/withdrawal and transfer framings',
  },
]

export default function GeneratePage() {
  const router = useRouter()
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = address.trim()
    if (!trimmed) { setError('Enter a contract address'); return }
    if (!isValidAddress(trimmed)) { setError('Must be a valid Ethereum address — 0x followed by 40 hex characters'); return }
    router.push(`/generate/${trimmed}`)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 space-y-10">
      <div className="space-y-3">
        <p className="text-xs font-mono text-violet-400 uppercase tracking-widest">
          Generative Design System
        </p>
        <h1 className="text-2xl font-semibold text-zinc-100">
          Enter a contract address
        </h1>
        <p className="text-zinc-500 text-sm leading-relaxed">
          The ABI is fetched from Etherscan, classified against the problem framings index,
          and design system components are generated for each matched framing.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-xs text-zinc-500 font-mono">Contract address (Ethereum mainnet)</label>
          <input
            type="text"
            value={address}
            onChange={e => { setAddress(e.target.value); setError('') }}
            placeholder="0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm font-mono text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-violet-500/50 transition-colors"
            autoFocus
          />
          {error && <p className="text-xs text-red-400 font-mono">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-500 text-white py-3 rounded-lg text-sm font-medium transition-colors"
        >
          Generate UI
        </button>
      </form>

      <div className="space-y-3">
        <p className="text-xs text-zinc-700 font-mono uppercase tracking-wider">Examples</p>
        <div className="space-y-2">
          {EXAMPLES.map(ex => (
            <button
              key={ex.address}
              onClick={() => setAddress(ex.address)}
              className="group w-full text-left rounded-xl border border-zinc-900 hover:border-zinc-800 p-4 transition-colors space-y-2"
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors">
                  {ex.name}
                </span>
                <span className="text-xs font-mono text-zinc-700 shrink-0">
                  {ex.address.slice(0, 10)}…
                </span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed">{ex.note}</p>
              <div className="flex flex-wrap gap-1.5">
                {ex.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-zinc-600 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
