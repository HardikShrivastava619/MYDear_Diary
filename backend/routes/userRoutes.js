import express from 'express'
import { forgrtPassword, getUserController, loginController, registerController, updateProfileController } from '../controllers/userControllers.js'
import { requireSignIn } from '../Middlwares/authMiddleware.js'

const router = express.Router()


   router.post("/register" , registerController)

   router.post("/login" , loginController)

   router.get("/get-user/:uid" , getUserController )

   router.post("/UpdateProfile/:uid" ,requireSignIn,updateProfileController)

   router.post("/forget-password", forgrtPassword )



   export default router