import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const ForgetPassword = () => {
 const colorData = useSelector(s=>s.colorData)
  
    const emailRef = useRef()
    const passwordRef = useRef()
    const answerRef  = useRef()
    const navigate = useNavigate()

    const handleChangePassword = async(e)=>{
        e.preventDefault()
        try{
         
        const email = emailRef.current.value
        const newPassword = passwordRef.current.value
        const answer = answerRef.current.value
        
        const res = await fetch("http://localhost:5000/forget-password", {
          method:"POST",
          headers:{
            "Content-Type": "application/json",
              },
              body: JSON.stringify({ email,newPassword,answer  })
        }) 
        const data = await res.json()
        if ( data?.success === false){
            toast.error(data?.message)
           }   
console.log(data)

        if (data?.success === true) {
        toast.success(data?.message)
        navigate("/")
}}catch (error) {
            console.log(error)
            toast.error("Error in Changing Password")
          }
        }
        
  
  
  
  
    return (
    <div>


  <form   onSubmit={handleChangePassword}   style={{ width:"40rem" , margin:"5rem" , fontFamily:"cursive",  }} >
    <h1  style={{color:`${ colorData.modeColor === "black" ? "lightgreen"  : ''}` }} > Change Password.. </h1>
  <div className="mb-3">
    <label  style={{color:`${ colorData.modeColor === "black" ? "skyblue"  : ''}` }} htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email"   ref={emailRef} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text"  style={{color:`${ colorData.modeColor === "black" ? "pink"  : ''}` }}  >We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label  style={{color:`${ colorData.modeColor === "black" ? "pink"  : ''}` }} htmlFor="exampleInputPassword1" className="form-label">  New Password</label>
    <input type="password"  ref={passwordRef} className="form-control" id="exampleInputPassword1"/>
  </div>  
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label"  style={{color:`${ colorData.modeColor === "black" ? "skyblue"  : ''}` }} > Your favourite Movie </label>
    <input type="password"  ref={answerRef}  placeholder='Answer' className="form-control" id="exampleInputanswer"/>
  </div>


  <p className='enf' style={{color:"red"  }} >  </p>
  <button type="submit" className="btn btn-primary">Reset password</button>
  </form>






    </div>
  )
}

export default ForgetPassword