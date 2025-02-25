import React, {  useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Entry = () => {
  

const loginData = useSelector(s=>s.loginData)
const colorData = useSelector(s=>s.colorData)
const textData = useSelector(s=>s.textData)




    const [photo, setPhoto] = useState([]);
    const [user, setUser]   = useState("");
    const [todayStory, settodayStory]   = useState("");
    const [date, setdate]   = useState("");
    const [special, setspecial]   = useState("");
    const [stars, setStars]   = useState("");
    const [rating, setRating]   = useState("Rate Your Day by Clicking on Emoji's");
    
    const emojis = ['😔' , "😩", "🙂" , "😚" , "😃" ] 



  const handleStarClick = (value) => {
    setStars(value);

if (value === 1) {
  setRating( " Bad day ")
}else if (value === 2) {
  setRating(" Irritated/Boring Day ")
}else if (value === 3) {
  setRating(" AVG/Good Day")
}else if (value === 4) {
  setRating(" Awesome Day ")
}else if (value === 5) {
  setRating("Marvellous Day")
}
 };


    useEffect(()=>{
      const today = new Date().toISOString().split("T")[0]; //  t is seprating date from time [0]  is to access first part of the split array 
      setdate(today);
      setUser(loginData.user._id)
    },[])

    const handleSubmit = async (e)=>{
      e.preventDefault()
      try {
        
const entryData = new FormData()  ///// form data is browsers propertie 

entryData.append("todayStory" , todayStory)
entryData.append("date" , date)
entryData.append("special" , special)
entryData.append("user" , user)
entryData.append("rating" , stars) 
photo.forEach((file)=>{

  entryData.append("photos" , file)

}   )
const res = await fetch("http://localhost:5000/writingDiary" , {
            method:"POST",
            headers:{
              "Authorization" : `Bearer ${loginData?.token}`
            },
            body:  entryData
      }) 
      const data = await res.json()
      
      if (data?.success === false) {
        toast.error(data?.message)
      } else if (data?.success === true) {
        toast.success(data?.message)

        setspecial("")
        setdate("")
        setPhoto([])
        settodayStory("")
        setTimeout(() => {
          toast.success(" Wish u  good luck  😀 for next day")
          
        }, 3000);

      }} catch (error) {
        console.log(error)
        toast.error("Some Error in Submiting")
    }
}



  return (
    <> 
 

    <form    className='entry-form'  onSubmit={handleSubmit} style={{ width:"100%" , marginBottom:"5rem"   , marginTop:"1rem" , fontFamily:"cursive",  }}>
  
  <h1  className='entry-form-greetings'  style={{ width:"100%", textAlign:"center" , color:`${ colorData.modeColor === "black" ? "lightgreen"  : 'black' }`   }}  >  hi  <span style={{color:`${ colorData.modeColor === "black" ? "lightgreen"  : 'pink' }`}}> {loginData.user.name}  </span> </h1>
  
  <div className="entry-form-date mb-3 mx-auto text-center" style={{width:"22%"}}   >
  <label style={{  color:`${ colorData.modeColor === "black" ? "skyblue"  : '' }` }} htmlFor="exampleFormControlInput1" className="form-label">Date</label>
  <input style={{  backgroundColor:`${ colorData.modeColor === "black" ? "silver"  : '' }` , color:`${ colorData.modeColor === "black" ? "white"  : '' }`         }} type='date' value={date} className="form-control" id="date"     onChange={(e)=>{setdate(e.target.value)
  }}  />
  </div>

  
  
 <div className='mb-5 entry-form-story-container ' style={{ width:"100%"  ,textAlign:"center"  , color:`${ colorData.modeColor === "black" ? "pink"  : '' }` }}    >
  <label    htmlFor="exampleFormControlTextarea1" className="form-label entry-form-story-label"   > Tell me about your day {loginData.user.name.split(" ")[0]  } ... </label>
  <textarea   style={{ minWidth:"50%"  ,maxWidth:"80%", minHeight:"15rem" ,maxHeight:"20rem",fontSize:`${textData/16}rem` ,color:`${ colorData.textColor}`,backgroundColor:`${ colorData.modeColor === "black" ? "silver"  : '' }`     }} className="form-control border-5   mx-auto  entry-form-story-text-area " id="exampleFormControlTextarea1"   value={todayStory} placeholder='Tell me here ✏️ ' onChange={(e)=>{settodayStory(e.target.value)}} ></textarea>
</div>

<div className="mt-3  entry-form-special-and-rating-container" style={{ display:'flex', width:"100%" , justifyContent:"space-around"}}> 
    
<div   className='entry-form-special-container'  style={{    width:"40%", textAlign:"center" , color:`${colorData.modeColor === "black" ? "skyblue"  : '' }` }} >
  <label htmlFor="exampleFormControlTextarea1  " className="form-label entry-form-special-label  "> Was something Special today ... </label>
  <textarea className="form-control card border-5 entry-form-special-textarea "   id="exampleFormControlTextarea1"  placeholder='Write here ✏️' style={{ minHeight:"7rem" ,maxHeight:"10rem",fontSize:`${textData/16}rem` ,color:`${ colorData.textColor}`, backgroundColor:`${ colorData.modeColor === "black" ? "silver"  : '' }` }} value={special}    onChange={(e)=>{setspecial(e.target.value)}}  ></textarea>
</div>
<div  style={{width:"40%"   }}  className='entry-form-rating-container' >
<div  style={{ textAlign:"center" }} >
{[1,2,3,4,5].map((value)=>      <span
            key={value}
            onClick={() => handleStarClick(value)}
            style={{    fontSize:"2rem" ,  cursor:"pointer"  }}
            >
            {emojis[value-1]}
          </span>

  )}</div> 
  <div  className='text-center' style={{  textAlign:"center"  }}> <p   style={{   fontSize:"1.5rem", color:`${ colorData.modeColor === "black" ? "gold"  : '' }` }}  id="rating-value">   {rating}  </p>
   </div>
</div>
   
</div>
  <label  className="btn btn-success mb-3 mx-auto upload-btn-label mt-5 " style={{  maxWidth:"30%"  , maxheight:"2vh", display:"block"  }}   > Upload Any Memoriable photo ...   
<input className='upload-btn'  type="file" name="photo" multiple accept="image/*" onChange={(e) => setPhoto((prevPhotos) => [...prevPhotos, ...Array.from(e.target.files)])}
 hidden  />
</label>
{photo.length > 0 && (
  <div className="card entry-imgs-card " style={{ justifyContent:"center", display:"flex" , flexDirection:"row",flexWrap:"wrap"  }} >
    {photo.map((file, index) => (
      <img
        key={index}
        src={URL.createObjectURL(file)}
        alt="error_in_loading"
        height="220"
        width="400"
        className="img img-responsive m-2 entry-imgs "
      />
    ))}
  </div>
)}

<div style={{width:"100%" ,textAlign:"center" }} >  
  <button  type="submit" className="btn btn-primary mt-4 submit-entry-btn " style={{width:"25%"}}  >Submit..</button>
  </div>
</form> 


    






</>)
}

export default Entry

