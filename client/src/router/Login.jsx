import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import { loginSliceAction } from '../store/loginSlice'
const Login = () => {

const navigate = useNavigate()
  const [agree , setAgree ] = useState('no')
  const emailRef = useRef()
  const passwordRef = useRef()
  const colorData = useSelector(s=>s.colorData)
 
  const dispatch = useDispatch()

useEffect(()=>{
dispatch(loginSliceAction.logout())
} , [])



  const handleLogin = async(e)=>{
e.preventDefault()

  try {
  if (agree==="no") {
return  toast.warning("Please read all the Terms & Condition before Login ")
}else{

const email = emailRef.current.value
const password = passwordRef.current.value

const res = await fetch("https://mydear-diary-5.onrender.com/login", {
  method:"POST",
  headers:{
    "Content-Type": "application/json",
      },
      body: JSON.stringify({ email,password  })
}) 
const data =await res.json()
if(data?.success === false){
  if(data?.message === "Email is not registered"){
    const elem =  document.getElementsByClassName("enf")
    elem[0].innerText =  "To register this email open the Menu bar and click on  the 'Register' and get registerd yourself first" 
    return toast.info(data?.message)
    }
  toast.error(data?.message)
  }
if (data.success === true){
  toast.success(data?.message)
  dispatch(loginSliceAction.login({user: data?.user , token:data?.token } ))
  navigate("/Home")
}
}
} catch (error) {
    console.log(error)
    toast.error("Error in Login")
  }
}




const handleCheck = ()=>{
  try {
    
if (agree==="no") {
  setAgree("yes")
}
if (agree==="yes") {
  setAgree("no")
}

  } catch (error) {
    console.log(error)
    
  }
}




  return (
<>

<form  onSubmit={handleLogin} className='login-form'  style={{   width:"40rem" , margin:"5rem" , fontFamily:"cursive",  }} >
    <h1 style={{ color : `${ colorData.modeColor === "black" ?  "lightgreen" :  ""}`}} className='login-form-heading'  > Login with your account </h1>
  <div className="mb-3 login-form-email ">
    <label htmlFor="exampleInputEmail1" className="  form-label"  style={{ color : `${ colorData.modeColor === "black" ?  "skyblue" :  ""}`}}  >Email address</label>
    <input type="email"   ref={emailRef} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text"  style={{ color : `${ colorData.modeColor === "black" ?  "lightgreen" :  ""}`}}  >We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3  login-form-password">
    <label htmlFor="exampleInputPassword1" className="form-label" style={{ color : `${ colorData.modeColor === "black" ?  "pink" :  ""}`}}  >Password</label>
    <input type="password"  ref={passwordRef} className="form-control" id="exampleInputPassword1"/>
<Link   to="/forgetPassword" style={{float:"right" ,fontSize:"0.80rem", }} > Forget Password  </Link>
  </div>



  <div className="mb-3 check-terms form-check">
  <input type="checkbox" className="form-check-input check-input " id="exampleCheck1"  onClick={handleCheck}  />
  <label className=" check-label form-check-label" htmlFor="exampleCheck1" style={{ color : `${ colorData.modeColor === "black" ?  "lightgreen" :  ""}`}}    > I have read all the   Terms & Conditions </label>
  </div>
  <p className='enf  ' style={{color:"red"  }} >  </p>
  <button type="submit" className="btn btn-primary login-button ">Login..</button>
  </form>
  <h4  className='m-5 Terms-and-Condition ' style={{fontFamily:"cursive" , textDecoration:"underline",color:`${colorData.modeColor==='black'  ? " pink" :  "" }`  }} > Terms &   Condition </h4>
  <div className='d-flex Terms-and-Condition-para-img-container' style={{ justifyContent:"space-around"}}  >
  <p   className='Terms-and-Condition-para ' style={{fontFamily:"cursive" ,  fontWeight:"lighter", color : `${ colorData.modeColor === "black" ?  "lightgreen" :  "grey"}`    , width:"60%"}} > Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem, tempora odio a eum in laboriosam alias? Ipsum optio obcaecati iusto! Sint, consequuntur! Ducimus amet culpa dolorum, eaque in possimus inventore.
Magnam, veniam harum quos nisi libero labore assumenda, sit rem id repellat eum, eligendi optio ea? Pariatur eius nesciunt illum sequi, modi aliquam ipsum. Praesentium cupiditate incidunt temporibus magni eum!
Consequuntur ullam sit suscipit ut molestias voluptatum optio, accusantium ipsum itaque dolorum repellendus nemo velit eos rem modi mollitia molestiae expedita quasi qui quas unde dolor. Soluta reiciendis voluptatum dolore.
Aliquid totam beatae quasi, eius excepturi sint ipsam sapiente, doloremque ut similique ducimus officia fuga consequuntur nisi nulla magni enim. Est hic doloribus ut impedit mollitia blanditiis provident quasi velit.
Beatae ut natus illo incidunt placeat perferendis, sint magni delectus accusantium veritatis animi suscipit alias ab provident. Dicta, deleniti at, eos nam quasi, perferendis tempora laudantium error ab nobis laborum.
Aspernatur fugiat maiores explicabo sunt quo molestiae eveniet labore quam, quidem amet at provident culpa quasi corporis recusandae fuga nemo illum quos ex, harum iure earum nesciunt quis. Quos, perspiciatis.
Fugit earum dicta vitae repudiandae nobis at tempore reiciendis vero nostrum, cum id, molestias sapiente magnam illum voluptate. At a temporibus, aliquid amet nemo culpa voluptatum laborum eaque? Quas, cumque.
Aliquam id eius dolorum perspiciatis voluptatum facilis temporibus labore dolorem tempora autem eum corporis, sit obcaecati repellat quisquam ad aut, veniam eligendi amet, quas laboriosam assumenda. Error voluptate qui veritatis!
Unde recusandae maiores non dicta temporibus fuga tempora necessitatibus consequatur esse, officia quas numquam, ipsum, eligendi iusto placeat ducimus nihil! Veniam expedita repudiandae vitae at voluptate corporis culpa ea et?
Exercitationem suscipit in incidunt accusamus modi veritatis vel maxime non eum enim saepe itaque quod excepturi, repellendus blanditiis tenetur culpa. Voluptatibus laborum maiores facilis dicta iste magni quae ut eos.
Voluptatibus labore debitis sed quos veniam at. Officiis aliquid deserunt provident quas, laboriosam neque? Dolores enim repellat quidem, optio debitis natus fugit! Voluptate odit eveniet dolorem hic at quasi placeat?
Voluptatum reprehenderit, dolorem odit quia eligendi illo iste quis temporibus libero delectus laboriosam excepturi sint possimus quo ut doloremque autem neque perferendis non quidem repellendus explicabo! Dolor sit earum odit.
Et tenetur officiis esse reprehenderit praesentium quis exercitationem nihil ad architecto explicabo voluptatum optio natus, quidem, a doloribus aspernatur alias voluptatem. Consequuntur blanditiis molestiae accusantium dolores ad, in voluptatibus nesciunt.
Debitis vero porro voluptates, ipsam quibusdam eaque dolore vitae fuga atque error culpa praesentium excepturi cupiditate non quos maxime nobis quaerat ad. Nostrum est ipsum harum at esse quis officia.
Officia inventore quo reiciendis perferendis? Necessitatibus voluptatem, natus doloremque beatae vero doloribus saepe dolor, excepturi eaque expedita eos magni repellat esse nemo iusto, placeat quidem distinctio porro quae voluptas! Esse.
Optio, illo excepturi. Qui minima impedit sed, cum architecto eum voluptatum earum eos numquam amet quisquam enim rerum illo velit suscipit eligendi. Odit quasi dolorum et libero, nostrum sunt officia?
Odio expedita cupiditate eaque voluptates necessitatibus temporibus aperiam aut in qui, possimus inventore quibusdam pariatur accusamus fugit sit atque exercitationem distinctio praesentium consequuntur a? Aspernatur eligendi adipisci amet facere facilis?
Accusantium consequatur voluptas incidunt voluptatum autem, vel labore laboriosam voluptate iste? Perspiciatis id, non laboriosam iusto dignissimos quaerat, totam ipsam autem iste iure assumenda impedit earum nisi distinctio dolorem adipisci.
Molestiae laboriosam voluptatibus expedita sed! Nisi earum temporibus aspernatur ducimus, tenetur libero aliquam, autem quidem quibusdam vitae, laboriosam architecto. Atque aspernatur nam tempore qui reprehenderit odio repellendus veritatis! Reprehenderit, ipsa!
Ad dolorem, reprehenderit quibusdam mollitia ipsam animi est inventore perferendis, explicabo exercitationem ut ab veritatis corporis accusamus hic nobis rerum deleniti ipsa quidem. Perferendis impedit dolorem, error officia voluptatum id?
Est quaerat aliquam cumque deserunt veritatis nisi aspernatur quis blanditiis quisquam hic ex explicabo odit, assumenda iusto reprehenderit numquam libero sunt et dolorem ut mollitia, inventore, architecto atque? Placeat, consequatur!
Veniam sint aliquam quibusdam alias error, consequuntur fugiat! Delectus ad rerum laudantium est ratione. Perferendis voluptatibus deserunt provident architecto eius. Omnis, aspernatur distinctio eveniet laboriosam earum asperiores tenetur id sint!
Quam assumenda, eaque molestias, voluptatum ut adipisci sit architecto nesciunt ad corrupti voluptatibus! Reprehenderit corrupti, quam a minus molestias, magni distinctio possimus laudantium hic ullam non eveniet laboriosam amet itaque.
Adipisci quae quo ullam aliquam odio harum ad facilis aperiam quis! Doloribus rem aliquid dicta eum delectus nemo ipsum, tempore dolorem culpa quia accusamus numquam, quae, beatae nihil et iusto.
Quod quisquam, necessitatibus officiis quo blanditiis iusto ad neque vel corrupti cumque sit ea deserunt repellendus delectus ex. Ipsum cum eius quam, unde nam dolorem delectus debitis non sit tempora.
Aut ipsa qui delectus totam accusantium tenetur repellat, iste dolores voluptate eaque doloremque dolorum ducimus ex, excepturi assumenda obcaecati dicta, magni reprehenderit minima eius culpa quia est sed quasi? Laboriosam.
Eligendi fugit, provident ipsum mollitia praesentium aspernatur doloremque voluptatem doloribus quisquam deserunt temporibus optio blanditiis! Adipisci itaque, suscipit cumque voluptates amet, temporibus quos, harum molestiae aspernatur laboriosam a eius nam.
In minima temporibus commodi quia velit perspiciatis dolorum sunt asperiores, cum nulla saepe illum maiores laboriosam magnam, mollitia quasi perferendis tempora ducimus alias voluptatibus iste architecto! Quibusdam voluptate delectus maxime.
Modi at, adipisci assumenda qui eveniet nostrum eligendi, sint tempora laudantium et quae architecto officia recusandae dolores, dignileniti veritatis. Doloremque distinctio quibusdam magni fugit optio quia hic delectus laborum ipsa veritatis. </p>
<img  className='Terms-and-Condition-img' src={`${   colorData.modeColor==='black'  ?  '/images/blackpink.jpg'   : '/images/diary2.jpeg'}`} style={{height:"50vh"  }} />
</div>

</>)
}

export default Login