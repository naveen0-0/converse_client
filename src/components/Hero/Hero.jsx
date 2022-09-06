import React from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <div className={styles.herocontainer}>
      <div className={styles.text}>
        Keep in <span className={styles.span}>TOUCH</span>
      </div>
    </div>
  )
}
