import React,{ useState } from 'react'
import styles from './Friends.module.css'
import ListOfFriends from '../ListOfFriends/ListOfFriends'
import FriendChat from '../FriendChat/FriendChat'
import personimg from '../../images/man.png'

export default function Friends({ socket, sidebarActive, setSidebarActive }) {



  return (
    <div className={styles.friends}>
      <div className={sidebarActive? styles.listOfFriendsActive:styles.listOfFriends}>
        <ListOfFriends socket={socket} setSidebarActive={setSidebarActive} sidebarActive={sidebarActive}/>
      </div>

      <div className={styles.friendChat}>
        <FriendChat socket={socket}/>
      </div>
    </div>
  )
}
