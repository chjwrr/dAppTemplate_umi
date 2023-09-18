import { MATCHTEST_Chain, MATCH_Chain } from '@/Contract/chains'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'

const chains = [MATCHTEST_Chain]
const projectId = '771442ad0bb44651b29f3163b52147d3'
const wagmiConfig = defaultWagmiConfig({ chains, projectId, appName: 'Wallets' })
createWeb3Modal({ wagmiConfig, projectId, chains })

export default function Web3ModalProvider({ children }:any){
  return <WagmiConfig config={wagmiConfig}>
    {children}
  </WagmiConfig>
}