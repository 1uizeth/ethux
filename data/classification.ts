import type { FramingMatch } from '@/lib/types'

// Exact function name → framing matches
export const EXACT_MATCHES: Record<string, Omit<FramingMatch, 'triggeredBy'>[]> = {
  approve: [
    { framingId: 'redundant-approvals', confidence: 'high', reason: 'Requires a separate approve transaction before the main action is possible' },
    { framingId: 'approval-management', confidence: 'high', reason: 'Creates a persistent approval that needs to be visible and revocable' },
    { framingId: 'blind-signing', confidence: 'medium', reason: 'Approval amount and spender address are easy to miss or misread without decoded display' },
  ],
  transfer: [
    { framingId: 'wrong-address', confidence: 'high', reason: 'Address-to-address transfer with no human-readable verification step' },
    { framingId: 'unpredictable-gas', confidence: 'medium', reason: 'Gas cost varies with token contract complexity' },
    { framingId: 'fiat-values-missing', confidence: 'medium', reason: 'Amount is denominated in token units, not local currency' },
  ],
  transferFrom: [
    { framingId: 'approval-management', confidence: 'high', reason: 'Consumes an existing approval — users rarely track which approvals they\'ve granted' },
    { framingId: 'wrong-address', confidence: 'medium', reason: 'Sends assets to an address the user may not verify' },
  ],
  permit: [
    { framingId: 'redundant-approvals', confidence: 'high', reason: 'Permit eliminates the separate approve transaction — this contract supports the better pattern' },
    { framingId: 'signing-fatigue', confidence: 'high', reason: 'Permit signature is an off-chain signing step users often don\'t understand' },
    { framingId: 'blind-signing', confidence: 'high', reason: 'EIP-712 permit data must be decoded clearly or it looks like gibberish' },
  ],
  swapExactTokensForTokens: [
    { framingId: 'blind-signing', confidence: 'high', reason: 'Multi-parameter swap with path array is opaque without a decoded summary' },
    { framingId: 'signing-fatigue', confidence: 'high', reason: 'Follows a mandatory approve step — two signatures for one user intent' },
    { framingId: 'redundant-approvals', confidence: 'high', reason: 'Requires prior token approval before this call can succeed' },
    { framingId: 'unpredictable-gas', confidence: 'medium', reason: 'Gas cost varies with path length and pool depth' },
  ],
  swapTokensForExactTokens: [
    { framingId: 'blind-signing', confidence: 'high', reason: 'amountInMax slippage parameter is invisible to most users without decoded display' },
    { framingId: 'signing-fatigue', confidence: 'high', reason: 'Requires prior token approval' },
    { framingId: 'unpredictable-gas', confidence: 'medium', reason: 'Gas cost varies with routing complexity' },
  ],
  swapExactETHForTokens: [
    { framingId: 'blind-signing', confidence: 'high', reason: 'amountOutMin slippage is a hidden risk without decoded display' },
    { framingId: 'unpredictable-gas', confidence: 'medium', reason: 'Gas cost varies with path and pool conditions' },
    { framingId: 'fiat-values-missing', confidence: 'medium', reason: 'ETH amount should be shown in local currency to prevent input errors' },
  ],
  swapETHForExactTokens: [
    { framingId: 'blind-signing', confidence: 'high', reason: 'msg.value (ETH input) vs exact token output requires clear decoded display' },
    { framingId: 'signing-fatigue', confidence: 'medium', reason: 'Often combined with other steps in a multi-step flow' },
  ],
  swapExactTokensForETH: [
    { framingId: 'blind-signing', confidence: 'high', reason: 'Swap output is ETH — path routing is opaque without decoded display' },
    { framingId: 'signing-fatigue', confidence: 'high', reason: 'Requires prior token approval' },
    { framingId: 'redundant-approvals', confidence: 'high', reason: 'Requires prior token approval before this call can succeed' },
  ],
  swapTokensForExactETH: [
    { framingId: 'blind-signing', confidence: 'high', reason: 'amountInMax slippage is a hidden risk' },
    { framingId: 'redundant-approvals', confidence: 'high', reason: 'Requires prior token approval' },
  ],
  addLiquidity: [
    { framingId: 'redundant-approvals', confidence: 'high', reason: 'Both token A and token B require separate approvals before addLiquidity' },
    { framingId: 'signing-fatigue', confidence: 'high', reason: 'Up to 3 signing steps: approve token A, approve token B, addLiquidity' },
    { framingId: 'blind-signing', confidence: 'high', reason: 'amountADesired/amountAMin slippage pair is invisible to most users' },
    { framingId: 'missing-signing-context', confidence: 'high', reason: 'User sees no upfront count of how many transactions are required' },
  ],
  addLiquidityETH: [
    { framingId: 'redundant-approvals', confidence: 'high', reason: 'Token approval required before ETH liquidity can be added' },
    { framingId: 'signing-fatigue', confidence: 'high', reason: 'Multiple approve + addLiquidity steps for one user intent' },
    { framingId: 'blind-signing', confidence: 'medium', reason: 'Slippage parameters are opaque without decoded display' },
    { framingId: 'missing-signing-context', confidence: 'medium', reason: 'User sees no upfront total number of required steps' },
  ],
  removeLiquidity: [
    { framingId: 'blind-signing', confidence: 'high', reason: 'amountAMin/amountBMin slippage parameters are invisible without decoded display' },
    { framingId: 'approval-management', confidence: 'medium', reason: 'LP token approval state must be actively managed by user' },
  ],
  removeLiquidityETH: [
    { framingId: 'blind-signing', confidence: 'high', reason: 'Slippage parameters require decoded display to be understood' },
    { framingId: 'approval-management', confidence: 'medium', reason: 'LP token approval management required' },
  ],
  removeLiquidityWithPermit: [
    { framingId: 'redundant-approvals', confidence: 'high', reason: 'Permit variant eliminates separate approval step — better pattern' },
    { framingId: 'blind-signing', confidence: 'high', reason: 'Combined permit + remove in one call requires very clear decoded display' },
  ],
  multicall: [
    { framingId: 'signing-fatigue', confidence: 'high', reason: 'Batches multiple calls — reduces signing steps but makes decoded summary critical' },
    { framingId: 'missing-signing-context', confidence: 'high', reason: 'User must understand the full scope of a multicall before approving' },
    { framingId: 'blind-signing', confidence: 'high', reason: 'Raw calldata in a multicall is completely opaque without decoded display' },
  ],
  execute: [
    { framingId: 'blind-signing', confidence: 'high', reason: 'Generic execute functions with calldata are the hardest to decode clearly' },
    { framingId: 'signing-fatigue', confidence: 'medium', reason: 'Often used for batched operations' },
  ],
  bridge: [
    { framingId: 'bridging-pain', confidence: 'high', reason: 'Cross-chain bridge calls require clear status, cost, and failure mode communication' },
    { framingId: 'wrong-address', confidence: 'high', reason: 'Cross-chain sends to wrong address are irreversible and often unrecoverable' },
  ],
  deposit: [
    { framingId: 'blind-signing', confidence: 'medium', reason: 'Deposit amount and destination need clear decoded display' },
    { framingId: 'unpredictable-gas', confidence: 'low', reason: 'Gas varies with contract complexity' },
  ],
  withdraw: [
    { framingId: 'blind-signing', confidence: 'medium', reason: 'Withdrawal amounts and timelock conditions need clear display' },
    { framingId: 'unpredictable-gas', confidence: 'low', reason: 'Gas varies with contract state' },
  ],
  stake: [
    { framingId: 'blind-signing', confidence: 'medium', reason: 'Staking parameters (amount, duration, validator) need decoded display' },
    { framingId: 'redundant-approvals', confidence: 'medium', reason: 'Often requires prior token approval' },
  ],
}

