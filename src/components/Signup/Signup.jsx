import React,{ useState } from 'react'
import styles from './Signup.module.css'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux'

export default function Signup({ setTabIndex }) {
  const [ username, setUsername ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ feedback, setFeedBack ] = useState("")
  const { serverUrl } = useSelector(state => state.serverUrl)

  const formSubmit = async e => {
    e.preventDefault()
    let { data } = await axios.post(`${serverUrl}/auth/signup`,{ username, email, password, chatId:uuidv4() })
    setFeedBack(data.feedback)

    if(data.operation){
      setTimeout(() => {
        setTabIndex(1)
      },1000)
    } 
  }

  return (
    <div className={styles.signup}>
      <div className={styles.feedback}>{feedback}</div>
      <form className={styles.form} onSubmit={formSubmit}>
        <input 
          type="text" 
          placeholder='Enter your username' 
          autoFocus={true} 
          required 
          value={username} 
          onChange={e => setUsername(e.target.value)}
          className={styles.username}
          />

        <input 
          type="text" 
          placeholder='Enter your email' 
          required 
          value={email} 
          onChange={e => setEmail(e.target.value)}
          className={styles.email}
          />

        <input 
          type="text" 
          placeholder='Enter your password' 
          required 
          value={password} 
          onChange={e => setPassword(e.target.value)}
          className={styles.password}
          />
        <button className={styles.submit}>Create account</button>
      </form>
    </div>
  )
}
