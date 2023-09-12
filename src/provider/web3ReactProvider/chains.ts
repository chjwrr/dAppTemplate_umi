import { ChainID } from '@/Contract/chains'
import type { AddEthereumChainParameter } from '@web3-react/types'

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
}

const BNB: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'BNB',
  symbol: 'BNB',
  decimals: 18,
}

const HT: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'HT',
  symbol: 'HT',
  decimals: 18,
}

const MAT: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'MAT',
  symbol: 'MAT',
  decimals: 18,
}
const MATIC: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Matic',
  symbol: 'MATIC',
  decimals: 18,
}

const CELO: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Celo',
  symbol: 'CELO',
  decimals: 18,
}

interface BasicChainInformation {
  urls: string[]
  name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId]
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    }
  } else {
    return chainId
  }
}

type ChainConfig = { [chainId: number]: BasicChainInformation | ExtendedChainInformation }

export const MAINNET_CHAINS: ChainConfig = {
  1: {
    urls: ['https://ethereum.publicnode.com'],
    name: 'Mainnet',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://etherscan.io/'],
  },
  10: {
    urls: ['https://mainnet.optimism.io'],
    name: 'Optimism',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://optimistic.etherscan.io'],
  },
  56:{
    urls: ['https://bsc-dataseed.binance.org/'],
    name: 'Binance',
    nativeCurrency: BNB,
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  9001: {
    urls: ['https://rpc.matchscan.io/'],
    name: 'Match',
    nativeCurrency: MAT,
    blockExplorerUrls: ['https://lisbon.matchscan.io/'],
  },
  128:{
    urls: ['https://http-mainnet.hecochain.com'],
    name: 'Heco Mainnet',
    nativeCurrency: HT,
    blockExplorerUrls: ['https://www.hecoinfo.com/en-us/'],
  },
  42161: {
    urls: ['https://arb1.arbitrum.io/rpc'],
    name: 'Arbitrum One',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://arbiscan.io'],
  },
  137: {
    urls: ['https://polygon-rpc.com'],
    name: 'Polygon Mainnet',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  42220: {
    urls: ['https://forno.celo.org'],
    name: 'Celo',
    nativeCurrency: CELO,
    blockExplorerUrls: ['https://explorer.celo.org'],
  },
}

export const TESTNET_CHAINS: ChainConfig = {
  5: {
    urls: [''],
    name: 'Görli',
  },
  420: {
    urls: ['https://goerli.optimism.io'],
    name: 'Optimism Goerli',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://goerli-explorer.optimism.io'],
  },
  421613: {
    urls: ['https://goerli-rollup.arbitrum.io/rpc'],
    name: 'Arbitrum Goerli',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://testnet.arbiscan.io'],
  },
  80001: {
    urls: [''],
    name: 'Polygon Mumbai',
    nativeCurrency: MATIC,
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  },
  44787: {
    urls: ['https://alfajores-forno.celo-testnet.org'],
    name: 'Celo Alfajores',
    nativeCurrency: CELO,
    blockExplorerUrls: ['https://alfajores-blockscout.celo-testnet.org'],
  },
  97:{
    urls: ['https://bsc-testnet.publicnode.com'],
    name: 'BNB Smart Chain Testnet',
    nativeCurrency: BNB,
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
  },
  9000:{
    urls: ['https://mat-testnet-rpc.matchscan.io'],
    name: 'Match Testnet',
    nativeCurrency: MAT,
    blockExplorerUrls: ['https://lisbon.matchscan.io/'],
  }
}

export const CHAINS: ChainConfig = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
}

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>(
  (accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls

    if (validURLs.length) {
      accumulator[Number(chainId)] = validURLs
    }

    return accumulator
  },
  {}
)

interface NetworkFace {
  [cid:number]:string
}
const ETHERSCAN_PREFIXES:NetworkFace = {
  [ChainID.HECO]: 'hecoinfo.com',
  [ChainID.ESC]: 'etherscan.io',
  [ChainID.BSC]: 'bscscan.com',
  [ChainID.MAINNET]: 'etherscan.io',
  [ChainID.POLYGON]: 'polygonscan.com',
  [ChainID.MATCH]: 'lisbon.matchscan.io',

}
export function getScanLink(
  chainId: ChainID,
  data: string,
  type: 'transaction' | 'token' | 'block' | 'address'
): string {
const prefix = `https://${ETHERSCAN_PREFIXES[chainId]}`

switch (type) {
  case 'transaction': {
    return `${prefix}/tx/${data}`
  }
  case 'token': {
    return `${prefix}/token/${data}`
  }
  case 'block': {
    return `${prefix}/block/${data}`
  }
  case 'address':
  default: {
    return `${prefix}/address/${data}`
  }
}
}

const SCAN_NAMES:NetworkFace = {
[ChainID.HECO]: 'HecoScan',
[ChainID.ESC]: 'Etherscan',
[ChainID.BSC]: 'BscScan',
[ChainID.MAINNET]: 'LocalScan',
[ChainID.POLYGON]: 'PolygonScan',
[ChainID.MATCH]: 'MatchScan',

}

export function getScanName(chainId: ChainID): string {
return SCAN_NAMES[chainId]
}

