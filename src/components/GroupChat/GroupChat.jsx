import React,{ useState } from 'react'
import styles from './GroupChat.module.css'
import { useSelector, useDispatch } from 'react-redux'
import sendimg from '../../images/send.png'
import Hero from '../Hero/Hero'
import GroupMessages from '../GroupMessages/GroupMessages'

export default function GroupChat({ socket }) {
  const group = useSelector(state => state.selectedGroup)
  const [ message, setMessage ] = useState("")
  const { username } = useSelector(state => state.user)

  const sendMessage = (e) => {
    if(e.key === 'Enter' && message.trim()){
      socket.emit("group_send_msg",{ groupId : group.groupId, sender : username, message, time: new Date() })
      setMessage("")
    }
  }

  return (

    <div>
      {!group._id? <Hero/> : (
        <div className={styles.chat}>

          <div className={styles.banner}>
            <div className={styles.profileimg}>{group.groupName[0]}</div>
            <div className={styles.username}>{group.groupName}</div>
          </div>

          <div className={styles.messages}>
            <GroupMessages/>
          </div>


          <div className={styles.add}>
            +
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
