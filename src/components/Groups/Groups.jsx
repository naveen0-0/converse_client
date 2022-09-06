import React,{ useState } from 'react'
import styles from './Groups.module.css'
import ListOfGroups from '../ListOfGroups/ListOfGroups'
import GroupChat from '../GroupChat/GroupChat'

export default function Groups({ socket,sidebarActive, setSidebarActive, btnText, setBtnText }) {

  return (
    <div className={styles.friends}>
      <div className={sidebarActive? styles.listOfFriendsActive:styles.listOfFriends}>
        <ListOfGroups socket={socket} setSidebarActive={setSidebarActive} sidebarActive={sidebarActive}/>
      </div>
      <div className={styles.friendChat}>
        <GroupChat socket={socket} btnText={btnText} setBtnText={setBtnText}/>
      </div>
    </div>
  )
}
