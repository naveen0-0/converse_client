import React,{ useEffect, useState } from 'react'
import styles from './AddFriend.module.css'
import searchpng from '../../images/search.png'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function AddFriend({ socket, text, setText, user, setUser, feedback, setFeedback, statusNum, setStatusNum }) {
  const { username, chatId } = useSelector(state => state.user)
  const friends = useSelector(state => state.friends)



  const SearchForAFriend = async e => {
    if(e.key === "Enter" && text.trim() && text.trim() !== username){
      let { data } = await axios.post("http://localhost:5000/api/search", { text:text.trim(), user:username })
      setUser(data.user)
      setFeedback(data.feedback)
      setStatusNum(data.statusnum)
      setText("")
    }
  }

  const sendRequest = () => {
    socket.emit('friend_request',{ 
        chatId:chatId, 
        friendChatId: user.chatId, 
        username:username, 
        friendUsername:user.username 
    })
  }

  const AcceptRequest = (friendChatId,id) => {
    socket.emit("accept_friend_request", { chatId : chatId, friendChatId : friendChatId, id: id })
  }
  const DeclineRequest = (friendChatId,id) => {
    socket.emit("decline_friend_request", { chatId : chatId, friendChatId : friendChatId, id: id })
  }


  return (
    <div className={styles.addfriend}>

      <div className={styles.inputcontainer}>
        <input 
          type="text" 
          className={styles.input} 
          placeholder="Search for a friend" 
          value={text} 
          onChange={e => setText(e.target.value)}
          onKeyPress={SearchForAFriend}
        />
        <img src={searchpng} alt="Search" className={styles.search}/>
      </div>

      {user && (
        <div className={styles.friendrequest}>
          <div className={styles.userinfo}>
            <div className={styles.profileimg}>{user.username[0].toUpperCase()}</div>
            <div className={styles.username}>{user.username}</div>
          </div>
          <button className={styles.action} onClick={statusNum===2 ? sendRequest : null}>
            {feedback}
          </button>
        </div>
      )}

      <div className={styles.friend_requests}>Friend Requests</div>

      <div className={styles.friends}>
        {friends.map((friend, index) => 
          <div key={index}>
            {friend.whoRequested !== username && !friend.requestAcceptedOrNot && 
              <div className={styles.friendrequest}>
                <div className={styles.userinfo}>
                  <div className={styles.profileimg}>{friend.friend1 === username? friend.friend2[0].toUpperCase() : friend.friend1[0].toUpperCase()}</div>
                  <div className={styles.username}>{friend.friend1 === username? friend.friend2 : friend.friend1}</div>
                </div>
                <div className={styles.acceptordecline}>

                  <button 
                    className={styles.accept} 
                    onClick={() => AcceptRequest(friend.chatId1 === chatId? friend.chatId2 : friend.chatId1, friend._id )}>
                    accept
                  </button>

                  {/* //@ Todo -  Decline Friend Request */}
                  <button 
                    className={styles.decline} 
                    onClick={() => DeclineRequest(friend.chatId1 === chatId? friend.chatId2 : friend.chatId1, friend._id )}>
                    decline
                  </button>
                </div>
              </div>
            }
          </div>
        )}
      </div>


    </div>
  )
}