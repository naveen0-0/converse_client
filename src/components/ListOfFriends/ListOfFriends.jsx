import React,{ useState } from 'react'
import styles from './ListOfFriends.module.css'
import { useSelector, useDispatch } from 'react-redux'
import searchpng from '../../images/search.png'

export default function ListOfFriends() {
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
        <img src={searchpng} alt="Search" className={styles.search}/>
      </div>

      <div className={styles.friends}>
        {friends.map((friend, index) => {
          if(friend.requestAcceptedOrNot) {
            return (
            <div key={index} className={styles.friend} onClick={() => dispatch({ type : "UPDATE_FRIEND", payload:friend })}>
              <div className={styles.profileimg}>
                {friend.friend1 === username ? friend.friend2[0].toUpperCase() : friend.friend1[0].toUpperCase()}
              </div>
              <div className={styles.username}>
                {friend.friend1 === username ? friend.friend2 : friend.friend1}
              </div>
            </div>
          )}
        })}
      </div>

    </div>
  )
}
