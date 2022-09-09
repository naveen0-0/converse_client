import React,{ useState, useContext } from 'react'
import styles from './GroupChatInputContainer.module.css'
import { useSelector } from 'react-redux'
import { SocketContext } from '../../context/SocketProvider'

export default function GroupChatInputContainer() {

  const [ message, setMessage ] = useState("")
  const group = useSelector(state => state.selectedGroup)
  const { username } = useSelector(state => state.user)
  const { socket } = useContext(SocketContext)

  const sendMessage = (e) => {
    if(e.key === 'Enter' && message.trim()){
      socket.emit("group_send_msg",{ groupId : group.groupId, sender : username, message, time: new Date() })
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
