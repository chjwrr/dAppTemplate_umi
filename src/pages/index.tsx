

// import './index.less';
// import './index.sass';
// import './index.scss';

import { useWeb3React } from '@web3-react/core';
import { Web3Button, useWeb3Modal } from '@web3modal/react';
import { ethers } from 'ethers';
import { useClientLoaderData, useIntl } from 'umi';
import { useAccount, useDisconnect } from 'wagmi';
import { FormattedMessage } from 'umi';
import { setLocale } from 'umi';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';

export default function HomePage() {

  // const info = useWeb3React()
  // console.log('info===',info)

  const {open,close} = useWeb3Modal()
  const {address} = useAccount()
  const {disconnect} = useDisconnect()
  const { data } = useClientLoaderData();

  function onClick(){
    if (address){
      disconnect && disconnect()
    }else {
      open && open()
    }
  }
  const {t, language} = useTranslationLanguage()
  console.log('language===',language)

  return (
    <div style={{color:'red'}}>
      <Web3Button/>
      <button onClick={onClick}>{address || '链接钱包'}</button>
      <div>{t('welcome')}</div>
      <div>{t('welcome1',{name:'哈哈'})}</div>

      <button onClick={()=>{
        setLocale('zh-CN',false)
      }}>切换中文</button>
      <button onClick={()=>{
        setLocale('en-US',false)
      }}>切换英文</button>
    </div>
  );
}


export async function clientLoader() {
  const data = await fetch('/api/data');
  return data;
}