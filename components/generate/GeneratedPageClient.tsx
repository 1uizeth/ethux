'use client'

import type { ClassifierResult } from '@/lib/types'
import { GeneratedPage } from '@/components/generate/GeneratedPage'

interface Props {
  address: string
  result: ClassifierResult
  error?: string
}

export function GeneratedPageClient({ address, result, error }: Props) {
  return <GeneratedPage address={address} result={result} error={error} />
}
