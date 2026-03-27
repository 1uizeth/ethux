import type { AbiItem, FetchAbiResult } from '@/lib/types'

// Well-known contract names for the demo
const KNOWN_CONTRACTS: Record<string, string> = {
  '0x7a250d5630b4cf539739df2c5dacb4c659f2488d': 'Uniswap V2 Router 02',
  '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45': 'Uniswap Universal Router',
  '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984': 'Uniswap Token (UNI)',
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 'USD Coin (USDC)',
  '0x6b175474e89094c44da98b954eedeac495271d0f': 'Dai Stablecoin (DAI)',
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': 'Wrapped Ether (WETH)',
  '0x00000000219ab540356cbb839cbe05303d7705fa': 'ETH2 Deposit Contract',
  '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9': 'Aave Token (AAVE)',
}

export async function fetchAbi(address: string): Promise<FetchAbiResult> {
  const normalized = address.toLowerCase()
  const contractName = KNOWN_CONTRACTS[normalized]

  // Try Sourcify v2 (free, no API key required, covers major verified contracts)
  try {
    const sourcifyUrl = `https://sourcify.dev/server/v2/contract/1/${address}?fields=abi`
    const res = await fetch(sourcifyUrl, { next: { revalidate: 3600 } })

    if (res.ok) {
      const json = await res.json()
      const abi = json.abi as AbiItem[] | undefined
      if (abi && abi.length > 0) {
        return { ok: true, abi, contractName }
      }
    }
  } catch {
    // Fall through to Etherscan
  }

  // Try Etherscan v2 API if API key is configured
  const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || process.env.ETHERSCAN_API_KEY || ''
  if (apiKey) {
    try {
      const url = `https://api.etherscan.io/v2/api?chainid=1&module=contract&action=getabi&address=${address}&apikey=${apiKey}`
      const res = await fetch(url, { next: { revalidate: 3600 } })

      if (res.ok) {
        const json = await res.json()
        if (json.status === '1') {
          const abi: AbiItem[] = JSON.parse(json.result)
          return { ok: true, abi, contractName }
        }
        if (json.result?.includes('not verified')) return { ok: false, error: 'not-verified' }
      }
    } catch {
      // Fall through
    }
  }

  return { ok: false, error: 'not-verified' }
}

export function isValidAddress(address: string): boolean {
  return /^0x[0-9a-fA-F]{40}$/.test(address)
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}
