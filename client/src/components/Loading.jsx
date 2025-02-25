import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const Loading = () => {


    const[count ,setCount]=  useState(6)
    const navigate = useNavigate()
    const location = useLocation()
    

useEffect(()=>{
setInterval(() => {
    setCount(count-1)  
}, 1000);
if (count === 0) {
 navigate('/')
}
return clearInterval()

},[count] )    
    
    
    

    return <center className="Login-container" >

      
      <h1>  Please Login First  </h1>
  <h1     style={{   fontWeight:'lighter' }} >   Redirecting to you at Login Page in {count} seconds  </h1> 
     <div className="spinner-border " style={{width: "3rem" ,height: "3rem"    }} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  
    
    </center>
}

export default Loading