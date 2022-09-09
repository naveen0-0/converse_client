import React,{ useEffect } from 'react'
import styles from './Notification.module.css'
import { useDispatch } from 'react-redux'
import closeimg from '../../images/close.png'

export default function Notification({ content, id }) {
  const dispatch = useDispatch();

  const RemoveNotification = (id) => {
    dispatch({ type : "REMOVE_NOTIFICATION", payload:id})
  }
  
  useEffect(() => {
    setTimeout(() => RemoveNotification(id),5000)
  },[])

  return (
    <div className={styles.notification}>
      <div className={styles.content}>{content}</div>
      <img 
        src={closeimg} 
        alt="Close" 
        onClick={() => {
          RemoveNotification(id)
        }}
        className={styles.closeimg}
      />
    </div>
  )
}
