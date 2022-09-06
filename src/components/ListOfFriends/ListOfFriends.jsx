import React,{ useState } from 'react'
import styles from './ListOfFriends.module.css'
import { useSelector, useDispatch } from 'react-redux'

export default function ListOfFriends({ setSidebarActive, sidebarActive }) {
  const dispatch = useDispatch()
  const friends = useSelector( state => state.friends );
  const { username } = useSelector(state => state.user)
  const [ searchText, setSearchText ] = useState("")

  return (
    <div className={styles.container}>

      <div className={styles.inputcontainer}>
        <input 
          type="text"
          placeholder="Search for a friend"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.friends}>
        {friends.map((friend, index) => {
          if(friend.requestAcceptedOrNot) {
            return (
            <div key={index} className={styles.friend} onClick={() => {dispatch({ type : "UPDATE_FRIEND", payload:friend }) ; setSidebarActive(!sidebarActive)}}>
              <div className={styles.profileimg}>
                {friend.friend1 === username ? friend.friend2[0].toUpperCase() : friend.friend1[0].toUpperCase()}
              </div>
              <div className={styles.usernameContainer}>
                <div className={styles.username}>{friend.friend1 === username ? friend.friend2 : friend.friend1}</div>
                {friend.messages.length === 0?
                  <div className={styles.lastMsg}>Be the first one to say HELLO</div> : 
                  <div className={styles.lastMsg}>{friend.messages[friend.messages.length-1].message}</div>
                }
              </div>
            </div>
          )}
        })}
      </div>

      {/* <div className={styles.closeContainer} onClick={() => setSidebarActive(!sidebarActive)}>
        <img src={closepng} alt="Close" className={styles.closeimg}/>
      </div> */}

    </div>
  )
}
