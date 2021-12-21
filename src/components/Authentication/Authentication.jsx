import React,{ useState } from 'react'
import styles from './Authentication.module.css'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'

export default function Authentication() {
  const [ tabIndex, setTabIndex ] = useState(0);
  const components = [ <Signup setTabIndex={setTabIndex}/>, <Login/> ];

  return (
    <div className={styles.auth}>

      <div className={styles.authtitle}>CONVERSE</div>

      <div className={styles.tabs}>
        <div className={tabIndex === 0? styles.tabactive : styles.tab} onClick={() => setTabIndex(0)}>signup</div>
        <div className={tabIndex === 1? styles.tabactive : styles.tab} onClick={() => setTabIndex(1)}>login</div>
      </div>

      <div>
        {components[tabIndex]}
      </div>
    </div>
  )
}
