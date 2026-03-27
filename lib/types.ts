export type Severity = 'Critical' | 'High' | 'Medium' | 'Info'

export type PainPoint = {
  id: string
  title: string
  severity: Severity
  description: string
  framing: string
  solutionsLive: string[]
}

export type OpportunityArea = {
  id: string
  title: string
  tagline: string
  painPoints: PainPoint[]
}

export type AbiItem = {
  name?: string
  type: 'function' | 'event' | 'constructor' | 'fallback' | 'receive'
  inputs?: Array<{ name: string; type: string }>
  outputs?: Array<{ name: string; type: string }>
  stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable'
}

export type FramingMatch = {
  framingId: string
  confidence: 'high' | 'medium' | 'low'
  reason: string
  triggeredBy: string[]
}

export type ClassifierResult = {
  matches: FramingMatch[]
  functions: string[]
  contractName?: string
}

export type FetchAbiResult =
  | { ok: true; abi: AbiItem[]; contractName?: string }
  | { ok: false; error: 'not-verified' | 'invalid-address' | 'network-error' | 'rate-limited' | 'unknown' }
