import React,{ useEffect, useState } from 'react'
import styles from './FriendChat.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Hero from '../Hero/Hero'
import Messages from '../Messages/Messages'
import backpng from '../../images/back.png'
import FriendChatInputContainer from '../FriendChatInputContainer/FriendChatInputContainer'

export default function FriendChat({ socket }) {
  const dispatch = useDispatch()
  const selectedFriends = useSelector(state => state.selectedFriends)
  const { username,chatId } = useSelector(state => state.user)
  
  const RemoveFriend = () => {
    dispatch({ type:"REMOVE_FRIEND"})
  }

  return (
    <div>
      {!selectedFriends._id ?  <Hero/> : (
        <div className={styles.chat}>

          <div className={styles.mainbanner}>
            <div className={styles.back} onClick={RemoveFriend}><img src={backpng} alt="Back Png" className={styles.backpng}/></div>
            <div className={styles.banner}>
              <div className={styles.profileimg}>{selectedFriends.friend1 === username?selectedFriends.friend2[0].toUpperCase() : selectedFriends.friend1[0].toUpperCase()}</div>
              <div className={styles.username}>{selectedFriends.friend1 === username?selectedFriends.friend2 : selectedFriends.friend1}</div>
            </div>
          </div>

          <div className={styles.messages}>
            <Messages/>
          </div>

          <FriendChatInputContainer socket={socket}/>

        </div>
      )}
    </div>
  )
}
