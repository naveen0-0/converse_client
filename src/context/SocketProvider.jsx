import React,{ useEffect, useState, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';

export const SocketContext = createContext();
let newSocket;

export default function SocketProvider({ children }) {

  const dispatch = useDispatch();
  const { serverUrl } = useSelector(state => state.serverUrl)
  const { chatId, username } = useSelector(state => state.user)
  
  const [ socket, setSocket ] = useState(null);
  const [ btnText, setBtnText ] = useState("Add")
  const [ feedback, setFeedback ] = useState("")
  const [ statusNum, setStatusNum ] = useState(null)

  const AddNotification = (type,content) => {
    dispatch({ type : type, payload:{ id: uuidv4(), content : content }})
  }

  const RemoveAll = () => {
    dispatch({ type : "REMOVE_ALL_NOTIFICATION"})
  }


  //@ Socket Connection
  useEffect(() => {
    newSocket = io(serverUrl,{ query : { chatId } })
    setSocket(newSocket)
    return () => {
      newSocket.close()
      newSocket.off()
    }
  },[])
  
  //@ Join the groups on initialization
  useEffect(() => {
    newSocket.emit('join_groups',{ username })
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
      AddNotification("ADD_NOTIFICATION",`Friend Request : ${data.friend1}`)
    })
  },[])
  
  //@ Friend Request Accepting Event
  useEffect(() => {
    newSocket.on('friend_request_accepted_sender', data => {
      dispatch({ type : 'MAKE_A_FRIEND', payload : data })
    })
    
    newSocket.on('friend_request_accepted_receiver', data => {
      dispatch({ type : 'MAKE_A_FRIEND', payload : data })
      AddNotification("ADD_NOTIFICATION",`Friend Request Accepted`)
    })
  },[])

  //@ Friend Request Declining Event
  useEffect(() => {
    newSocket.on('friend_request_declined_sender', data => {
      dispatch({ type : 'REMOVE_A_FRIEND', payload : data })
    })
    
    newSocket.on('friend_request_declined_receiver', data => {
      dispatch({ type : 'REMOVE_A_FRIEND', payload : data })
      AddNotification("ADD_NOTIFICATION",`Friend Request Rejected`)
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

  //@ Adding SomeOne to the group
  useEffect(() => {
    newSocket.on('add_user_to_the_group', data => {
      newSocket.emit('add_user_to_the_group_success', data)
    })
  },[])

  //@ Add the user to the groups in the redux store
  useEffect(() => {
    newSocket.on('add_user_to_the_group_in_redux', data => {
      dispatch({ type : "ADD_USER_TO_THE_SELECTED_GROUP_IN_REDUX", payload : data})
      dispatch({ type : "ADD_USER_TO_THE_GROUPS_IN_REDUX", payload : data})
      setBtnText("User Added")
    })
  },[])

  //@ Add the group to the user in the redus store
  useEffect(() => {
    newSocket.on('add_group_to_the_user_in_redux', data => {
      dispatch({ type:"ADD_GROUP", payload: data })
    })
  },[])
  
  return (
    <SocketContext.Provider value={{ socket, btnText, feedback, setFeedback, statusNum, setStatusNum }}>
      {children}
    </SocketContext.Provider>
  )
}
