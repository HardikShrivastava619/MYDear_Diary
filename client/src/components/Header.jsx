import { Link } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginSliceAction } from "../store/loginSlice";
import { colorSliceAction } from "../store/colorSlice";
import { SwatchesPicker } from 'react-color';
import { GiQuillInk } from "react-icons/gi";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { textSizeSLiceAction } from "../store/textSize";

function Header() {
  const colorData = useSelector((s) => s.colorData);
  const textData = useSelector((s) => s.textData); // This will give you the current font size
  const dispatch = useDispatch();

  const loginData = useSelector((s) => s.loginData);

  // Handling theme switch (Dark/Light)
  const handleMode = () => {
    if (colorData.modeColor === "black") {
      dispatch(colorSliceAction.backgroundColor("white"));
    } else if (colorData.modeColor === "white") {
      dispatch(colorSliceAction.backgroundColor("black"));
    }
  };

  // Handling Logout
  const handleLogout = () => {
    try {
      dispatch(loginSliceAction.logout());
      toast.success("Logout Successfully 👍🏻");
    } catch (error) {
      console.log(error);
      toast.error("Some Error in Logout");
    }
  };

  const handleFontSizeChange = (value) => {
    dispatch(textSizeSLiceAction.fontSize({ value }));
  };

  return (
    <>
      <nav className="d-flex header " style={{ width:"100%", display:"flex" , justifyContent:"space-between",height: "8vh",backgroundImage: "linear-gradient(50deg, pink 40%, skyblue 60%)" }}>
        <h2 className="dear-diary" style={{  marginTop:"1vh" }}><FaBookReader className=" FaBookReader "   /> Dear Diary </h2>

        <div className="nav-item dropdown item-container "  style={{display:"flex", flexDirection:"row" , justifyContent:"space-between" ,width:"30%" , listStyleType: "none", }}>
         
          <h1 data-bs-toggle="dropdown"  className="ink" style={{ cursor: "pointer", fontSize: "3em", width:"20%" , height:"100%",textAlign:"right" ,}}>
            {loginData.token === "" ? "" : <GiQuillInk className="mb-3 ink-icon " />}
          </h1>

          <ul className="dropdown-menu p-2  ">
            <SwatchesPicker
              color={colorData.textColor}
              onChangeComplete={(updatedColor) => dispatch(colorSliceAction.textColor(updatedColor.hex))}
            />
            <p>Selected Color: {colorData.textColor}</p>
          </ul>

          {/* Font Size Picker */}

    {loginData.token === ""  ? ""  :   <div  className="slider" style={{ width:"50%",display:"flex", justifyContent:"center",flexDirection:"column" ,height:"100%" , fontFamily: 'Arial, sans-serif' }}>
            <Slider
              style={{ marginTop:"4vh" }}
              min={12}
              max={32}
              value={textData} 
              onChange={ (value)=>  {handleFontSizeChange(value)}  } 
            />
            <p style={{ textAlign: "center", fontFamily: "cursive" }}  className="font-para" > Font Size: {textData}</p>
          </div>
         }    


<Link className="nav-link  menu-bar"  style={{ float: "right" ,fontSize:"1em"  }} data-bs-toggle="dropdown">
            <h1 className="mx-4"><MdOutlineMenu /></h1>
          </Link>
          <ul className="dropdown-menu p-2">
            <li>
              <p onClick={handleMode} className="mb-2" style={{ cursor: "pointer", color: "black", textDecoration: "none", fontSize: "large" }}>
                {colorData.modeColor === "black" ? "Normal Mode" : "Dark Mode"}
              </p>
            </li>
            {loginData.user !== null ? (<>
              <li> <Link   to="/Home" className="text-dark mb-2" style={{textDecoration:"none" , fontSize:"large" }} > Home </Link> </li>
              <li><Link className="text-dark mt-3" to="/" onClick={handleLogout} style={{ textDecoration: "none", fontSize: "large" }} >Logout</Link></li>
              </> ) : (
              <>
                <li><Link className="text-dark mt-3" to="Register" style={{ textDecoration: "none", fontSize: "large" }}>Register</Link></li>
                <li><Link className="text-dark mt-3" to="/" style={{ textDecoration: "none", fontSize: "large" }}>Login</Link></li>
              </>
            )}
          </ul>


         </div>
      </nav>
    </>
  );
}

export default Header;
