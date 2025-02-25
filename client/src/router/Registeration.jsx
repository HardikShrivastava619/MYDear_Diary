import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import {collapseToast, toast} from "react-toastify"

const Registeration = () =>{ 
  const nameref =   useRef()
  const phoneref =   useRef()
  const emailref =   useRef()
  const passwordref =   useRef()
  const answerref =   useRef()
  
  const colorData = useSelector(s=>s.colorData)
 
 
  const handleRegisterSubmit = async (e)=>{
  e.preventDefault()
  try {
   const name = nameref.current.value
   const phone = phoneref.current.value 
   const email = emailref.current.value
   const password = passwordref.current.value
   const answer = answerref.current.value
  
   const res =  await fetch ('http://localhost:5000/register' , {
   method:"POST",
   headers:{
     'Content-Type': "application/json"
   },
   body:JSON.stringify({ name,email,phone,answer,password }) 
 } )
 const data = await res.json()
 if (data?.message==="Email is already registered" ){
  const elm = document.getElementsByClassName("enf")
  elm[0].innerText = "Your email is already registerd  to login with this email go to Menu bar at right corner  "
} 
 if (data?.success === false) {
  toast.info(data?.message)  
 }

 if (data?.success===true) {
  
   toast.success(data?.message)
 }


} catch (error) {
    console.log(error);
 toast.error("some error in Registeration")
 }}
  
  return <> 
 <div  style={{ maxWidth:"100vw", display:"flex" ,minHeight:"77vh",alignItems:"center"  }} >

 
 <form style={{fontFamily:"cursive"  }} onSubmit={handleRegisterSubmit}  className="registeration-form" > 
 
   <h3  className="register-form-heading mb-4 " style={{color :`${colorData.modeColor === 'black'  ?  "lightgreen" : ""}`}}>  REGISTER HERE</h3>
 
   <div className="mb-3 register-inputs ">
     <input type="text" className="  form-control "  ref={nameref}  placeholder="Enter Your Name"  id="name"  required />
   
   </div>
   <div className="mb-3 register-inputs ">
  <input type="email"  className="   form-control "   ref={emailref} placeholder="Enter Your Email"    id="email1"  required />
     </div>
   <div className="mb-3  register-inputs">
     <input type="password" className="form-control "   ref={passwordref} placeholder="Enter Your Password" id="password"  required/>
     
   </div>
   
   <div className="mb-3  register-inputs">
     <input type="number" className=" form-control "      ref={phoneref}  placeholder="Enter Your Phone" id="phone"  required/>
   </div>
  
  
   <div className="mb-3  register-para"  >
  <p style={{color:`${colorData.modeColor === 'black'  ?  "lightgreen" : "blue"}`}} > Answer the question Very carefully bcz this ansewer <span  style={{color:`${colorData.modeColor==='black'  ?  "pink" : "blue" }`}}>  will be required when you will forget your password </span></p>
     <input type="text" className=" form-control " ref={answerref}  placeholder="Which is Your Favorite Movie" id="answer"  required />
     </div>
 <p className='enf'  style={{color:"red"}} >    </p>
   <button type="submit" className="btn btn-success register-button "   >REGISTER  </button>
 </form>
    </div>
 
 </>
 }

export default Registeration