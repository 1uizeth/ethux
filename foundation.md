# ethux.design: Working Notes

*Luiz · March 2026 · Internal*

This document is four things: a map of what Jakub has built at ethux.design, my read on where it currently falls short, my feedback on the direction, and a proposal for where to take it next, including a deliverable (the problem framings below) the group can act on immediately.

---

## What ethux.design is: Jakub's work

ethux.design is a living catalog of Ethereum UX improvements, framed as opportunities for growth rather than a list of complaints. It's an initiative by the Ethereum Foundation.

The site has five distinct layers:

**1. The UX Map: Opportunities for Growth**

Eight opportunity areas, each framed as a growth direction sourced from user feedback, community research, and ecosystem data:

- **User Onboarding**: "The moment someone decides to try Ethereum, a clock starts. Within five minutes, they will either complete their first action or leave permanently."
- **Transaction Clarity**: "Every wallet transaction is a trust decision. Users are asked to approve things they can't read, in formats that obscure risk."
- **Cross-chain Flow**: "Ethereum now spans dozens of networks. Users see fragmented balances, manual chain switching, and bridges that feel like sending money into a void."
- **Safety & Security**: "One bad experience, one lost transaction, and a user is gone for good."
- **Mobile & Connectivity**: "More than half of web traffic is mobile. Yet connecting a wallet from a phone browser remains one of the most broken flows in the ecosystem."
- **Accessibility**: "Over 75% of cryptocurrency users are non-native English speakers. Most dapps are English-only, jargon-heavy, and fail basic accessibility standards."
- **Protocol Design**: "Some UX problems can't be solved at the wallet layer. They originate in protocol design decisions that ripple outward as confusion, friction, and risk."
- **Daily Operations**: "The tasks people do every day: sending tokens, checking balances, managing gas. These should be the most polished flows in the ecosystem. They are often the most frustrating."

Each area contains specific pain points rated by severity (Critical, High, Medium). Inside each pain point: user research quotes, linked solutions (ERCs/EIPs with adoption data), opportunity framing, risk-of-inaction framing, and related standards.

**2. Solutions: Implementation Checklists**

36 patterns across 7 solution areas. Builders tick items off as they implement them. Progress is saved locally. Each item has a description, severity rating, and links to the relevant EIP or documentation. The 7 areas: Token Approvals, Transaction Signing, Gas & Fees, Multi-Chain, Onboarding, Wallet Connection, Safety & Security.

**3. Insights: Foundational Research**

Three frameworks explaining the adoption gap, based on CRADL research (2022, funded by WEF and EF):

- **The Chasm**: 67% of new wallet users leave within a week. Why good UI alone isn't enough.
- **Onboarding Journey**: Five stages between curiosity and competence. Most products lose people at stage two.
- **Investing vs Transacting**: Wallets show a portfolio and a Send button on the same screen. These are two different products pretending to be one.

**4. UX Skill Files: For Builders**

Structured Ethereum UX rules formatted for AI agents to read directly. Builders drop them into Claude Code, Cursor, or Copilot as project instructions. Current files: Token Approvals, Transaction Signing, Gas & Fees, Multi-Chain, Onboarding, Wallet Connection, Safety & Security.

**5. Submit: Community Input**

A Paperform-powered form: "Report a UX problem." Three fields: what went wrong, which app or wallet, how much it affected you (0–100 slider). Community reports feed back into the map.

---

## My read on the gap

The site does the research and standards work well. What it doesn't do is help a builder understand the design space those standards open up, or show that multiple valid approaches exist for the same problem.

AI coding assistants have made this urgent. Skills like those on ethskills.com are being fed directly into agents, encoding one team's implementation choices as rules. A builder whose agent loads one of these skills implements it without knowing alternatives exist. At scale that's not a pattern library, it's fragmentation by whichever skill was easiest to find.

The contracts underneath are neutral. They define what's structurally possible. The design decisions happen on top of them, and right now those decisions are being made invisibly, once, by whoever published a skill first.

---

## My proposal

