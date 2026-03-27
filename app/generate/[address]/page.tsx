import { fetchAbi, isValidAddress } from '@/lib/etherscan'
import { classifyAbi } from '@/lib/classifier'
import { notFound } from 'next/navigation'
import { GeneratedPageClient } from './GeneratedPageClient'

interface Props {
  params: Promise<{ address: string }>
}

export async function generateMetadata({ params }: Props) {
  const { address } = await params
  return {
    title: `${address.slice(0, 10)}… · ethux.design`,
  }
}

export default async function GenerateAddressPage({ params }: Props) {
  const { address } = await params

  if (!isValidAddress(address)) {
    notFound()
  }

  const abiResult = await fetchAbi(address)

  let result
  let error: string | undefined

  if (abiResult.ok) {
    result = classifyAbi(abiResult.abi, abiResult.contractName)
  } else {
    error = abiResult.error
    // Fall back to empty result — client will show error state
    result = { matches: [], functions: [], contractName: undefined }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-zinc-700 font-mono">
        <a href="/" className="hover:text-zinc-500 transition-colors">ethux.design</a>
        <span>/</span>
        <a href="/generate" className="hover:text-zinc-500 transition-colors">generate</a>
        <span>/</span>
        <span className="text-zinc-500">{address.slice(0, 10)}…{address.slice(-4)}</span>
      </nav>

      <GeneratedPageClient
        address={address}
        result={result}
        error={error}
      />
    </div>
  )
}
