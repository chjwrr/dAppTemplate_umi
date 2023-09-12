"use client"
import React, { useEffect, useState } from "react";
import styles from './styles.module.scss'
import commonStyles from '../../Common/common.module.scss'
import classNames from "classnames";
import Image from "next/image";
import ConnectWallet from "../ConnectWallter";
import { usePathname, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import useTranslationLanguage from "@/Hooks/useTranslationLanguage";
import Language from "../Language";
export default function Header() {
  const [show,setShow] = useState(0)
  const router = useRouter()
  const pathname = usePathname()
  const {address} = useAccount()
  const {t} = useTranslationLanguage()
  useEffect(()=>{
    if (address && show == 1){
      setShow(2)
    }
  },[address])
  function showMenuAni(){
    if (show == 0){
      setShow(1)
    }
    if (show == 1){
      setShow(2)
    }
    if (show == 2){
      setShow(1)
    }
  }
  return(
    <div className={classNames(commonStyles.main,styles.headerMain)}>
      <div className={classNames(styles.headerView,commonStyles.rowBetween)}>
      <div className={commonStyles.row}>
        <div className={styles.logo} onClick={()=>{
            router.push('/')
          }}>
          <Image src='/images/logoicon.png' fill alt=''/>
        </div>
        <div className={styles.webItemView}>
          <span className={classNames(styles.webItemText,pathname == '/' ? styles.chooseText : styles.unChoose)} onClick={()=>{
            router.push('/')
          }}>{t('Home Page')}</span>
          <span className={classNames(styles.webItemText,pathname == '/communities' ? styles.chooseText : styles.unChoose)} onClick={()=>{
            router.push('communities')
          }}>{t('My Communities')}</span>
        </div>
      </div>
      <div className={classNames(styles.webItemView)}>
        <ConnectWallet/>
        <Language/>
      </div>
      <div className={styles.menu} onClick={showMenuAni}>
        <Image src='/images/menu.png' fill alt=''/>
      </div>
      {show != 0 && <div className={classNames(styles.menuContain,"animate__animated","animate__fast",show == 1 ? "animate__bounceInDown" : "animate__bounceOutUp")}>
        <ConnectWallet/>
        <div className={classNames(commonStyles.row,styles.commView)} onClick={()=>{
          router.push('/communities')
          setShow(2)
        }}>
          <div className={styles.commicon}>
            <Image src='/images/comm.png' fill alt=''/>
          </div>
          <span className={styles.text}>{t('My Communities')}</span>
        </div>
      </div>}
    </div>
    </div>
  )
}