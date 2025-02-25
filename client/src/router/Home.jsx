import React from "react";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Loading from "../components/Loading.jsx"

const Home = () => {
  
  const location = useLocation()
  
  const navigate = useNavigate();
  const colorData = useSelector((s) => s.colorData);
  const loginData = useSelector((s) => s.loginData);
  
  const smallButtonsRoutes = ["/Home/entry"  ,  "/Home/oldEntries","/Home/profile" , "/Home/myEntry/:eid","/Home/edit/:eid" ];
  const smallButtons = smallButtonsRoutes.some((route) =>
  matchPath({ path: route, exact: true }, location.pathname)
);


  // Get time-based greeting
  const getGreeting = () => {
    const hours = new Date().getHours();
    const minutes =  new Date().getMinutes();
    
    if (hours < 5) return `it's ${hours}:${minutes } 🌃 ${loginData?.user?.name.split(" ")[0]  }.   You are too late You should go for sleep now`;
    if (hours < 12) return `👋🏻Good Morning ${loginData?.user?.name.split(" ")[0]  }.... Glad To see You again `;
    if (hours < 17) return `👋🏻Good Afternoon ${loginData?.user?.name.split(" ")[0]  } Glad To see You again`;
    if (hours < 22) return `👋🏻Good Evening ${loginData?.user?.name.split(" ")[0]  } Glad To see You again`;
    if (hours > 22) return ` 👋🏻 ${loginData?.user?.name.split(" ")[0]} Glad To see You again but dont forget to sleep early`;
    
    return "Good Evening";
  };

  return (
< > 


    <Outlet/>
    <div  style={{color: colorData.modeColor === "black" ? "#ffffff" : "#000000",maxHeight: "100%",padding: "2rem",textAlign: "center",   }}>
    {!smallButtons &&  <>  <h2 style={{fontFamily: "Cursive",margin: "2rem 0",color: colorData.modeColor === "black" ? "skyblue" : "#333",}}> {getGreeting()}  </h2>
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
    <button onClick={() => navigate("/Home/entry")}style={{padding: "1rem 2rem",border: "none",borderRadius: "8px",backgroundColor: colorData.modeColor === "black" ? "lightgreen" : "teal",color: "#fff",fontSize: "1.2rem",fontFamily: "Cursive",cursor: "pointer",transition: "transform 0.3s"}}onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}>Start Writing Diary</button>
    <button onClick={() => navigate("/Home/oldEntries")} style={{padding: "1rem 2rem",border: "none",borderRadius: "8px",backgroundColor: colorData.modeColor === "black" ? "lightblue" : "blue",color: "#fff",fontSize: "1.2rem",fontFamily: "Cursive",cursor: "pointer",transition: "transform 0.3s",}}onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}>My Old Memories</button>
    <button onClick={() => navigate("/Home/profile")}style={{padding: "1rem 2rem",border: "none",borderRadius: "8px",backgroundColor: colorData.modeColor === "black" ? "lightcoral" : "red",color: "#fff",fontSize: "1.2rem",fontFamily: "Cursive",cursor: "pointer",transition: "transform 0.3s",}}onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}>Go to Profile</button>
    </div>
    </> } 
   {loginData.token === ""  &&  <Loading/>    }
 
 
    </div>
    </>
 );};

export default Home;
