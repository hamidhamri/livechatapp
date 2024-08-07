import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Loading from "./Loading"
import { refreshToken } from '../actions/authAction';


export default function ProtectedRoute() {
  const { userInfo,loading,error } = useSelector((state) => state.userLogin);
  let navigate = useNavigate()
  let dispatch = useDispatch()


  useEffect(() => {
    if (userInfo?.token) {
      const decodedToken = jwtDecode(userInfo.token);
      const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
    
      if (decodedToken.exp < currentTime) {
        if(!loading) dispatch(refreshToken(userInfo?.refreshToken))
        console.log('Token is expired');
      } else {
        console.log('Token is valid', decodedToken);
      }
    }else {
      console.log("LOLLL", userInfo?.token)
       navigate("/login")
    }
  }, [dispatch,userInfo?.token,userInfo?.refreshToken,navigate])
  
  
  if (loading || !userInfo) {
    // Using Tailwind CSS for styling the loading state
    return <Loading/>
  }  if(error) return <di>ERROR 404</di>  
  return <Outlet/>
}
