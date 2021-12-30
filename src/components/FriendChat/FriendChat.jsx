import React,{ useEffect, useState } from 'react'
import styles from './FriendChat.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Hero from '../Hero/Hero'
import sendimg from '../../images/send.png'
import Messages from '../Messages/Messages'


export default function FriendChat({ socket }) {
  const dispatch = useDispatch()
  const selectedFriends = useSelector(state => state.selectedFriends)
  const { username,chatId } = useSelector(state => state.user)
  const [ message, setMessage ] = useState("")


  const sendMessage = (e) => {
    if(e.key === 'Enter' && message.trim()){
      socket.emit('send_msg', {
        id:selectedFriends._id,
        sender:username,
        receiver:selectedFriends.friend1 === username?selectedFriends.friend2 : selectedFriends.friend1,
        message : message,
        time : new Date(),
        chatId:chatId,
        friendChatId:selectedFriends.chatId1 === chatId?selectedFriends.chatId2 : selectedFriends.chatId1
      })
      setMessage("")
    }
  }

  return (
    <div>
      {!selectedFriends._id ?  <Hero/> : (
        <div className={styles.chat}>

          <div className={styles.banner}>
            <div className={styles.profileimg}>{selectedFriends.friend1 === username?selectedFriends.friend2[0].toUpperCase() : selectedFriends.friend1[0].toUpperCase()}</div>
            <div className={styles.username}>{selectedFriends.friend1 === username?selectedFriends.friend2 : selectedFriends.friend1}</div>
          </div>

          <div className={styles.messages}>
            <Messages/>
          </div>

          <div className={styles.input_main_container}>
            <div className={styles.inputcontainer}>
              <input 
                type="text"
                placeholder="Enter Message...."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className={styles.input}
                autoFocus={true}
                onKeyPress={sendMessage}
              />
              <img src={sendimg} alt="Search" className={styles.search}/>
            </div>
          </div>



        </div>
      )}
    </div>
  )
}
