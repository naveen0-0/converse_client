import React from 'react'
import styles from './Notifications.module.css'
import { useSelector } from 'react-redux'
import Notification from '../Notification/Notification'


export default function Notifications() {
  const notifications = useSelector(state => state.notifications)
  return (
    <div className={styles.notifications}>
      {notifications.map(note => <Notification key={note.id} {...note}/>)}
    </div>
  )
}
