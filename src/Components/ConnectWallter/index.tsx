import React, {useContext, useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import { useAccount } from 'wagmi'
import { isBrowser } from 'react-device-detect';
import { FlexView, FlexViewCenter } from '../View';
import { autoWidthVW, formatAccount } from '@/Common';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';

export default function ConnectWallet() {


  /**
   *  const {open} = useWeb3Modal()
      const {switchNetwork} = useSwitchNetwork()
      切换网络  switchNetwork（chain.id）

      const {address} = useAccount()

      const {chain,chains} = useNetwork()
      chain.unsupported == true  网络错误
      chains[0].id  切换到该网络
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
