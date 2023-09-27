import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import { useAccount } from 'wagmi'
import { FlexView, FlexViewCenter } from '../View';
import { autoWidthVW, formatAccount } from '@/Common';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { connect,disconnect } from '@wagmi/core'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { bsc } from 'viem/chains';


export default function ConnectWallet() {

  const {open,close} = useWeb3Modal()

  async function onMetamask(){
    const connectInfo = await connect({
      connector:new MetaMaskConnector({
        chains: [bsc],
        options:{}
      })
    })
    console.log('链接钱包成功',connectInfo)
    // 重要，不使用open方法链接钱包的，刷新后不会自动连接，需加上这句话
    localStorage.setItem('wagmi.injected.shimDisconnect', "1")
  }



  /**
   *  const {open} = useWeb3Modal()
      const {switchNetwork} = useSwitchNetwork()
      切换网络  switchNetwork（chain.id）
   */

  const {t} = useTranslationLanguage()
  return <FlexView style={{cursor:'pointer',height:'100%',color:'#100F16'}}>
    <WalletIcon>
    </WalletIcon>
    <Text>Connect Wallet</Text>
  </FlexView>
}
const Text = styled.span`
  color:#100F16;
  font-size:14px;
  font-weight: 500;
`
const WalletIcon = styled(FlexView)`
  width:24px;
  height:24px;
  margin-right:8px
`
const AddressView = styled(FlexViewCenter)`
  width:fit-content;
  padding:0 ${autoWidthVW(10)};
  @media (max-width: 768px) {
    padding:0;
  };
  cursor:pointer
`
const ContentView = styled(FlexViewCenter)`
  height:${autoWidthVW(52)};
  border-radius:${autoWidthVW(8)};
  background: #a097f8;
  padding:0 ${autoWidthVW(10)};
  width:fit-content;
  margin-right: ${autoWidthVW(40)};
  @media (max-width: 768px) {
    height:36px;
    border-radius:18px;
    margin-right: 0;
    width:100%;
    margin-bottom: ${autoWidthVW(20)};
  }
`
