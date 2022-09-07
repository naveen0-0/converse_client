import React from 'react'
import styles from './SideBar.module.css'
import { useDispatch } from 'react-redux'

import messagesimg from '../../images/messenger.png'
import groupimg from '../../images/group.png'
import logoutimg from '../../images/logout.png'
import adduserimg from '../../images/adduser.png'
import usernameimg from '../../images/username.png'

export default function SideBar({ setTabIndex, index, gsidebarActive, gsetSidebarActive, fsidebarActive, fsetSidebarActive }) {
  const dispatch = useDispatch()

  const Logout = () => {
    localStorage.removeItem('converse_1910_logintoken')
    dispatch({ type : "UPDATE_USER", payload:{ username: "", email : "", loggedIn:false }})
  }

  return (
    <div className={styles.sidebar}>

      <div className={styles.categories}>
        <div className={index === 0 ? styles.activecategory : styles.category1}>
          <img 
            src={messagesimg}
            alt="Messages" 
            className={styles.category1img}
            title='Messages'
            onClick={() => { setTabIndex(0); fsetSidebarActive(!fsidebarActive) }}
          />
        </div>
        <div className={index === 1 ? styles.activecategory : styles.category2}>
          <img 
            src={groupimg} 
            alt="Group"  
            className={styles.category2img}
            title='Groups'
            onClick={() => {setTabIndex(1); gsetSidebarActive(!gsidebarActive)}}
          />
        </div>
        <div className={index === 2 ? styles.activecategory : styles.category3}>
          <img 
            src={adduserimg} 
            alt="Add Friend"  
            className={styles.category3img}
            title='Add Friend'
            onClick={() => setTabIndex(2)}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <div className={index === 3 ? styles.activeprofile : styles.profile}>
          <img 
            src={usernameimg}
            alt="Profile" 
            className={styles.profileimg}
            title='Profile'
            onClick={() => { setTabIndex(3); fsetSidebarActive(!fsidebarActive) }}
          />
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


    </div>
  )
}
