import React,{ useState } from 'react'
import styles from './Login.module.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

export default function Login() {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ feedback, setFeedback ] = useState("")
  const dispatch = useDispatch()
  const { serverUrl } = useSelector(state => state.serverUrl)

  const formSubmit = async e => {
    e.preventDefault()
    let { data } = await axios.post(`${serverUrl}/auth/login`,{ username, password })
    setFeedback(data.feedback)
    if(data.operation){
      localStorage.setItem('converse_1910_logintoken',data.token)
      dispatch({ type:"UPDATE_USER", payload : data.user })
    }
  }

  return (
    <div className={styles.login}>
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
          placeholder='Enter your password' 
          required 
          value={password} 
          onChange={e => setPassword(e.target.value)}
          className={styles.password}
          />
        <button className={styles.submit}>Login</button>
      </form>
    </div>
  )
}
