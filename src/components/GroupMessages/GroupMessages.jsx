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
    <div className={styles.msgcontainer}>
      {messages.map((message, index) => {
          if(message.sender === username) 
          return <div key={index} className={styles.user} title={`${new Date(message.time).toLocaleDateString()} ${new Date(message.time).toLocaleTimeString()}`}>{message.message}</div>
          return <div key={index} className={styles.friend} title={`${new Date(message.time).toLocaleDateString()} ${new Date(message.time).toLocaleTimeString()}`}>{message.message}</div>
        }
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}