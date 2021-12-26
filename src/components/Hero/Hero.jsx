import React from 'react'
import styles from './Hero.module.css'
import chatimg from '../../images/chat.svg'

export default function Hero() {
  return (
    <div className={styles.herocontainer}>
      <img src={chatimg} alt="Chat" className={styles.heroimg}/>
      <div className={styles.text}>CONVERSE</div>
    </div>
  )
}