Two distinct things, at different scales.

### 1. Problem framings: an addition to ethux.design

Each pain point on the existing site gets a problem framing: a precise structural question that opens up the design space instead of collapsing it into one answer. Alongside the existing "report a UX problem" form, a second submission flow lets teams and builders contribute their version of a solution, anchored to a specific framing.

This is an addition to the existing site, not a new product. The open question, how submitted solutions get curated and fed back, is real but it's an editorial problem, not a blocker. The framing layer and the new submission flow can ship without solving the curation loop first.

| Layer | What it contains | Status |
|---|---|---|
| Opportunity areas | 8 growth directions, framed from research | ✅ Exists |
| Pain points | Specific problems, severity-rated, with research | ✅ Exists |
| Solutions / Checklists | 36 implementation patterns linked to ERCs | ✅ Exists |
| Insights | 3 foundational frameworks (CRADL research) | ✅ Exists |
| UX Skill Files | AI-readable rule sets for builders | ✅ Exists |
| Submit form | Community UX problem reporting | ✅ Exists |
| **Problem framings** | **Structural questions derived from each pain point** | ❌ Building |
| **Solution submissions** | **A second submit flow: teams and builders contribute their solution to a specific framing** | ❌ Building |

### 2. The generative design system: a new product

A contract address is already a specification. It defines the functions, parameters, and constraints, what the interface must do, not how it should look. Input a contract address and the system can derive what design decisions it forces, then generate:

- A **page**, assembled from design system components anchored to what the contract exposes
- A **skill**, defining what an agent needs to know to execute it
- **Multiple versions of both**, contributed by different teams, all indexed to the same contract address

The contract is the anchor that makes the whole system coherent. Every submission, page variant or skill variant, accumulates around it. Teams don't need to coordinate. Builders don't need to copy anyone. The contract sets the rules; the design system generates the options.

---

## The problem framings: what I'm contributing

What follows is every pain point on the site reframed as a structural question. This is the deliverable: a classification layer that connects contract capabilities to design decisions, and the foundation both proposed additions build on.

---

### 1. User Onboarding

*The moment someone decides to try Ethereum, a clock starts. Within five minutes, they will either complete their first action or leave permanently. These are the walls between curiosity and that first transaction.*

---

**The Gas Hurdle** · Critical

Pain point: Users must buy and transfer ETH before they can do almost anything. This multi-step onramp process creates a massive barrier for newcomers. Sponsoring initial transactions through paymasters is the most promising path forward. Solutions live: Paymasters (ERC-4337, 54M+ smart accounts), EIP-7702 Delegation (9 wallets on mainnet), SmolRefuel (80+ chains).

Problem framing:
> How does a product get a first-time user to their first transaction without requiring them to understand, acquire, or manage ETH for gas first?

---

**Inscrutable Jargon** · Critical

Pain point: The entire space is filled with unexplained technical terms, staking, smart contract, liquidity pool, private key, gas. Worse, even fundamental concepts lack consistent naming across wallets: "seed phrase," "mnemonic," "secret key," "recovery phrase," and "secret recovery phrase" all refer to the same thing. A user who learns one term encounters a different one in the next wallet. No industry glossary standard exists; no wallet is building UX writing guidelines.

Problem framing:
> How does a product introduce and consistently use plain-language terms for core crypto concepts, so users build accurate mental models without needing prior knowledge?

---

**English-Only Recovery Phrases** · High

Pain point: Account Abstraction offers the best long-term fix by removing seed phrases entirely. For wallets that still rely on recovery phrases, BIP-39 defines wordlists in several languages, yet virtually no wallet implements them. Over 75% of crypto users are non-native English speakers, leaving them to memorize words in a foreign language.

Problem framing:
> How does a product handle the recovery phrase step for users whose primary language is not English, whether by eliminating it, localizing it, or offering a genuinely understandable alternative?

---

**Geographic Onramp Restrictions** · High

