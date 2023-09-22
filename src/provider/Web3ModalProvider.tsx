import { MATCHTEST_Chain, MATCH_Chain, BSC_Chain } from '@/Contract/chains'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { bsc } from 'viem/chains'
import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const projectId = '771442ad0bb44651b29f3163b52147d3'

/**使用 web3modal 定义的链 */
// const chains = [bsc]
// const wagmiConfig = defaultWagmiConfig({ chains, projectId, appName: 'Wallets' })


/**自定义链 */
const { chains, publicClient } = configureChains(
  [MATCH_Chain],
  [publicProvider()],
)
const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors:[
    new WalletConnectConnector({options:{projectId,showQrModal:false}}),
    new InjectedConnector({ options: { shimDisconnect: true } }),
    // new CoinbaseWalletConnector({ options: { appName: 'Wallets' } })
  ]
})


createWeb3Modal({ wagmiConfig, projectId, chains })

export default function Web3ModalProvider({ children }:any){
  return <WagmiConfig config={wagmiConfig}>
    {children}
  </WagmiConfig>
}