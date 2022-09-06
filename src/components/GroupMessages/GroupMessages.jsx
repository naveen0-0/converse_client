import React,{ useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import styles from './GroupMessages.module.css'

export default function GroupMessages() {
  const { messages } = useSelector(state => state.selectedGroup)
  const { username } = useSelector(state => state.user)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  return (
    <>
      {messages.map((message, index) => 
        <div key={index} className={styles.user}>


          <div className={styles.first}>
            <div className={styles.profile}>{message.sender[0].toUpperCase()}</div>
          </div>

          <div className={styles.second}>

            <div className={styles.head}>
              {message.sender === username? <div className={styles.usersender}>You</div> : <div className={styles.sender}>{message.sender}</div>}
              <div className={styles.time}>{`${new Date(message.time).toLocaleDateString()} ${new Date(message.time).toLocaleTimeString()}`}</div>
            </div>

            <div className={styles.msg}>{message.message}</div>
          </div>

        </div>
      )}
      <div ref={messagesEndRef} />
    </>
  )
}