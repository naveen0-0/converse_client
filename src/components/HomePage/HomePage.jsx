import React,{ useEffect, useState } from 'react'
import Authentication from '../Authentication/Authentication'
import DashBoard from '../DashBoard/DashBoard'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import SplashScreen from '../SplashScreen/SplashScreen'

export default function HomePage() {
  const { loggedIn } = useSelector(state => state.user)
  const { serverUrl } = useSelector(state => state.serverUrl)
  const [ splash, setSplash ] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    getUser();
  },[])

  const getUser = async () => {
    let { data } = await axios.get(`${serverUrl}/auth/getuser`,{ headers : { Authorization : localStorage.getItem('converse_1910_logintoken')}})
    if(data.operation){
      dispatch({ type:"UPDATE_USER",payload:data.user})
    }
    setSplash(false)
  }

  if(splash) return <SplashScreen/>
  if(loggedIn) return <DashBoard/>
  return <Authentication/>
}
