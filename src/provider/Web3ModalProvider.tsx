import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { bsc, mainnet } from 'wagmi/chains'

const chains = [bsc, mainnet]
const projectId = '771442ad0bb44651b29f3163b52147d3'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)


export default function Web3ModalProvider({ children }:any){
  return <WagmiConfig config={wagmiConfig}>
    {children}
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
  </WagmiConfig>
}