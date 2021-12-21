import React from 'react'
import styles from './SideBar.module.css'
import { useDispatch } from 'react-redux'
import messagesimg from '../../images/messenger.png'
import groupimg from '../../images/group.png'
import logoutimg from '../../images/logout.png'

export default function SideBar({ setTabIndex }) {
  const dispatch = useDispatch()

  const Logout = () => {
    localStorage.removeItem('converse_1910_logintoken')
    dispatch({ type : "UPDATE_USER", payload:{ username: "", email : "", loggedIn:false }})
  }

  return (
    <div className={styles.sidebar}>

      <div className={styles.categories}>
        <div className={styles.category1}>
          <img 
            src={messagesimg} 
            alt="Messages" 
            className={styles.category1img}
            title='Messages'
            onClick={() => setTabIndex(0)}
          />
        </div>
        <div className={styles.category2}>
          <img 
            src={groupimg} 
            alt="Group"  
            className={styles.category2img}
            title='Groups'
            onClick={() => setTabIndex(1)}
          />
        </div>
      </div>

      <div className={styles.logout} onClick={Logout}>
        <img 
          src={logoutimg} 
          alt="Logout" 
          className={styles.logoutimg}
          title='Logout'
        />
      </div>

    </div>
  )
}
