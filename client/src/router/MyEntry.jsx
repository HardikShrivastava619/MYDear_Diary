import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { MdEditSquare } from "react-icons/md";

const MyEntry = () => {
  const params = useParams();
  const [photos, setPhotos] = useState([]);
  const [entry, setEntry] = useState([]);
  const  [ emoji , setEmoji] = useState()
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Modal state
  const colorData = useSelector((s) => s.colorData);
  const textData = useSelector((s) => s.textData);
  const navigate = useNavigate();
  const isoDate = entry.date;
  const date = new Date(isoDate);
  const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resEntry = await fetch(`https://mydear-diary-5.onrender.com/getEnteries/${params.eid}`);
        const dataEntry = await resEntry.json();
        setEntry(dataEntry?.entry);
        if (dataEntry?.entry?.rating == null  ) {
          setEmoji("You Have Not rated this day")
        }else if (dataEntry?.entry?.rating == 1  ) {
          setEmoji("😔 It was a Sad Day")
        }else if (dataEntry?.entry?.rating ==2  ) {
          setEmoji("😩 It was a Irritated/Boring Day ")
        }else if (dataEntry?.entry?.rating ==3  ) {
          setEmoji("🙂 It was a Avg/Good  Day")
        }else if (dataEntry?.entry?.rating ==4  ) {
          setEmoji("😚 It was a Awesome Day  ")
        }else if (dataEntry?.entry?.rating ==5  ) {
          setEmoji("😃 It was a Marvellous Day")
        }
        
        const resPhotos = await fetch(`https://mydear-diary-5.onrender.com/entryPhoto/${dataEntry?.entry?._id}`);
        const dataPhotos = await resPhotos.json();
        if (dataPhotos.success) setPhotos(dataPhotos.photosArray);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch entry or photos.");
      }
    };
    fetchData();
  }, [params.eid]);

  const handlePhotoClick = (photo) => setSelectedPhoto(photo);
  const closeModal = () => setSelectedPhoto(null);
  const handleEdit = () => navigate(`/Home/edit/${params.eid}`);




  return (
      <main className='myentry-page'  style={{ padding:"3rem", display:"flex",flexDirection:"column" , minWidth:"85vw"  } } >
      <h2 className="myentry-emoji text-center mb-4" style={{ fontFamily: "cursive", color: colorData.modeColor === 'black' ? "lightgreen" : "black" }}>
      {emoji}
      </h2>
      <h3 className="text-center myentry-Date  mx-auto mb-4" style={{  padding:"1rem " , borderRadius:"2rem"  ,width:"15vw", fontFamily: "cursive", backgroundImage: "linear-gradient(135deg, #ff9a9e, #fad0c4)"}}>
      {formattedDate}
      </h3>
      <div style={{  display:"flex",alignItems:"center", flexDirection:"column" ,minWidth:"100%"  }} className='myentry-story-special-container'   >
        <div className="  p-4 mb-4  myentry-story-container " style={{ minWidth:"60%",  borderRadius:"2rem" ,border:"1px solid silver" ,color:`${ colorData.textColor}`,backgroundColor: colorData.modeColor === 'black' ? "grey" : '',height: "25rem", fontFamily: "cursive", overflowY: "auto", scrollbarWidth:"none" , fontSize: `${textData / 16}rem`}}>
          <p   >{entry.todayStory}</p>
        </div>
        <div  style={{ maxWidth:"80%",display:"flex",flexDirection:"column",alignItems:"center"  }} className='   myentry-special-container' >
          <h5 className=" myentry-special-heading  text-center mt-5" style={{fontFamily: "cursive", color: colorData.modeColor === 'black' ? "pink" : "black"}}>Special thing of {formattedDate}
          </h5>
          <div className=" myentry-special  p-4" style={{width:"85%",border:"1px solid silver" ,borderRadius:"2rem",fontFamily:"cursive",   scrollbarWidth:"none"  ,color:`${ colorData.textColor}`,backgroundColor: colorData.modeColor === 'black' ? "grey" : '',height: "15rem", overflowY: "auto", fontSize: `${textData / 16}rem`}}>
        <p>{entry.special}</p>
        </div>
        </div>
        </div>

      <h2 className="text-center mt-5  photos-heaading " style={{ fontFamily: "cursive", color: colorData.modeColor === 'black' ? "lightgreen" : "black"}}>      Photos of {formattedDate}</h2>
      
      <div className="  photos-container   "  style={{display:"flex",  flexWrap:"wrap"  , justifyContent:"center",marginTop:"5vh" }}    >
        {photos.length === 0 ? (
          <h4 style={{ color: colorData.modeColor === 'black' ? "lightgreen" : "black", fontFamily: "cursive" }}>
            "NO photo is Posted"
          </h4>
        ) : (
          photos.map((photo, index) => (
            <img  className='images' key={index} src={`data:${photo.contentType};base64,${photo.data}`} alt={`Photo ${index + 1}`}onClick={() => handlePhotoClick(photo)}style={{            width: "20rem", height: "20rem", margin: "1rem", borderRadius: "8px", objectFit: "cover", cursor: "pointer"}}/>              
          ))
        )}
      </div> 

      {selectedPhoto && ( 
        <div className="modal-overlay" onClick={closeModal} style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.8)",display: "flex", justifyContent: "center", alignItems: "center"}}>
<img src={`data:${selectedPhoto.contentType};base64,${selectedPhoto.data}`}alt="Enlarged"style={{ maxHeight: "90%", maxWidth: "90%", borderRadius: "8px", }}/>        </div>)}

      <button
        className="btn btn-outline-info mx-auto mt-4 , mb-4"
        style={{ display: "flex", justifyContent:'center',minWidth: "10rem",    borderRadius:`${100/6}rem`,height: "2.5rem", fontFamily: "cursive", marginTop: "3rem" }}
        onClick={handleEdit}
      >
        <MdEditSquare style={{ fontSize: "1.5rem" }} /> Edit
      </button>
    </main>
  );
};

export default MyEntry;
