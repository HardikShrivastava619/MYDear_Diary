import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  './index.css'
import App from './App.jsx'
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import Registeration from './router/Registeration.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Login from './router/Login.jsx'
import Entry from './router/Entry.jsx'
import {Provider} from 'react-redux'
import finalStore from './store/index.js'
import Home from './router/Home.jsx'
import OldEntries from './router/OldEntries.jsx'
import Profile from './router/Profile.jsx'
import ForgetPassword from './router/ForgetPassword.jsx'
import MyEntry from './router/MyEntry.jsx'
import EditEntry from './router/EditEntry.jsx'
import 'react-confirm-alert/src/react-confirm-alert.css'



const router = createBrowserRouter([

    {path:"/" , element: <App/> , children:[
    {path:"/" , element:<Login/>},
    {path:"/Register",element:<Registeration/> },
    {path:"/forgetPassword",     element:<ForgetPassword/> },
    {path:"/Home" ,              element:<Home/>,children:[  
    {path:"/Home/profile" ,      element:<Profile/>},
    {path:"/Home/entry" ,        element:<Entry/>},     
    {path:"/Home/oldEntries"   , element:<OldEntries/>}, 
    {path:"/Home/myEntry/:eid" , element:<MyEntry/> },
    {path:"/Home/edit/:eid"    , element : <EditEntry/>}
    ]},] }

  
] , { future: { v7_startTransition: true } } 
)

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <Provider store={finalStore} >
    <ToastContainer  className="toast-container"  position='top-center'   />
    <RouterProvider   router={router}  />
    </Provider>
    </StrictMode>,)
