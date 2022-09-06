import React from 'react'
import styles from './Notification.module.css'

export default function Notification({ children }) {
  return (
    <div className={styles.notifications}>{children}</div>
  )
}
