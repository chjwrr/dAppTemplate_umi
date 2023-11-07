import { GasInfo, formatBalance } from '@/Common';
import { BigNumberish, Contract, MaxUint256, TransactionResponse, formatUnits, parseUnits } from 'ethers';
import {useQuery,useMutation} from 'react-query'
import { USDT_ADDRESSSES } from '@/Contract/addresses';
import { useAccount, useNetwork } from 'wagmi';
import { AddressMap } from './addresses';
import { useLoadingContext, LoadingType } from '@/provider/loadingProvider';
import { useDynamicContract, useTokenContract } from '@/hooks/useContract';
import { useWeb3Modal } from '@web3modal/wagmi/react'

interface Transaction {
  title: string,
  args: any[],
  gasLimit?: boolean,
  onSuccess?: Function,
  onError?: Function
}
export function useSendTransaction({
  contractAddress,
  abi,
  functionName,
  tokenAddress = USDT_ADDRESSSES,
}:{
  contractAddress:AddressMap,
  abi:any,
  functionName:string,
  tokenAddress?:AddressMap,
}) {
  const {open} = useWeb3Modal()
  const loading = useLoadingContext()
  const {chain = { id : 56 }} = useNetwork()
  const {address} = useAccount()
  const contract = useDynamicContract(contractAddress,abi) as any
  const tokenContract = useTokenContract(tokenAddress)
  function sendTransaction(params: Transaction) {
    loading.show(LoadingType.pending, 'Querying authorization information...')
    return new Promise(async() => {
      if (!address){
        loading.show(LoadingType.error, 'Please connect wallet')
        open && open()
        return
      }
      if (tokenContract){
        try {
          send(params,functionName)
        } catch (error:any) {
          console.log('allowance error===',error)
        }
      }
    })
    async function send(params:Transaction,functionName:string){
      if (!contract){
        loading.show(LoadingType.error,'create dynamic Contract error')
        return
      }
      loading.show(LoadingType.confirm, params.title)
      contract[functionName](...params.args,params.gasLimit == true ? {gasLimit:1500000} : {})
      .then(async (response: TransactionResponse) => {
        loading.show(LoadingType.pending, response.hash)
        const result:any = await response.wait();
        console.log('result===',result)
        if (result.status == 1){
          loading.show(LoadingType.success, response.hash)
          params.onSuccess && params.onSuccess(response.hash)
        }else {
          loading.show(LoadingType.error,'Please check the error message in the blockchain explorer')
          params.onError && params.onError()
        }
      })
      .catch((err: any) => {
        console.log(functionName,err)
        loading.show(LoadingType.error,err.reason || err.message ,err.transactionHash)
        params.onError && params.onError()
      })
    }
  }

  return useMutation((params: Transaction) => sendTransaction(params))
}

interface TransactionOld {
  title: string,
  func: Function,
  args: any[],
  gasLimit?: boolean,
  onSuccess?: Function,
  onError?: Function,
}

export function useSendTransactionOld() {
  const loading = useLoadingContext()
  function sendTransaction(params: TransactionOld) {
    return new Promise(() => {
      loading.show(LoadingType.confirm, params.title)
      params.func(...params.args, params.gasLimit == true ? GasInfo : {})
        .then(async (response: TransactionResponse) => {
          loading.show(LoadingType.pending, response.hash)
          await response.wait();
          loading.show(LoadingType.success, response.hash)
          params.onSuccess && params.onSuccess()
        })
        .catch((err: any) => {
          console.log(err)
          loading.show(LoadingType.error, err.reason || err.message, err.transactionHash)
          params.onError && params.onError()
        })
    })
  }

  return useMutation((params: TransactionOld) => sendTransaction(params))
}


// export function useIsMint(){
//   const {address} = useAccount()
//   const {chain = { id : 56 }} = useNetwork()
//   // const mintContranct = getContract({
//   //   address:IntoSocialMining_ADDRESSSES[chain.id as keyof AddressMap] as Address,
//   //   abi:IntoSocialMining_ABI,
//   // })


//   const mintContranct = useDynamicContract<IntoSocialMining>(IntoSocialMining_ADDRESSSES,IntoSocialMining_ABI)

//   async function fetchData(){
//     if (!address || !mintContranct){
//       return
//     }

//     const lastDay = dayjs().format('YYYYMMDD')

//     // nftContranct.estimateGas.price([1])
//     const isMining:boolean = await mintContranct.isMining(lastDay,address)
//     console.log('isMining===',isMining)
//     return {
//       isMining
//     }
//   }
//   return useQuery(["useIsMint"], fetchData, {
//     enabled:!!chain.id && !!address && !!mintContranct,
//     // refetchInterval: config.refreshInterval,
//   })

// }
