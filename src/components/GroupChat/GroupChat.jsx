import React,{ useState } from 'react'
import styles from './GroupChat.module.css'
import { useSelector, useDispatch } from 'react-redux'
import sendimg from '../../images/send.png'
import Hero from '../Hero/Hero'
import GroupMessages from '../GroupMessages/GroupMessages'
import adduserimg from '../../images/adduser.png'
import axios from 'axios'

export default function GroupChat({ socket }) {
  const [ message, setMessage ] = useState("")
  const [ modalActive, setModalActive ] = useState(false)
  const [ friendName, setFriendName ] = useState("")
  const [ user, setUser ] = useState({});
  const [ feedback, setFeedback ] = useState("")
  const [ operation, setOperation ] = useState(null)
  
  const group = useSelector(state => state.selectedGroup)
  const { username } = useSelector(state => state.user)
  const { serverUrl } = useSelector(state => state.serverUrl)

  const sendMessage = (e) => {
    if(e.key === 'Enter' && message.trim()){
      socket.emit("group_send_msg",{ groupId : group.groupId, sender : username, message, time: new Date() })
      setMessage("")
    }
  }

  const addFriendToTheGroup = async e => {
    if(e.key === 'Enter' && friendName.trim()){
      let { data } = await axios.post(`${serverUrl}/api/add_to_group`, { name : friendName.trim(), groupId : group.groupId })
      if(data.operation){
        setUser(data.user)
      }else{
        setFeedback(data.feedback)
      }
      setOperation(data.operation)
    }
  }

  return (

    <div>
      {!group._id? <Hero/> : (
        <div className={styles.chat}>

          <div className={styles.banner}>
            <div className={styles.groupbanner}>
              <div className={styles.profileimg}>{group.groupName[0]}</div>
              <div className={styles.username}>{group.groupName}</div>
            </div>

            <div className={styles.actions}>
              <div className={styles.adduser} onClick={() => setModalActive(!modalActive)} title='Add someone to the group'>
                <img src={adduserimg} alt="Add User" className={styles.adduserimg} />
              </div>
            </div>

            {/* //@ Add someone to the group */}
            <div className={modalActive? styles.modalactive :  styles.modal}>
              <div className={styles.modaltitle}>Add Friend</div>
              <input type="text" value={friendName} onChange={e => setFriendName(e.target.value)} className={styles.addfriend} placeholder="Enter a friend name" onKeyPress={addFriendToTheGroup}/>
              <div className={styles.usercontainer}>
                {operation?(
                  <div className={styles.user}>
                    <div className={styles.fetchedUsername}>{user.username}</div>
                    <button className={styles.add}>Add</button>
                  </div>
                  ):(
                  <div className={styles.feedback}>{feedback}</div>
                )}
              </div>
            </div>

          </div>


          <div className={styles.messages}>
            <GroupMessages/>
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
