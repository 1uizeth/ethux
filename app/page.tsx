'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { isValidAddress } from '@/lib/etherscan'
import { OPPORTUNITY_AREAS } from '@/lib/data/framings'

const EXAMPLE_CONTRACTS = [
  { name: 'Uniswap V2 Router', address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', description: 'swap, approve, addLiquidity' },
  { name: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', description: 'transfer, approve, permit' },
  { name: 'Wrapped Ether', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', description: 'deposit, withdraw, transfer' },
]

export default function Home() {
  const router = useRouter()
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = address.trim()
    if (!trimmed) {
      setError('Enter a contract address')
      return
    }
    if (!isValidAddress(trimmed)) {
      setError('Must be a valid 0x… Ethereum address (42 characters)')
      return
    }
    router.push(`/generate/${trimmed}`)
  }

  const totalPainPoints = OPPORTUNITY_AREAS.reduce((sum, a) => sum + a.painPoints.length, 0)
  const criticalCount = OPPORTUNITY_AREAS.flatMap(a => a.painPoints).filter(p => p.severity === 'Critical').length

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-20">

      {/* Hero */}
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-mono text-violet-400 uppercase tracking-widest">
            ethux.design · generative design system
          </p>
          <h1 className="text-3xl font-semibold text-zinc-100 leading-tight">
            A contract address is already<br />a specification.
          </h1>
          <p className="text-zinc-500 text-base leading-relaxed max-w-xl">
            Input a contract address. The system classifies its functions against{' '}
            <span className="text-zinc-300">{totalPainPoints} Ethereum UX problem framings</span>,
            then generates design system components that address the UX decisions it forces.
          </p>
        </div>

        {/* Contract input */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={address}
              onChange={e => { setAddress(e.target.value); setError('') }}
              placeholder="0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-sm font-mono text-zinc-200 placeholder:text-zinc-700 outline-none focus:border-violet-500/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-3 rounded-lg text-sm font-medium transition-colors shrink-0"
            >
              Generate
            </button>
          </div>

          {error && (
            <p className="text-xs text-red-400 font-mono">{error}</p>
          )}
        </form>

        {/* Example contracts */}
        <div className="space-y-2">
          <p className="text-xs text-zinc-700 font-mono">Try an example:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_CONTRACTS.map(c => (
              <button
                key={c.address}
                onClick={() => setAddress(c.address)}
                className="group flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 hover:border-zinc-700 transition-colors text-left"
              >
                <div>
                  <div className="text-xs text-zinc-300 group-hover:text-zinc-100 transition-colors">{c.name}</div>
                  <div className="text-xs text-zinc-700 font-mono mt-0.5">{c.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="space-y-6">
        <h2 className="text-xs font-mono text-zinc-700 uppercase tracking-widest">How it works</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              step: '01',
              title: 'Fetch ABI',
              description: 'The contract ABI is fetched from Etherscan. Every function is extracted and classified.',
            },
            {
              step: '02',
              title: 'Match framings',
              description: `Function names are matched against ${totalPainPoints} problem framings across 8 opportunity areas. ${criticalCount} are Critical severity.`,
            },
            {
              step: '03',
              title: 'Generate components',
              description: 'Design system components are rendered for each matched framing — demonstrating the UX decisions the contract forces.',
            },
          ].map(item => (
            <div key={item.step} className="rounded-xl border border-zinc-900 p-5 space-y-3">
              <span className="text-xs font-mono text-zinc-700">{item.step}</span>
              <h3 className="text-sm font-semibold text-zinc-200">{item.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Problem framings preview */}
      <div className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs font-mono text-zinc-700 uppercase tracking-widest">
            Problem framings index — {totalPainPoints} framings across 8 areas
          </h2>
          <a href="/framings" className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-mono">
            View all →
          </a>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {OPPORTUNITY_AREAS.map((area, i) => {
            const criticals = area.painPoints.filter(p => p.severity === 'Critical')
            return (
              <a
                key={area.id}
                href={`/framings#${area.id}`}
                className="group rounded-xl border border-zinc-900 p-4 hover:border-zinc-800 transition-colors space-y-2"
              >
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-mono text-zinc-700">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-xs text-zinc-700 font-mono">{area.painPoints.length} framings</span>
                </div>
                <h3 className="text-sm font-semibold text-zinc-300 group-hover:text-zinc-100 transition-colors">
                  {area.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2">
                  {area.tagline}
                </p>
                {criticals.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {criticals.map(p => (
                      <span key={p.id} className="text-xs bg-red-500/10 text-red-400/80 border border-red-500/10 px-1.5 py-0.5 rounded">
                        {p.title}
                      </span>
                    ))}
                  </div>
                )}
              </a>
            )
          })}
        </div>
      </div>

    </div>
  )
}
