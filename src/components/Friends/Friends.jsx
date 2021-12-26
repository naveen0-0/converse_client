import React from 'react'
import styles from './Friends.module.css'
import ListOfFriends from '../ListOfFriends/ListOfFriends'
import FriendChat from '../FriendChat/FriendChat'
import { useSelector } from 'react-redux'

export default function Friends() {

  const { username } = useSelector(state => state. user)

  return (
    <div className={styles.friends}>
      <div className={styles.listOfFriends}>
        <ListOfFriends/>
      </div>
      <div className={styles.friendChat}>
        <FriendChat/>
      </div>
    </div>
  )
}
