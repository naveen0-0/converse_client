import React,{ useEffect } from 'react'
import Authentication from '../Authentication/Authentication'
import DashBoard from '../DashBoard/DashBoard'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

export default function HomePage() {
  const { loggedIn } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    getUser();
  },[])

  const getUser = async () => {
    let { data } = await axios.get('http://localhost:5000/auth/getuser',{ headers : { Authorization : localStorage.getItem('converse_1910_logintoken')}})
    if(data.operation){
      dispatch({ type:"UPDATE_USER",payload:data.user})
    }
  }

  if(loggedIn) return <DashBoard/>
  return <Authentication/>
}
