import { comparePassword, hashPassword } from "../helper/authHelper.js"
import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"



export const registerController = async (req,res)=>{

try {
   const {name , email , answer , password , phone}  = req.body

if (!name){res.status(400).send({ success:false, message:'name is required'})}
if (!answer){res.status(400).send({success:false,message:'answer is required'})}
if (!phone){res.status(400).send({success:false,message:'phone is required'})}
if (!email){res.status(400).send({success:false,message:'email is required'})}
if (!password){res.status(400).send({success:false,message:'password is required'})}

const existingUser = await userModel.findOne({email})
if (existingUser){
  return res.status(400).send({ success:false,  message:"Email is already registered"})
}else{
const hashedPassword = await hashPassword(password)
const registeredUser = await userModel.create({name , email , answer , password:hashedPassword , phone})
res.status(200).send({
    success:true,
    message:"You are Registered Succesfully",
    registeredUser
})}}catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:" Server Side error in Registeration",
        error
    })}}














export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).send({ success: false, message: "Email is required" });
        }
        if (!password) {
            return res.status(400).send({ success: false, message: "Password is required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ success: false, message: "Email is not registered" });
        }

        const match = await comparePassword(password, user?.password);
        if (!match) {
            return res.status(404).send({ success: false, message: "Invalid Password" });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                answer: user.answer,
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Server Side error in Login",
            error,
        });
    }
};




    export const getUserController = async (req,res)=>{

        try {
            const {uid} = req.params

const user = await userModel.findById(uid)
res.status(200).send({
    success:true,
    message:"User recieved Succesfully",
    user

})

        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:" Server Side error in getting User",
                error  
            })
            
        }
    }


    export const updateProfileController = async (req,res)=> {
        try{
            const {name , email , answer , password , phone}  = req.body
            const user = await userModel.findById(req.params.uid)
            const hashedPassword = password ? await hashPassword(password) : undefined 
            const updatedUser = await userModel.findByIdAndUpdate(req.params.uid , {
    name: name || user.name,
    password: hashedPassword || user.password,
    phone : phone || user.phone ,
    email : email || user.email ,
    answer : answer || user.answer    
},{new:true}  )

res.status(200).send({
    success:true,
    message:"Proile Updated Succesfully"
})
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:" Server Side error in updating Profile",
                error  
            })

            
        }
    }


export const forgrtPassword = async (req,res)=>{

    try {
const { newPassword  ,email,answer} = req.body

if (!email){
    res.status(404).send({success:false , message:"email is required"})
}else if (!newPassword){
    res.status(404).send({success:false , message:"New Password is required"})
}else if (!answer){
    res.status(404).send({success:false , message:"answer is required"})
}

        const user = await userModel.findOne({email,answer})
        if (!user){
            res.status(400).send({
               success:false,
               message:" Email or Answer ane not found "
            })}
const hashedPassword = await hashPassword(newPassword)
const updatedUser = await userModel.findByIdAndUpdate(user._id , {password:hashedPassword},{new:true})
res.status(200).send({
    success:true,
    message:'Password is Changed Successfully'
}) 

        


    } catch (error) {
        console.log(error)
        
    }
}