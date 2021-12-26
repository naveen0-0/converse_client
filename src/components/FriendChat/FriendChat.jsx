import React,{ useEffect, useState } from 'react'
import styles from './FriendChat.module.css'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import Hero from '../Hero/Hero'
import sendimg from '../../images/send.png'

export default function FriendChat() {
  const dispatch = useDispatch()
  const selectedFriends = useSelector(state => state.selectedFriends)
  const { username,chatId } = useSelector(state => state.user)
  const messages = useSelector(state => state.messages)
  const [ message, setMessage ] = useState("")

  const getMessages = async () => {
    let { data } = await axios.post('http://localhost:5000/api/messages',{ selectedFriendsId : selectedFriends._id })
    dispatch({ type:"UPDATE_MESSAGES" , payload:data }) 
  }

  const sendMessage = (e) => {
    if(e.key === 'Enter' && message.trim()){
      dispatch({ type:"ADD_MESSAGE", payload:message })
    }
  }

  useEffect(() => {
    getMessages()
  },[selectedFriends])

  return (
    <div>
      {!selectedFriends._id ?  <Hero/> : (
        <div className={styles.chat}>

          <div className={styles.banner}>
            <div className={styles.profileimg}>{selectedFriends.friend1 === username?selectedFriends.friend2[0].toUpperCase() : selectedFriends.friend1[0].toUpperCase()}</div>
            <div className={styles.username}>{selectedFriends.friend1 === username?selectedFriends.friend2 : selectedFriends.friend1}</div>
          </div>

          <div className={styles.messages}>
            {messages.map((message, index) => <div key={index}>{message}</div>)}
          </div>

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
      )}
    </div>
  )
}
