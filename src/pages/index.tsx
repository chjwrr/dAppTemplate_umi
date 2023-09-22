

// import './index.less';
// import './index.sass';
// import './index.scss';

import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useClientLoaderData, setLocale} from 'umi';
import { useAccount, useDisconnect } from 'wagmi';
import useTranslationLanguage from '@/hooks/useTranslationLanguage';
import './index.less'
import multiavatar from '@multiavatar/multiavatar'

export default function HomePage() {

  const svgCode = multiavatar('abc')
  console.log('svgCode==',svgCode)


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

      <div style={{width:100,height:100}} dangerouslySetInnerHTML={{__html:svgCode}}>

      </div>

      <button onClick={onClick}>{address || '链接钱包'}</button>
      <div>{t('welcome')}</div>
      <div>{t('welcome1',{name:'哈哈'})}</div>
    
      <div className={'title4'}>自定义字体1234</div>
      <button onClick={()=>{
        setLocale('zh-CN',false)
      }}>切换中文</button>
      <button onClick={()=>{
        setLocale('en-US',false)
      }}>切换英文</button>
      <img src='/images/yay.jpg'/>
    </div>
  );
}


export async function clientLoader() {
  const data = await fetch('/api/data');
  return data;
}