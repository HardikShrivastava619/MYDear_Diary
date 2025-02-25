import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const Profile = () => {
 
  const nameref =   useRef()
  const phoneref =   useRef()
  const emailref =   useRef()
  const passwordref =   useRef()
  const answerref =   useRef()
  
const loginData = useSelector(s=>s.loginData)
const colorData = useSelector(s=>s.colorData)
const token  = loginData.token

const uid = loginData.user._id
console.log(loginData.user);

const handleUpdate = async (e)=>{
    e.preventDefault()
    try {
        const name = nameref.current.value
        const phone = phoneref.current.value 
        const email = emailref.current.value
        const password = passwordref.current.value
        const answer = answerref.current.value
       
        const res = await fetch(`http://localhost:5000/UpdateProfile/${uid}` , {
method:"POST",
headers:{
  "Content-Type" : "application/json",
  "Authorization" : `Bearer ${token}`,
},
body:JSON.stringify({name,phone,email,password,answer})


})
    const data = await res.json()
    console.log(data)
if (data?.success === false) {
  toast.error(data?.message)
}else {toast.success(data?.message)
}} catch (error) {
        console.log(error)
        
    }
}




    const getUserProfile = async ()=>{
        try {
           
           
            const res = await fetch(`http://localhost:5000/get-user/${uid}`)
            const data = await res.json()
      
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(()=>{
getUserProfile()
    }, [ ])

    return (
      <div  style={{ maxWidth:"100vw", display:"flex" ,minHeight:"77vh",alignItems:"center"  }} >

<form  style={{fontFamily:"cursive"  }}  onSubmit={handleUpdate}  className="registeration-form"  > 
<h1   className='mb-4 profile-form-heading '  style={{ color:`${colorData.modeColor === "black"  ? "lightgreen"  :""   }` }}> Update Your Profile here... </h1> 
   <div className="mb-3">
      <input type="text" className="  register-inputs form-control"  style={{border:`${colorData.modeColor === 'black'  ? "2px solid lightgreen" : "" }` ,  backgroundColor:`${colorData.modeColor==='black' ? 'silver' : ''  }`  }}  ref={nameref}  placeholder={loginData.user.name}  id="name"  required />
   
   </div>
   <div className="mb-3">
  <input type="email"  className=" register-inputs   form-control "  style={{border:`${colorData.modeColor === 'black'  ? "2px solid lightgreen" : "" }` ,  backgroundColor:`${colorData.modeColor==='black' ? 'silver' : ''  }`  }} ref={emailref} placeholder={loginData.user.email}    id="email1"  required />
     </div>
   <div className="mb-3">
     <input type="password" className="  register-inputs form-control " style={{border:`${colorData.modeColor === 'black'  ? "2px solid lightgreen" : "" }` ,  backgroundColor:`${colorData.modeColor==='black' ? 'silver' : ''  }`  }}  ref={passwordref} placeholder="Enter Your Password" id="password"  required/>
     
   </div>
   
   <div className="mb-3">
     <input type="number" className=" register-inputs form-control " style={{border:`${colorData.modeColor === 'black'  ? "2px solid lightgreen" : "" }` ,  backgroundColor:`${colorData.modeColor==='black' ? 'silver' : ''  }`  }}     ref={phoneref}  placeholder={loginData.user.phone} id="phone"  required/>
   </div>
  
  
   <div className="mb-3 register-para ">
  <p style={{color:`${colorData.modeColor === 'black'  ? "lightgreen" :"blue" }`   }} > Answer the question Very carefully bcz this ansewer <span  style={{color:`${colorData.modeColor==='black'  ?  'pink' : ''}`}} > will be required during changing your password </span> </p>
     <input type="text" className=" register-inputs form-control"    style={{border:`${colorData.modeColor === 'black'  ? "2px solid lightgreen" : "" }` ,  backgroundColor:`${colorData.modeColor==='black' ? 'silver' : ''  }`  }} ref={answerref}  placeholder="Which is Your Favorite Movie" id="answer"  required />
     </div>
 <p className='enf'  style={{color:"red"}} >    </p>
   <button type="submit" className="btn btn-danger"   >Update Profile..</button>
 </form>

</div>
  )
}

export default Profile