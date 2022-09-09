import React,{ useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './FriendChatInputContainer.module.css'
import { SocketContext } from '../../context/SocketProvider'

export default function FriendChatInputContainer() {
  const [ message, setMessage ] = useState("")
  const selectedFriends = useSelector(state => state.selectedFriends)
  const { username,chatId } = useSelector(state => state.user)
  const { socket } = useContext(SocketContext)

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
    <div className={styles.inputcontainer}>
      <input 
        type="text"
        placeholder="Send a message . . . ."
        value={message}
        onChange={e => setMessage(e.target.value)}
        className={styles.input}
        autoFocus={true}
        onKeyPress={sendMessage}
      />
    </div>
  )
}
