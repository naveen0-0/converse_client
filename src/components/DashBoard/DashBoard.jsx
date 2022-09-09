import React,{ useState, useEffect } from 'react'
import styles from './DashBoard.module.css'
import { useSelector, useDispatch } from 'react-redux'
import SideBar from '../SideBar/SideBar'
import Friends from '../Friends/Friends'
import Groups from '../Groups/Groups'
import AddFriend from '../AddFriend/AddFriend'
import Profile from '../Profile/Profile'
import axios from 'axios'
import Notifications from '../Notifications/Notifications'

export default function DashBoard() {
  const dispatch = useDispatch();
  const [ GroupSidebarActive, setGroupSidebarActive ] = useState(false)
  const [ FriendsSidebarActive, setFriendsSidebarActive ] = useState(false)

  const components = [ 
    <Friends 
      sidebarActive={FriendsSidebarActive} 
      setSidebarActive={setFriendsSidebarActive}
    />,

    <Groups 
      sidebarActive={GroupSidebarActive} 
      setSidebarActive={setGroupSidebarActive} 
    />,

    <AddFriend />,
    <Profile/>,
  ]

  const [ tabIndex, setTabIndex ] = useState(0)
  const { username } = useSelector(state => state.user)
  const { serverUrl } = useSelector(state => state.serverUrl)

  //@ Getting Friends And Groups
  useEffect(() => {
    getFriends();
    getGroups();
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
      <SideBar 
        setTabIndex={setTabIndex} 
        index={tabIndex} 
        gsidebarActive={GroupSidebarActive} 
        gsetSidebarActive={setGroupSidebarActive}
        fsidebarActive={FriendsSidebarActive} 
        fsetSidebarActive={setFriendsSidebarActive}
      />


      <div className={styles.component}>
        {components[tabIndex]}
      </div>

      <Notifications/>

    </div>
  )
}
