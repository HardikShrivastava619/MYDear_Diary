import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet, useLocation,matchPath } from "react-router-dom";

function App() {
  const colorData = useSelector((s) => s.colorData);
  const BGImg = "/images/darkimg.jpg";
  const BGWhiteIMG = "/images/togetwhite.jpg";

  const location = useLocation();
  
  
  const hideImageRoutes = ["/Home/entry"  ,  "/Home/myEntry/:eid" , "/Home/edit/:eid" ];
  const hideImage = hideImageRoutes.some((route) =>
  matchPath({ path: route, exact: true }, location.pathname)
  );

  return (
    <div   className="main-div" style={{ overflow:"hidden" , backgroundColor: `${colorData.modeColor === "black" ? "rgba(0, 0, 0, 0.85)" : "white"}`}}>
      <Header />
      <div  className="container" style={{ scrollbarWidth:"none", height: "77.7vh", overflowY: "auto" }}>
        {!hideImage && (
          <img className="backg-IMG"
            src={colorData.modeColor === "white" ? BGWhiteIMG : BGImg}
            alt="pencil.jpg"
            style={{ float: "right", marginTop: "2rem" }}
          />
        )}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
