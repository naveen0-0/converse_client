import React from 'react'
import styles from './Notifications.module.css'
import { useSelector, useDispatch } from 'react-redux'
import Notification from '../Notification/Notification'
import { v4 as uuidv4 } from 'uuid';

export default function Notifications() {

  const notifications = useSelector(state => state.notifications)
  const dispatch = useDispatch();

  const AddNotification = () => {
    dispatch({ type : "ADD_NOTIFICATION", payload:{ id: uuidv4(), content : "Notificationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn" }})
  }

  const RemoveAll = () => {
    dispatch({ type : "REMOVE_ALL_NOTIFICATION"})
  }


  return (
    <div className={styles.notifications}>
      {/* <button onClick={AddNotification}>Add Notification</button>
      <button onClick={RemoveAll}>Remove All</button> */}
      {notifications.map(note => <Notification key={note.id} {...note}/>)}
    </div>
  )
}