Pain point: Fiat onramps inside wallets rely on third-party providers that largely cater to Western banking systems. Users in emerging markets or highly regulated jurisdictions frequently face KYC rejection and unsupported local currencies. P2P onramps (Paxful, Remitano) exist but at 0.5–2% fees; local exchange partnerships are building with no global standard.

Problem framing:
> How does a product handle onboarding for users in regions where standard fiat-to-crypto onramps are unavailable, so they can reach their first transaction without hitting a dead end?

---

**Forced Backup Friction** · Medium

Pain point: A new user installs a wallet out of curiosity with no funds, no tokens, nothing at stake. Yet many wallets immediately present a 12-word recovery phrase and block all access until it is written down. This kills the moment of curiosity and scares users away before they ever see the app. Forcing backup on an empty wallet feels meaningless, and trains users to dismiss security prompts later. Delaying backup until the user actually holds value leads to both better retention and stronger security habits. Solutions live: Account Abstraction (no seed phrase needed, 54M+ accounts), delayed or seedless onboarding (~30–40% of wallets per ethereum.org research).

Problem framing:
> How does a product sequence the backup step so it matches the user's actual level of commitment and risk, without skipping it when it actually matters?

---

### 2. Transaction Clarity

*Every wallet transaction is a trust decision. Users are asked to approve things they can't read, in formats that obscure risk. These are the gaps between what the user sees and what actually happens. While the protocol requires no trust, every interface still does.*

---

**Blind Signing** · Critical

Pain point: Users are prompted to approve transactions without a clear, human-readable summary. This is the leading enabler of phishing attacks. Transaction simulation is live and standard in major wallets (walletbeat.eth). ERC-7730 clear signing is in draft with limited end-to-end coverage. EIP-712 typed data is live and widely supported. Clear signing could prevent wallet drainer losses ($84M in 2025, down from $494M in 2024).

Problem framing:
> How does a wallet present a signing request so users can understand what they are actually authorizing, in plain language, before they commit?

---

**Signing Fatigue** · High

Pain point: Users are constantly prompted with pop-ups asking them to "sign." The volume leads to rubber-stamping, creating massive security risks. Learned behavior is the primary reason phishing succeeds on experienced users. EIP-5792 batched calls is Final with wallet support growing but dapp integration still lagging. Session keys (ERC-7715) are in Draft with MetaMask Delegation Toolkit and Viem support.

Problem framing:
> How does a product reduce the number of signing steps required to complete a common action, without users losing awareness of what they're authorizing?

---

**Redundant Token Approvals** · High

Pain point: Before users can swap or interact with most dapps, they must first "approve" the token in a separate transaction. This separate approval step is where most first-time users abandon their first DeFi interaction, they assume the dapp is broken. EIP-5792 batched calls is Final. Permit2 is Live (Uniswap, deployed same address on ETH/OP/ARB/BASE/POLY). EIP-2612 permit is Live (USDC, DAI, UNI, aTokens, not all ERC-20s).

Problem framing:
> How does a product eliminate or explain the token approval step so users can complete their intended action without hitting an unexpected blocker first?

---

**Token Approval Management** · High

Pain point: Users can't easily find, review, or revoke existing token approvals from within their wallet. Stale unlimited approvals are ticking time bombs, exploited contracts months later drain funds from forgotten approvals. Exact-amount approvals via batched txs (EIP-5792) is Final, eliminating unlimited approvals entirely. Revoke.cash is Live on 100+ networks, open-source. In-wallet revocation is Live and starting to appear in major wallets.

Problem framing:
> How does a product give users ongoing visibility and control over the approvals they've granted, without requiring third-party tools?

---

**Missing Signing Context** · Medium

Pain point: When a user needs to sign multiple messages in a row, the wallet shows no context about how many signatures are needed. Without context, users can't distinguish legitimate multi-step requests from phishing inserted between steps. Ambiguity is the attacker's advantage. Multi-step signing UI has no standard and nobody is currently building this.

Problem framing:
> How does a wallet communicate the full scope of a multi-step signing flow upfront, so users know what they're committing to before they start?

---

