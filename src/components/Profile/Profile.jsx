import React from 'react'
import styles from './Profile.module.css'
import { useSelector } from 'react-redux'

export default function Profile() {

  const { username, email } = useSelector(state => state.user)

  return (
    <div className={styles.user}>
      <div className={styles.username}>{username}</div>
      <div className={styles.email}>{email}</div>
    </div>
  )
}
