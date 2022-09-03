import React from 'react'
import styles from './Notification.module.css'

export default function Notification({ content }) {
  return (
    <div className={styles.notifications}>{content}</div>
  )
}