**Blanket Warnings** · Medium

Pain point: Wallets apply identical red warnings to all unlimited token approvals regardless of context. Users stop reading alerts entirely after repeated false alarms, truly dangerous approvals are treated identically to routine ones. Contextual risk scoring is Building (Blockaid, Blowfish, TRM Labs, wallet integration growing).

Problem framing:
> How does a product differentiate warning severity so that high-risk actions stand out, instead of training users to dismiss every warning?

---

### 3. Cross-chain Flow

*Ethereum now spans dozens of networks. Users see fragmented balances, manual chain switching, and bridges that feel like sending money into a void. The protocol solved scaling. The UX hasn't caught up.*

---

**Bridging Pain** · Critical

Pain point: Bridging between chains is expensive for small amounts, slow, and anxiety-inducing. 70% of onboarded wallet users never complete a bridge transaction. Users who bridge incorrectly can lose funds permanently with no recourse. ERC-7683 cross-chain intents is Live ($35B+ lifetime via Across, EF + Hyperlane Open Intents Framework). Native bridges are Live per-chain.

Problem framing:
> How does a product make moving assets between chains feel like a single coherent action, with predictable cost, clear status, and no catastrophic failure modes?

---

**Different L2 Addresses** · High

Pain point: Smart contract accounts are deployed per chain, risking different addresses on different L2s. Funds sent to an Ethereum address on a new L2 may be unreachable, irreversible and deeply frustrating, with no standard recovery mechanism. Users learn through expensive mistakes. ERC-7828 chain-specific addresses is in active Draft (restructured Feb 2026). CREATE2 deterministic addresses is Live (Permit2, OpenGSN, Safe). Keystore rollups are in Research (Base, Scroll, Stackr).

Problem framing:
> How does a product handle addresses across chains so users can share one address confidently, without risk of sending funds to an unreachable location?

---

**Asset Fragmentation** · High

Pain point: Tokens scattered across chains create artificial friction. $100 spread across 5 chains can't meet DeFi minimum amounts. Users can't participate in opportunities on the "wrong" chain. Capital efficiency drops with every new L2. Intent-based protocols Live (Across $35B+, Uniswap, CoW Swap). Interop layer (EIL) Building (testnet live).

Problem framing:
> How does a product let users act on their total holdings across all chains without requiring them to manually consolidate assets first?

---

**Fragmented Asset View** · Medium

Pain point: Users must manually switch networks to see their full balances. "I find myself mostly sticking to 2-3 chains max. Every time I try to spread out more, tracking everything becomes a nightmare." Unified balance display is Live and common in major wallets. EIP-7811 unified balances is in Draft with no implementations yet. Chain abstraction is Building (Particle Network, Arcana Wallet on testnet).

Problem framing:
> How does a product show a user's complete holdings across all chains in one place, without hiding the chain-specific context that matters for their decisions?

---

**Manual Network Switching** · Medium

Pain point: When a wallet is connected to chain A and the user wants chain B, they must manually switch. Users don't understand why their transaction "didn't work." Funds sent on the wrong network require recovery steps. Confusion compounds with every new L2 added. Auto-switching dapps is Building with few dapps implementing it.

Problem framing:
> How does a product handle network switching so users are never blocked by being on the wrong chain when they try to take an action?

---

### 4. Safety & Security

*One bad experience, one lost transaction, and a user is gone for good. Solutions should empower user agency with transparent, controllable defenses rather than opaque restrictions users never opted into.*

---

**Prevalence of Scams** · Critical

Pain point: Sophisticated phishing attacks and address poisoning cause thousands of victims monthly. Each major scam event suppresses adoption across the entire ecosystem, media narratives after high-profile thefts erode public trust broadly. Transaction simulation is Live and standard in major wallets. Address poisoning detection is Building (emerging in some wallets, Blockaid integration). Wallet warnings are Live and standard in major wallets.

Problem framing:
> How does a product help users identify fraudulent requests, contracts, and interfaces at the moment of interaction, before they've already been compromised?

---

