import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Protected = () => {
    const auth=localStorage.getItem('logged');
  return (
    auth? <Outlet/> : <Navigate to='/login'/>
    )
}

export default Protected
