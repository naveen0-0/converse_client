import React,{ useState, useEffect } from 'react'
import styles from './DashBoard.module.css'
import io from 'socket.io-client'
import { useSelector } from 'react-redux'
import SideBar from '../SideBar/SideBar'
import Friends from '../Friends/Friends'
import Groups from '../Groups/Groups'

let newSocket;
export default function DashBoard() {
  const [ socket, setSocket ] = useState(null);
  const components = [ <Friends socket={socket}/>, <Groups socket={socket}/> ]
  const [ tabIndex, setTabIndex ] = useState(0)
  const { chatId } = useSelector(state => state.user)

  useEffect(() => {
    newSocket = io('http://localhost:5000',{ query : { chatId } })
    setSocket(newSocket)
    return () => {
      newSocket.close()
      newSocket.off()
    }
  },[])


  return (
    <div className={styles.dashboard}>
      <SideBar setTabIndex={setTabIndex}/>
      <div className={styles.component}>
        {components[tabIndex]}
      </div>
    </div>
  )
}