**Sending to Wrong Address** · Critical

Pain point: Addresses are cryptic hexadecimal strings with no human-readable identification. Clipboard hijack malware swaps addresses silently. Sending to wrong address is the #1 fear preventing mainstream users from sending transactions, and there is no recourse, no undo, no customer support. ENS support is Live (910K+ active domains, ENSv2 on mainnet). Address book features are Live but common, not universal. Transaction preview is Live and standard in major wallets.

Problem framing:
> How does a product reduce the risk of sending assets to an unintended address, through human-readable names, verification steps, or confirmation patterns, in a context where mistakes are permanent?

---

**Key Management Burden** · High

Pain point: Users are solely responsible for securing a private key or seed phrase that controls all their assets. Lose it and everything is gone. Get phished and everything is gone. There is no recovery, no reset password, no customer support. This single point of failure is the core security tradeoff of self-custody and the primary reason mainstream users stay on centralized exchanges. Smart accounts (ERC-4337) Live (54M+ accounts, 1B+ UserOps). EIP-7702 delegation Live (9 wallets on mainnet). Social recovery Live (growing, 44% YoY adoption). Passkey-based signing Building (emerging).

Problem framing:
> How does a product communicate the responsibility of self-custody and offer meaningful recovery options, without misleading users about the risks or overwhelming them into giving up?

---

**Spam & Junk Tokens** · Medium

Pain point: Users are airdropped random junk tokens and NFTs. Interacting with malicious tokens can trigger approval phishing. A single curious click on a fake airdrop can lead to full compromise. Token names containing URLs are social engineering at scale. Token list curation is Live and standard practice. Spam filtering is Building and uneven across wallets.

Problem framing:
> How does a product handle unsolicited tokens in a user's wallet in a way that neutralizes phishing vectors without hiding legitimate assets or requiring manual management?

---

### 5. Mobile & Connectivity

*More than half of web traffic is mobile. Yet connecting a wallet from a phone browser remains one of the most broken flows in the ecosystem.*

---

**Mobile Connection Dance** · Critical

Pain point: On mobile, tapping a dapp link opens the default browser, not the wallet. The user must copy the URL, switch to the wallet app, paste it into the in-app browser, and reconnect. iOS 17+ made this worse by removing automatic redirect back to browser-based dapps after a wallet interaction, forcing manual app switching. Deep linking standards are Building (few wallets). In-wallet browsers are Live (iOS). Embedded wallets are Live (Privy, Dynamic, Passport, bypass the problem entirely).

Problem framing:
> How does a product handle wallet connection on mobile so users can complete the connection without being bounced between apps, tabs, or broken deep links?

---

**Mobile Apps Don't Respond** · High

Pain point: Mobile wallet apps drop WalletConnect sessions silently. A Safari bug introduced in iOS 15 still causes socket connection failures after initially successful connections. A Chrome WebSocket change in May 2025 broke connection flows on Android. Wallets struggle with more than five concurrent sessions. Users tap "confirm" and nothing happens, no error, no feedback, just silence. WalletConnect mobile SDKs are Live. Embedded wallets are Live (bypass the connection reliability problem entirely).

Problem framing:
> How does a product handle wallet connection failures on mobile gracefully, with clear status and recovery paths, rather than leaving users at a silent dead end?

---

**Connection Failures** · Medium

Pain point: On desktop, EIP-6963 has largely solved wallet extensions fighting over window.ethereum. Most major wallets now announce themselves properly. The remaining friction is on mobile, where EIP-6963 does not apply and users still face unreliable connection flows between browser and wallet apps. EIP-6963 multi-wallet discovery is Live (in major wallets). WalletConnect v2 is Live (many providers).

Problem framing:
> How does a product communicate connection state clearly, connected, disconnected, or waiting, and give users a reliable path to recover when connection fails?

---

**Wallet Lock-in** · Medium