// Pattern-based fallback matching for unrecognized function names
export const PATTERN_MATCHES: Array<{
  pattern: RegExp
  matches: Omit<FramingMatch, 'triggeredBy'>[]
}> = [
  {
    pattern: /^swap/i,
    matches: [
      { framingId: 'blind-signing', confidence: 'medium', reason: 'Swap functions typically involve opaque path and slippage parameters' },
      { framingId: 'unpredictable-gas', confidence: 'low', reason: 'Swap gas varies with routing complexity' },
    ],
  },
  {
    pattern: /^(add|remove)Liquidity/i,
    matches: [
      { framingId: 'redundant-approvals', confidence: 'medium', reason: 'Liquidity operations typically require prior token approvals' },
      { framingId: 'signing-fatigue', confidence: 'medium', reason: 'Multiple signing steps common in liquidity flows' },
    ],
  },
  {
    pattern: /approve/i,
    matches: [
      { framingId: 'redundant-approvals', confidence: 'medium', reason: 'Approval required before main action' },
      { framingId: 'approval-management', confidence: 'medium', reason: 'Creates a persistent approval to manage' },
    ],
  },
  {
    pattern: /^(transfer|send)/i,
    matches: [
      { framingId: 'wrong-address', confidence: 'medium', reason: 'Asset transfer to an address — permanent if wrong' },
    ],
  },
  {
    pattern: /bridge|relay|dispatch/i,
    matches: [
      { framingId: 'bridging-pain', confidence: 'medium', reason: 'Cross-chain operation requiring clear status communication' },
    ],
  },
  {
    pattern: /stake|unstake|delegate/i,
    matches: [
      { framingId: 'blind-signing', confidence: 'low', reason: 'Staking parameters need clear display' },
    ],
  },
  {
    pattern: /permit/i,
    matches: [
      { framingId: 'signing-fatigue', confidence: 'medium', reason: 'Off-chain signing step that users often find confusing' },
      { framingId: 'blind-signing', confidence: 'medium', reason: 'EIP-712 data must be decoded to be understood' },
    ],
  },
]
