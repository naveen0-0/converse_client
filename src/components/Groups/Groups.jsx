import React from 'react'
import styles from './Groups.module.css'
import ListOfGroups from '../ListOfGroups/ListOfGroups'
import GroupChat from '../GroupChat/GroupChat'

export default function Groups({ sidebarActive, setSidebarActive }) {

  return (
    <div className={styles.friends}>
      <div className={sidebarActive? styles.listOfFriendsActive:styles.listOfFriends}>
        <ListOfGroups setSidebarActive={setSidebarActive} sidebarActive={sidebarActive}/>
      </div>
      <div className={styles.friendChat}>
        <GroupChat />
      </div>
    </div>
  )
}
