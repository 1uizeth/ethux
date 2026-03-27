'use client'

import { useState } from 'react'

const MOCK_ENS: Record<string, string> = {
  '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045': 'vitalik.eth',
  '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D': 'uniswap-v2-router.eth',
}

export function AddressVerifier() {
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const ensName = MOCK_ENS[address]
  const isValidHex = /^0x[0-9a-fA-F]{40}$/.test(address)
  const isFirstTime = address && isValidHex && !ensName
  const short = address ? `${address.slice(0, 8)}…${address.slice(-6)}` : ''

  const handleVerify = () => {
    if (address || true) setShowPreview(true)
  }

  return (
    <div className="space-y-3">
      {/* Address input */}
      <div>
        <label className="text-xs text-zinc-500 mb-1.5 block">Recipient address or ENS name</label>
        <input
          type="text"
          value={address}
          onChange={e => { setAddress(e.target.value); setShowPreview(false) }}
          placeholder="0x… or name.eth"
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-200 font-mono placeholder:text-zinc-700 outline-none focus:border-violet-500/50 transition-colors"
        />
      </div>

      {/* ENS resolution */}
      {address && isValidHex && ensName && (
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-green-400 font-mono">{ensName}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-500">{short}</span>
        </div>
      )}

      {/* First-time warning */}
      {isFirstTime && (
        <div className="flex items-start gap-2 text-xs">
          <div className="w-4 h-4 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-2.5 h-2.5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
            </svg>
          </div>
          <span className="text-yellow-400/80">First time sending to this address. Double-check before confirming.</span>
        </div>
      )}

      {/* Amount input */}
      <div>
        <label className="text-xs text-zinc-500 mb-1.5 block">Amount</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0.00"
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-200 font-mono placeholder:text-zinc-700 outline-none focus:border-violet-500/50 transition-colors"
          />
          <div className="flex items-center gap-1 bg-zinc-800 border border-zinc-700 px-3 py-2.5 rounded-lg">
            <span className="text-sm font-mono text-zinc-300">ETH</span>
          </div>
        </div>
        {amount && (
          <p className="text-xs text-zinc-600 mt-1">≈ ${(parseFloat(amount) * 2514).toLocaleString('en-US', { maximumFractionDigits: 2 })} USD</p>
        )}
      </div>

      {/* Confirm preview */}
      {showPreview && (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-3">
          <div className="text-xs text-zinc-500 mb-2">Confirm transfer</div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-zinc-600 w-20 shrink-0">To</div>
            <div>
              {ensName ? (
                <div>
                  <span className="text-sm text-zinc-200 font-mono">{ensName}</span>
                  <span className="text-xs text-zinc-600 ml-2">{short}</span>
                </div>
              ) : (
                <span className="text-sm text-zinc-200 font-mono">{address || '—'}</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-zinc-600 w-20 shrink-0">Amount</div>
            <div>
              <span className="text-sm text-zinc-200 font-mono">{amount || '0'} ETH</span>
              {amount && <span className="text-xs text-zinc-600 ml-2">≈ ${(parseFloat(amount || '0') * 2514).toFixed(2)}</span>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-zinc-600 w-20 shrink-0">Gas</div>
            <span className="text-xs text-zinc-400">~$0.06</span>
          </div>

          <div className="pt-1 text-xs text-red-400/60">
            This transaction cannot be reversed once confirmed.
          </div>
        </div>
      )}

      <button
        onClick={handleVerify}
        className="w-full py-3 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium transition-all"
      >
        {showPreview ? 'Send →' : 'Preview transfer'}
      </button>

      <p className="text-xs text-zinc-700 text-center">
        Try typing <span className="font-mono text-zinc-600">0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045</span> for ENS demo
      </p>
    </div>
  )
}
