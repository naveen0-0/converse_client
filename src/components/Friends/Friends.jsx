import React,{ useState } from 'react'
import styles from './Friends.module.css'
import ListOfFriends from '../ListOfFriends/ListOfFriends'
import FriendChat from '../FriendChat/FriendChat'
import personimg from '../../images/man.png'

export default function Friends({ socket }) {

  const [ sidebarActive, setSidebarActive ] = useState(false)

  return (
    <div className={styles.friends}>
      <div className={sidebarActive? styles.listOfFriendsActive:styles.listOfFriends}>
        <ListOfFriends socket={socket} setSidebarActive={setSidebarActive} sidebarActive={sidebarActive}/>
      </div>

      <div className={styles.friendChat}>
        <FriendChat socket={socket}/>
      </div>

      <div className={styles.burger} onClick={() => setSidebarActive(!sidebarActive)}>
        <img src={personimg} alt="Person" className={styles.burgerimg}/>
      </div>

    </div>
  )
}
