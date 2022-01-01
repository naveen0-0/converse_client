import React,{ useState } from 'react'
import styles from './Groups.module.css'
import ListOfGroups from '../ListOfGroups/ListOfGroups'
import GroupChat from '../GroupChat/GroupChat'
import personimg from '../../images/man.png'

export default function Groups({ socket }) {

  const [ sidebarActive, setSidebarActive ] = useState(false)

  return (
    <div className={styles.friends}>
      <div className={sidebarActive? styles.listOfFriendsActive:styles.listOfFriends}>
        <ListOfGroups socket={socket} setSidebarActive={setSidebarActive} sidebarActive={sidebarActive}/>
      </div>

      <div className={styles.friendChat}>
        <GroupChat socket={socket}/>
      </div>

      <div className={styles.burger} onClick={() => setSidebarActive(!sidebarActive)}>
        <img src={personimg} alt="Person" className={styles.burgerimg}/>
      </div>

    </div>
  )
}
