import React from 'react'
import styles from './Friends.module.css'
import ListOfFriends from '../ListOfFriends/ListOfFriends'
import FriendChat from '../FriendChat/FriendChat'

export default function Friends({ sidebarActive, setSidebarActive }) {
  return (
    <div className={styles.friends}>
      <div className={sidebarActive? styles.listOfFriendsActive:styles.listOfFriends}>
        <ListOfFriends setSidebarActive={setSidebarActive} sidebarActive={sidebarActive}/>
      </div>

      <div className={styles.friendChat}>
        <FriendChat />
      </div>
    </div>
  )
}
