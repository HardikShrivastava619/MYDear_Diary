import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { FcRemoveImage } from "react-icons/fc";
import { AiOutlineWarning } from "react-icons/ai";
const EditEntry = () => {


    const loginData = useSelector(s=>s.loginData)
    const colorData = useSelector(s=>s.colorData)
    const textData =     useSelector(s=>s.textData)
    const params =useParams()
    const navigate = useNavigate()
    
       const [photoidToRemove, setphotoidToRemove] = useState("");
        const [displayDate, setdisplayDate]   = useState("");
        const [photo, setPhoto] = useState([]);
        const [todayStory, settodayStory]   = useState("");
        const [users, setUsers]   = useState("");
        const [special, setspecial]   = useState("");
        const [stars, setStars]   = useState("");
        const [rating, setRating]   = useState("Rate Your Day by Clicking on Emoji's");
        const [uploadedPhoto, setuploadedPhoto] = useState([]);
        
        const [ entry ,setEntry ] = useState([])
    
    
    
   // Fetchching entry and photos
 useEffect(() => {
  const fetchData = async () => {
    try {
      const resEntry = await fetch(`http://localhost:5000/getEnteries/${params.eid}`);
      const dataEntry = await resEntry.json();
      setEntry(dataEntry?.entry );
      setdisplayDate(dataEntry?.entry?.date)
      setStars(dataEntry?.entry?.rating)
settodayStory(dataEntry?.entry?.todayStory)
setspecial(dataEntry?.entry?.special)
setUsers(dataEntry?.entry?.user)
      if (dataEntry?.entry?.rating === 1){
         setRating("It was the Bad Day 😔");
      }else if(dataEntry?.entry?.rating === 2){
         setRating("It was the Boring Day 😩");
      }else if (dataEntry?.entry?.rating === 3){
         setRating("It was an Average Day 🙂");
    }else if (dataEntry?.entry?.rating === 4){
       setRating("It was an Awesome Day 😚");
  }else if (dataEntry?.entry?.rating === 5) {
    setRating("It was the Marvellous Day 😃");
  }
      const resPhotos = await fetch(`http://localhost:5000/entryPhoto/${dataEntry?.entry?._id}`);
      const dataPhotos = await resPhotos.json();
      
      
      if (dataPhotos.success){ setuploadedPhoto(dataPhotos.photosArray );}
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch entry or photos.");
    }
  };
  fetchData();
}, []);
  
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
 
     

     const handleUpdate = async (e) => {
      e.preventDefault();
      try {
    
        
        const entryData = new FormData();
    
        // Append other fields
        entryData.append("todayStory", todayStory);
        entryData.append("special", special);
        entryData.append("rating", stars);
        entryData.append("user", users);
        entryData.append("date", displayDate);
    
        // Merge new photos and existing photos into one array
        
    
        // Append all photos to a single field
        photo.forEach((item) => {
          if (item instanceof File) {
            // New photo files
            entryData.append("photos", item);
          } else {
            // Existing photo references
            entryData.append("photos", JSON.stringify(item));
          }
        });
    
        const res = await fetch(`http://localhost:5000/editEnteries/${params.eid}`, {
          method: "POST",
          body: entryData,
        });
    
        const data = await res.json();
        console.log(data);
    
        if (data?.success === false) {
          toast.error(data?.message);
        } else if (data?.success === true) {
          toast.success(data?.message);
    
          setTimeout(() => {
            toast.success("Wish you good luck 😀 for the next day");
          }, 3000);
        }
      } catch (error) {
        console.log(error);
        toast.error("Some Error in Updation");
      }
    };
    
   
const handleDelete = async ()=>{
    try {
      confirmAlert({
        customUI: ({ onClose }) => (  /// it re default ui with custom one
          <div
            style={{
              backgroundColor: "#1e1e2f", // Dark background
              color: "white",       
                      borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.4)", // Subtle shadow for elevation
              textAlign: "center",
            }}
          >
            <AiOutlineWarning size={50} style={{ color: "#ffcc00" }} />
            <h2 style={{ marginTop: "10px" }}>Confirm Delete</h2>
            <p>Are you sure you want to delete this entry? This action cannot be undone.</p>
            
              <button
                onClick={async () => {
                  try {
                    const res = await fetch(
                      `http://localhost:5000/deleteentry/${params.eid}`,
                      { method: "DELETE" }
                    );
                    const data = await res.json();
                    toast.success(data?.message);
                    navigate("/Home/oldEntries");
                    onClose();
                  } catch (error) {
                    toast.error("Failed to delete entry.");
                  }
                }}

                className=' btn btn-danger'
                style={{
                  marginRight: "10px",
                   
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Yes, Delete
              </button>
              <button
              
                className=' btn btn-secondary'
                onClick={onClose}
                style={{

                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            
          </div>
        ),
      });
    
   } catch (error) {
    console.log(error)
  }}
  
    
    const isoDate = displayDate ; // Your ISO date string

// Convert ISO date string to a JavaScript Date object
const dateObj = new Date(isoDate);

// Extract day, month, and year
const day = dateObj.getDate().toString().padStart(2, '0'); // Pad single digits with leading zero
const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
const year = dateObj.getFullYear();

// Format the date as dd/mm/yyyy
const formattedDate = `${day}/${month}/${year}`;

  
const handleImageRemover = async (photo)=>{

  
  try {

    confirmAlert({
      customUI: ({ onClose }) => (  /// it re default ui with custom one
        <div
          style={{
            backgroundColor: "#1e1e2f", // Dark background
            color: "white",       
                    borderRadius: "10px",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.4)", // Subtle shadow for elevation
            textAlign: "center",
          }}
        >
          <AiOutlineWarning size={50} style={{ color: "#ffcc00" }} />
          <h2 style={{ marginTop: "10px" }}>Remove Image</h2>
          
            <button
              onClick={async () => {
                try {
                  
const res = await fetch(`http://localhost:5000/imgRemover/${params.eid} ` , {
  method:"POST",
  headers:{
    "Content-Type": "application/json"
  },
  body:JSON.stringify({photoidToRemove : photo.id}  )  }  )
  const data = await res.json()
  
if (data.success) {
setuploadedPhoto((prevphotos) => prevphotos.filter((p) => p.id !== photo.id));
toast.success(data?.message)
}else{
toast.error(data?.message)
}} catch (error) {
                  toast.error("Failed to reomve photo.");
                }finally {
                  onClose(); // Close the modal
                }
              }}

              className=' btn btn-danger'
              style={{
                marginRight: "10px",
                 
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
           
              }}
            >
              Yes, Remove
            </button>
            <button
            
              className=' btn btn-secondary'
              onClick={onClose}
              style={{

                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          
        </div>
      ),
    });
  

    

  } catch (error) {
    console.log(error);
    toast.error("Error in removing photo")
  }
}
const handlesameimgfilter = (e) => {
  try {
    const newFiles = Array.from(e.target.files);

    const filteredFiles = newFiles.filter(
      (newFile) => !photo.some((existingFile) => existingFile.name === newFile.name)
    );
    if (filteredFiles.length > 0) {
      setPhoto((prevPhotos) => [...prevPhotos , ...filteredFiles]);
    }    
  } catch (error) {
    console.error("Error filtering duplicate images:", error);
  }
};

const handleNewImageRemover= async (file)=>{
  try{


    setPhoto (photo.filter((p)=> p.name !== file.name ) ) 
} catch (error){
    console.log(error);
}}



  return (
    <> 
 

  <form  onSubmit={handleUpdate} className='edit-form' style={{ width:"100%" ,marginBottom:"2.5rem"   , marginTop:"1rem" , fontFamily:"cursive",  }}>
  <h1    className='edit-form-greetings' style={{ width:"100%", textAlign:"center" , color:`${ colorData.modeColor === "black" ? "lightgreen"  : 'black' }`   }}  >  hi  <span style={{color:`${ colorData.modeColor === "black" ? "lightgreen"  : 'pink' }`}}> {loginData.user.name.split(" ")[0]  }  </span>   </h1>
  <h3   className='edit-form-greetings'  style={{ width:"100%", textAlign:"center" , color:`${ colorData.modeColor === "black" ? "red"  : 'black' }`   }}   > what you Want to Change </h3>  
  <div   className="edit-form-date mb-3 mx-auto text-center" style={{width:"22%"}}   >
  <label style={{  color:`${ colorData.modeColor === "black" ? "skyblue"  : '' }` }} htmlFor="exampleFormControlInput1" className="form-label  ">Date</label>
  <div   style={{  backgroundColor:`${ colorData.modeColor === "black" ? "#007bff"  : '' }` , color:`${ colorData.modeColor === "black" ? "white"  : '' }`}}   className="form-control edit-date btn btn-warning text-center"disabled>   {formattedDate} </div> 
  </div>

  
  
 <div className=' edit-form-story-container mb-5' style={{ width:"100%"  ,textAlign:"center"  , color:`${ colorData.modeColor === "black" ? "pink"  : '' }` }}    >
  <label htmlFor="exampleFormControlTextarea1" className="form-label  edit-form-story-label "   > Tell me about your day {loginData.user.name.split(" ")[0]  } ... </label>
  <textarea   style={{width:"80%"  ,  color:`${ colorData.textColor}`,backgroundColor:`${ colorData.modeColor === "black" ? "silver"  : '' }`   , fontSize:`${textData/16}rem` ,maxHeight:"15rem",minHeight:"15rem",scrollbarWidth:"none",     }} className="form-control mx-auto edit-form-story-textarea " id="exampleFormControlTextarea1"   value={todayStory} placeholder='Tell me here ✏️ ' onChange={(e)=>{settodayStory(e.target.value)}} ></textarea>
</div>
<div className="mt-3  edit-form-special-and-rating-container" style={{display:'flex', width:"100%" , justifyContent:"space-around"}}> 
<div className='edit-form-special-container'  style={{  minWidth:"40%", textAlign:"center" , color:`${colorData.modeColor === "black" ? "skyblue"  : '' }` }} >
<label htmlFor="  exampleFormControlTextarea1" className="form-label edit-form-special-label "> Was something Special today ... </label>
<textarea className="form-control edit-form-special-textarea "   id="exampleFormControlTextarea1"  placeholder='Write here ✏️' style={{ color:`${ colorData.textColor}`, backgroundColor:`${ colorData.modeColor === "black" ? "silver"  : '' }` , fontSize:`${textData/16}rem` ,minHeight:"15rem"  }} value={special}    onChange={(e)=>{setspecial(e.target.value)}}  ></textarea>
</div>
<div   className='edit-form-rating-container' style={{minWidth:"40%"   }}>
<div   className='edit-form-ratings' style={{ textAlign:"center" }} >
{[1,2,3,4,5].map((value)=>      <span
            key={value}
            onClick={() => handleStarClick(value)}
            style={{    fontSize:"2rem" ,  cursor:"pointer"  }}
            >
            {emojis[value-1]}
          </span>

  )}</div> 
  <div  className='text-center  '  style={{  textAlign:"center"  }}> <p className='edit-form-ratings-para'  style={{   fontSize:"1.5rem", color:`${ colorData.modeColor === "black" ? "gold"  : '' }` }}  id="rating-value">   {rating}  </p>
   </div>
</div>
   
</div>
<div  className='edit-form-photos-container'  style={{ width:"100%" ,  marginTop:"2rem"}}>   
<label  className="btn btn-success mb-3 mx-auto upload-btn-label " style={{  maxWidth:"20vw"  , minHeight:"5vh", display:"block"  }}   > Upload Any Memoriable photo ...   
<input className='upload-btn'  type="file" name="photo" multiple accept="image/*" onChange={(e) =>   handlesameimgfilter(e)     }
 hidden  />
</label>
{ (
  <div className='already-uploaded-imgs ' style={{border:"1px solid silver"  ,display:"flex" , flexDirection:"row",flexWrap:"wrap"  }} >
    {photo.map((file, index) => ( 
      <div className='img-container'  style={{  width:"33%", }} >
      <FcRemoveImage   onClick={()=>{handleNewImageRemover(file)}    } style={{fontSize:"2rem"  ,float:"right"}} />
      <img key={index} src={URL.createObjectURL(file)}alt="error_in_loading" height="320" width="95%"className="img img-responsive m-2 edit-images "/>    </div>))}

{ uploadedPhoto.length == 0 ?  <h1  style={{  color:`${colorData.modeColor === "black" ?  "lightgreen" : "" }`  }} >  "NO photo is Posted "  </h1> :           uploadedPhoto.map((photo, index) => (
   <div   className='img-container' style={{  width:"33%"}}   >
   <FcRemoveImage  style={{fontSize:"2rem"  ,float:"right", cursor:"pointer"  }}   onClick={()=>{handleImageRemover(photo)}    } />
   <img key={index} src={`data:${photo.contentType};base64,${photo.data}`} alt={`Photo ${index + 1}`}  height="320" width="95%" className=" m-2   edit-imges " />
</div> ))}
</div>
)}
 
</div>


<div style={{width:"100%",textAlign:"center"     }} >  
  <button  type="submit" className="btn btn-primary update-btn mt-4" style={{  minWidth:"22vw" }} onClick={handleUpdate}  >Update..</button>
  </div>

</form>
 <div className='mb-5' style={{display:'flex'  , width:"100%" , justifyContent:"center" }}>
<button  className='btn btn-danger  ' style={{minWidth:"16vw"}}  onClick={handleDelete} > Delete  </button>
</div>

    






</>
  )
}

export default EditEntry