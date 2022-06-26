import React from 'react'
import styles from './SplashScreen.module.css'
import mainload from '../../images/mainload.svg'


export default function SplashScreen() {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.mainText}>CONVERSE</div>
        <div className={styles.mainload}><img src={mainload} alt="Main Load" className={styles.mainloadsvg} /></div>
      </div>
    </div>
  )
}
