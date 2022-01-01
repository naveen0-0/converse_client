import React,{ useState, useEffect } from 'react'
import styles from './DashBoard.module.css'
import io from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import SideBar from '../SideBar/SideBar'
import Friends from '../Friends/Friends'
import Groups from '../Groups/Groups'
import AddFriend from '../AddFriend/AddFriend'
import axios from 'axios'

let newSocket;
export default function DashBoard() {
  const dispatch = useDispatch();
  const selectedFriends = useSelector(state => state.selectedFriends)

  //@ AddFriend state variable
  const [ text, setText ] = useState("")
  const [ user, setUser ] = useState(null)
  const [ feedback, setFeedback ] = useState("")
  const [ statusNum, setStatusNum ] = useState(null)

  const [ socket, setSocket ] = useState(null);
  const components = [ 
                      <Friends socket={socket}/>, 
                      <Groups socket={socket}/>, 
                      <AddFriend socket={socket} text={text} setText={setText} user={user} setUser={setUser} feedback={feedback} setFeedback={setFeedback} statusNum={statusNum} setStatusNum={setStatusNum}/> 
                    ]
  const [ tabIndex, setTabIndex ] = useState(0)
  const { chatId, username } = useSelector(state => state.user)
  const { serverUrl } = useSelector(state => state.serverUrl)

  //@ Socket Connection
  useEffect(() => {
    newSocket = io(serverUrl,{ query : { chatId } })
    setSocket(newSocket)
    return () => {
      newSocket.close()
      newSocket.off()
    }
  },[])

  useEffect(() => {
    newSocket.emit('join_groups',{ username })
  },[])
  
  //@ Getting Friends And Groups
  useEffect(() => {
    getFriends();
    getGroups();
  },[])
  
  //@ Friend Request Event
  useEffect(() => {
    newSocket.on('friend_request_sender', data => {
      dispatch({ type: "ADD_FRIEND", payload: data})
      setStatusNum(4)
      setFeedback("Request Sent")
    })
    newSocket.on('friend_request_receiver', data => {
      dispatch({ type: "ADD_FRIEND", payload: data})
    })
  },[])

  //@ Friend Request Accepting Event
  useEffect(() => {
    newSocket.on('friend_request_accepted_sender', data => {
      dispatch({ type : 'MAKE_A_FRIEND', payload : data })
    })
    
    newSocket.on('friend_request_accepted_receiver', data => {
      dispatch({ type : 'MAKE_A_FRIEND', payload : data })
    })
  },[])

  //@ Friend Request Declining Event
  useEffect(() => {
    newSocket.on('friend_request_declined_sender', data => {
      dispatch({ type : 'REMOVE_A_FRIEND', payload : data })
    })
    
    newSocket.on('friend_request_declined_receiver', data => {
      dispatch({ type : 'REMOVE_A_FRIEND', payload : data })
    })
  },[])

  //@ Individual Messages Sending Event
  useEffect(() => {
    newSocket.on("send_msg_sender", data => {
        dispatch({ type:"ADD_MESSAGE", payload:data})
        dispatch({ type:"ADD_MESSAGE_IN_FRIENDS", payload:data})
    })
    
    newSocket.on("send_msg_receiver", data => {
      dispatch({ type:"ADD_MESSAGE", payload:data})
      dispatch({ type:"ADD_MESSAGE_IN_FRIENDS", payload:data})
    })
  },[])
  
  //@ Groups Sending Messages
  useEffect(() => {
    newSocket.on('group_send_msg', data => {
      dispatch({ type:"ADD_MESSAGE_IN_GROUP", payload:data})
      dispatch({ type:"ADD_MESSAGE_IN_GROUPS", payload:data})
    })
  },[])

  const getFriends = async () => {
    let { data } = await axios.post(`${serverUrl}/api/friends`,{ username })
    dispatch({ type : "UPDATE_FRIENDS",payload:data })
  }

  const getGroups = async () => {
    let { data } = await axios.post(`${serverUrl}/api/groups`,{ username })
    dispatch({ type : "UPDATE_GROUPS",payload:data })
  }



  return (
    <div className={styles.dashboard}>
      <SideBar setTabIndex={setTabIndex} index={tabIndex}/>
      <div className={styles.component}>
        {components[tabIndex]}
      </div>
    </div>
  )
}
