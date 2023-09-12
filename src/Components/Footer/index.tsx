"use client"
import React, { useEffect, useState } from "react";
import styles from './styles.module.scss'
import mainStyles from '@/styles/main.module.scss'
import commonStyles from '@/Common/common.module.scss'
import classNames from "classnames";
import Image from "next/image";
import useTranslationLanguage from "@/Hooks/useTranslationLanguage";
export default function Footer() {
  const {t} = useTranslationLanguage()
  return(
    <div className={mainStyles.main}>
      <div className={styles.line}/>
      <div className={mainStyles.mainView}>
        <div className={styles.footView}>
          <div className={commonStyles.row}>
            <div className={styles.logo}>
              <Image fill alt='' src='/images/logo.png'/>
            </div>
            <div className={commonStyles.column}>
              <div className={styles.title}>{t('STAR PROJECT')}</div>
              <div className={styles.des}>© 2023 INTO. All Rights Reserved.</div>
            </div>
          </div>
          <div className={commonStyles.row}>
            <Contact enter='/images/mediun_s.png' leave='/images/mediun.png'/>
            <Contact enter='/images/discord_s.png' leave='/images/discord.png'/>
            <Contact enter='/images/twitter_s.png' leave='/images/twitter.png'/>
            <Contact enter='/images/telegram_s.png' leave='/images/telegram.png'/>
            <Contact enter='/images/reddit_s.png' leave='/images/reddit.png'/>
            <Contact enter='/images/Github_s.png' leave='/images/Github.png'/>
            <Contact enter='/images/Youtub_s.png' leave='/images/Youtub.png'/>
          </div>
        </div>
      </div>
    </div>
  )
}
function Contact({enter,leave,link = ''}:any){
  const [mouseIn,setMouseIn] = useState(false)
  return <div onClick={()=>{
    link && window.open(link)
  }} className={styles.contact} onMouseEnter={()=>{
    setMouseIn(true)
  }} onMouseLeave={()=>{
    setMouseIn(false)
  }}>
  <Image fill alt='' src={mouseIn?enter:leave}/>
</div>
}