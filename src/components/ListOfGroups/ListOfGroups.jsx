import React,{ useState, useContext } from 'react'
import styles from './ListOfGroups.module.css'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { SocketContext } from '../../context/SocketProvider';


export default function ListOfGroups({ setSidebarActive, sidebarActive }) {
  const dispatch = useDispatch()
  const { username } = useSelector(state => state.user)
  const { serverUrl } = useSelector(state => state.serverUrl)
  const [ searchText, setSearchText ] = useState("")
  const groups = useSelector( state => state.groups )
  const [ buttonActive, setButtonActive ] = useState(false)
  const [ feedback, SetFeedback ] = useState("")
  const { socket,setModalActive, AddNotification } = useContext(SocketContext)


  const CreateGroup = async e => {
    e.preventDefault()
    setButtonActive(true)
    let { data } = await axios.post(`${serverUrl}/api/create_group`,{ username, groupId : uuidv4(), groupName:searchText.trim() })
    if(data.operation){
      socket.emit("join_the_created_room", data.group.groupId)
      dispatch({ type: "ADD_GROUP", payload : data.group })
      SetFeedback(`${searchText} has been created`)
      setTimeout(() => {
        SetFeedback("")
      },2000)
    }else{
      SetFeedback(data.feedback)
      setTimeout(() => {
        SetFeedback("")
      },2000)
    }
    setSearchText("")
    setButtonActive(false)
  }

  const updateGroup = (group) => {
    dispatch({ type:"UPDATE_GROUP", payload: group });
    setSidebarActive(!sidebarActive)
    setModalActive(false)
  }

  return (
    <div className={styles.container}>

      <div className={styles.inputcontainer}>
        <form onSubmit={CreateGroup}>
          <input 
            type="text"
            placeholder="Enter a group name"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            className={styles.input}
            required
          />
          <button type='submit' className={styles.create_group} disabled={buttonActive}>Create Group</button>
        </form>
        <div className={styles.feedback}>{feedback}</div>
      </div>

      <div className={styles.groups}>
        {groups.map((group, index) => 
          <div title={group.groupName} key={index} className={styles.group} onClick={() => updateGroup(group)}>
            <div className={styles.profileimg}>{group.groupName[0]}</div>
            <div className={styles.groupnamecontainer}>
              <div className={styles.groupname}>{group.groupName}</div>
              {group.messages.length === 0?
                <div className={styles.lastMsg}>{group.groupName} group has been created</div> : 
                <div className={styles.lastMsg}>{group.messages[group.messages.length-1].message}</div>
              }
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