Pain point: Embedded and app-scoped wallets tie users to a single application. Users who switch apps start over with a new address, losing their transaction history, DeFi positions, governance participation, and on-chain reputation. Moving between providers means re-importing keys, reconfiguring networks, and losing app-specific settings. Portable account standards (EIP-8141) in Draft. Portable embedded wallets Building. Better wallet comparison Building.

Problem framing:
> How does a product support wallet portability so users can switch providers without losing their history, identity, or access to what they've built?

---

### 6. Accessibility

*Over 75% of cryptocurrency users are non-native English speakers. Most dapps are English-only, jargon-heavy, and fail basic accessibility standards. This is the largest unaddressed audience in the ecosystem.*

---

**Inscrutable Jargon** · Critical

Pain point: The entire space is filled with unexplained technical terms, staking, smart contract, liquidity pool, private key, gas. Even fundamental concepts lack consistent naming across wallets. Terms are either left in English surrounded by local-language UI, making the experience even more alienating, or are translated inconsistently. No industry glossary standard exists. No UX writing guidelines are being built.

Problem framing:
> How does a product introduce and consistently use plain-language terms for core crypto concepts across languages, so users build accurate mental models without prior knowledge?

---

**Conflicting Mental Models** · High

Pain point: Users arriving from traditional finance expect bank-like concepts, accounts with balances, simple transfers, and customer support. Instead they encounter gas fees, signing prompts, and token approvals. Every dapp assumes its users already understand both financial and blockchain mechanics, when in reality most understand neither. Progressive disclosure patterns are in Research. Contextual education is Building (all missing).

Problem framing:
> How does a product bridge the gap between what users expect from Web2 apps and how Ethereum products actually behave, especially around ownership, custody, and irreversibility?

---

**No Accessibility Features** · High

Pain point: An estimated 80% of protocols fail to meet WCAG accessibility standards. Research shows 6 out of 10 widely used wallets have no dedicated accessibility features. Common issues include unlabeled buttons, poor color contrast, and screen reader incompatible links. Keyboard navigation is broken across most dapp interfaces. As digital accessibility regulation tightens globally, this is becoming a legal compliance issue on top of an ethical one. WCAG compliance is Live in small amounts (85% of protocols fail to meet WCAG criteria). Accessibility audits in Research (rare).

Problem framing:
> How does a product meet baseline accessibility standards, screen reader support, keyboard navigation, contrast, font sizing, in a way that's maintained as the product evolves?

---

**No Trustworthy Help Channels** · High

Pain point: In a decentralized ecosystem, there is no customer support desk. When users get stuck, they turn to Telegram groups and Discord servers where scammers pose as helpers. DM them unsolicited, and link to phishing sites disguised as support portals. There is no way for a newcomer to distinguish a real community moderator from someone trying to drain their wallet. Major protocols are actively reducing reliance on Discord for support because phishing via help channels has become nearly unavoidable even with moderation. Official help centers are Building (Live on small scale). Verified support channels are in Research (nobody is building this).

Problem framing:
> How does a product give users a reliable, scam-resistant path to get help when they are stuck, without sending them into communities where they are most vulnerable?

---

**Poor Localization** · Medium

Pain point: Most dapps run English-only. Even where localization exists, there is no shared glossary for translating crypto-specific terms. Each project invents its own translations for concepts like staking, gas, or wallet, creating inconsistencies across languages that confuse non-English users just as much as the original jargon confuses English speakers. i18n frameworks are Live (tooling exists but most products don't reach non-English speakers). Community translations are Building (growing, no single registry for translation quality for DeFi-dapp pages).

Problem framing:
> How does a product localize not just its UI copy but its core crypto terminology, consistently and accurately, for users whose primary language is not English?

---

### 7. Protocol Design

*Some UX problems can't be solved at the wallet layer. They originate in protocol design decisions that ripple outward as confusion, friction, and risk for end users.*

---

**No Default Native Account Abstraction** · High

Pain point: On Ethereum, EOAs remain the default account type. Users must manage private keys, pay gas in ETH, and approve every action individually. Starknet launched with native AA where every account is a smart contract by default. EIP-7702 bridges EOAs toward smart account behavior but adoption is low. EIP-7701 (full native AA) has been superseded by EIP-8141 (Frame Transactions), now in active draft. ERC-4337 (off-protocol AA) is Live (54M+ accounts, 1B+ UserOps). Without native AA, dapps must support two account models, increasing complexity. Users on EOAs miss out on safety features like transaction simulation and spending limits.

Problem framing:
> How does a product communicate the difference between EOA and smart account behavior, and help users access smart account benefits without requiring them to understand the underlying architecture?

---

**On-chain Activity Is Public by Default** · High

Pain point: Every transaction on Ethereum and major L2s is permanently public and indexed by analytics providers. Users often don't realize their complete financial activity, salary, purchases, DeFi positions, is visible to anyone who knows their address. Opt-in privacy exists but requires active effort. "Every time you text someone your wallet address, you give them your full balance and your entire transaction history." Railgun (shielded balances) is Live ($4.5B+ cumulative volume). Privacy Pools (Oxbow) is Live (~1,500 users, ~$6M volume). Stealth addresses (ERC-5564) are Live (77k addresses via Umbra, few wallets). Aztec L2 (private execution) is Building (ignition mainnet live, user txs expected early 2026).

Problem framing:
> How does a product communicate the public nature of on-chain activity and offer users practical privacy options, without making privacy feel like a tool for illicit activity?

---

### 8. Daily Operations

*The tasks people do every day: sending tokens, checking balances, managing gas. These should be the most polished flows in the ecosystem. They are often the most frustrating.*

---

**Unpredictable Gas Fees** · Medium

Pain point: Gas costs have dropped dramatically, fee market averages around 3 gwei in 2025, and L2 transactions cost fractions of a cent. But the UX problem persists in a different form: users still cannot predict what a transaction will cost before they commit. Fee spikes during network congestion still catch people off guard, and the mental model of paying a variable fee for every action remains foreign to anyone coming from traditional apps. EIP-1559 fee market is Live (3/4 tab). EIP-4844 L2 costs are Live (95 Mgas L2s). Predictive fee UI with timing guidance is Live (Beyond tool only, Gas fee Protocol, no website).

Problem framing:
> How does a product help users understand what a transaction will cost before they commit, including timing tradeoffs, without requiring them to understand gas mechanics?

---

**Fiat-Based Values Missing** · Medium

Pain point: Some wallets force users to enter transaction amounts denominated in token (e.g., 0.0012 ETH) rather than in their local currency. Users have to mentally convert token prices before every send or swap, adding friction and increasing the chance of costly input errors. Fiat denomination toggle is Live (Uniswap, major wallets). Price oracle display is Live (1 wallet practice).

Problem framing:
> How does a product let users think and transact in their local currency rather than token denominations, without obscuring the actual token amounts being moved?

---

**No Portfolio & Tax Tracking** · Medium

Pain point: Tracking a complete financial picture across multiple chains, wallets, DeFi positions, LP rewards, airdrops, and bridge transactions is still impossible in a single tool. External tax software exists but requires manual reconciliation, often miscategorizes DeFi activity, and cannot reliably track cost basis across cross-chain swaps. Users who actively use DeFi face hours of manual work each tax season. Third-party tools (Koinly, CoinTracker) are Live (external, not integrated). Wallet-native tax tracking is in Research (nobody is building this).

Problem framing:
> How does a product help users understand their complete financial position across chains and generate accurate records for tax purposes, without requiring third-party reconciliation tools?

---

**NFTs Don't Load** · Medium

Pain point: Wallets struggle to display NFTs across multiple chains. The underlying problem is indexing: each blockchain requires separate infrastructure to read ownership, metadata, and media. RPC endpoints go down, indexers run in stale data, and IPFS-hosted media loads slowly or not at all. The result is blank thumbnails, missing collections, and users who think their NFTs are gone when they are just on a chain the wallet does not index. Multi-chain NFT indexing is Building (uneven across wallets). NFT metadata standards are Live (ERC-4906, ERC-1155).

Problem framing:
> How does a product reliably display a user's NFTs across chains, with accurate metadata and media, and communicate clearly when an asset is slow to load versus genuinely missing?

---

**Token List Friction** · Medium

Pain point: There is no universal token registry. A token list standard exists and is widely used for curation, but the list is fragmented across multiple independent lists with different criteria. Users regularly encounter tokens that do not appear in their wallet or swap interface, forcing manual contract address imports that most newcomers will not attempt. Token list standards are Live (Uniswap). Community-curated lists are Live (Rotki, no single registry).

Problem framing:
> How does a product help users find and add tokens that aren't on default lists, without exposing them to the scam risk that manual contract address entry creates?

---

**No Shared Design Infrastructure** · Medium

Pain point: There is no common component library or interaction pattern library for Ethereum dapps. Every team reinvents wallet connection, transaction confirmation, error states, and gas estimation UI from scratch. Fork culture spreads existing patterns but also creates static fragmentation where users face similar-looking interfaces with no way to assess trustworthiness. A shared design commons would raise the quality floor across all Ethereum dapps. Open-source design kits are Live (Shadcn, etc.). Ecosystem design system is in Research (nobody is building this).

Problem framing:
> How does a product contribute to and draw from shared interaction patterns, so that users can build familiarity across Ethereum interfaces rather than relearning every time?

---

**Transaction Cancellation Pain** · Info

Pain point: Cancelling a pending transaction requires sending a replacement with the same nonce and a higher gas fee. Most major wallets now offer speed-up and cancel buttons that handle this. On L2s, where transactions confirm in seconds, stuck transactions are rare. This remains an edge case on mainnet during congestion but is largely a solved problem for everyday use. Speed-up/cancel UI is Live (common in major wallets). Intent-based cancellation is in Research (nobody is building this).

Problem framing:
> How does a product handle stuck or pending transactions, giving users clear options to cancel or speed up, without requiring them to understand nonce mechanics?

---

## Generative design system: product flow

A contract address is already a specification. The full flow:

```
Contract address
    → ABI fetch (Etherscan / node)
    → Function classification (what interaction patterns does this contract expose?)
    → Problem framing match (which framings apply?)
    → Design decisions (what choices does each framing force?)
    → Page generation (assembled from design system components, multiple team variants)
    → Skill generation (AI-readable rules for executing this contract, multiple team variants)
    → Variant submission (teams contribute their version, indexed to the contract address)
```

The output isn't one canonical interface. It's a set of options, each variant contributed by a different team, each anchored to the same contract. A builder sees what design decisions the contract forces, what components exist to handle them, and how different teams have approached it. An agent can query the same structure and make an informed choice rather than following a hardcoded rule.

The contract is what makes the loop stable. Submissions don't drift, they accumulate around a fixed address. New variants don't replace old ones; they extend the option space. The contract doesn't change. The design knowledge around it compounds.

This works reliably for well-known contract patterns, ERC-20, ERC-721, Uniswap V4 hooks, ERC-4337 smart accounts. These are also the contracts the problem framings already cover. Novel or heavily abstracted contracts require verified source code or NatSpec to classify; LLM inference from function signatures handles most remaining cases.

The problem framings in this doc are the classification layer, the bridge between what a contract exposes and what design decisions it forces. That's why they're the foundation both things build on.

---

## What's next

**On ethux.design (near term):**

1. ✅ This doc, foundation for the prototype
2. 🔨 Add problem framings to the existing site, one per pain point
3. 📬 Add a second submission flow: alongside "report a UX problem", a new form for teams and builders to submit their solution to a specific framing
4. 🚀 Present at next group meeting

**On the generative design system (building toward):**

5. 📐 Spec the contract capability layer, what do the relevant contracts structurally expose per framing? Start with Token Approvals, Transaction Signing, Gas & Fees
6. 📦 Design the variant submission schema, how a team submits a page or skill variant: which contract, which framing, which tradeoffs, what it's optimized for
7. 🤖 Build the generator, contract address in, page and skill options out
