import { User } from "../models/user.model.js";
import httpStatus from "http-status"
import bcrypt from "bcrypt"
import crypto from "crypto"
import {Meeting} from "../models/meeting.model.js"


const login=async(req,res)=>{
    const {username,password}=req.body;
    if(!username || !password){
        res.status(400).json({
            message:"Please Enter all the details"
        })
    }
    try {
        const user=await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({
                messgae:"User not found"
            })
        }
        console.log(user)
        let isPasswordCorrect=await bcrypt.compare(password,user.password)

        if(isPasswordCorrect){
            let token=crypto.randomBytes(20).toString("hex");
            user.token=token;
            await user.save();

            return res.status(httpStatus.OK).json({
                token:token,
            })
        }else{
            return res.status(httpStatus.UNAUTHORIZED).json({
                message:"Invalid user or password"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Something went wrong"
        })
    }
}


const register=async(req,res)=>{
    const {name,username,password}=req.body;
    console.log(req.body)

    try {
        const existingUser=await User.findOne({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({
                message:"User already exist"
            })
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const newUser=await User({
            name:name,
            username:username,
            password:hashedPassword,
        })

        await newUser.save();
        res.status(httpStatus.CREATED).json({
            message:"User registered"
        })

    } catch (error) {
        console.log(error);
        res.json({
            message:"Something went wrong"
        })
    }
}


const getUserHistory=async(req,res)=>{
    const {token}=req.query;
    console.log(token)
    try {
        const user=await User.findOne({token:token});
        const meetings=await Meeting.find({user_id:user.username})
        res.json(meetings)
    } catch (error) {
        res.json({message:`something went wrong ${error}`})
    }
}


const addToHistory=async(req,res)=>{
    const {token,meeting_code}=req.body;
    console.log("token...",token);
    console.log("token...",meeting_code);
    try {
        const user=await User.findOne({token:token});
        console.log("user....",user)
        const newMeeting=new Meeting({
            user_id:user.username,
            meetingCode: meeting_code
        })
        console.log(newMeeting)
        await newMeeting.save();

        res.status(httpStatus.CREATED).json({
            message:"added code to history"
        })
    } catch (error) {
        console.log(error);
        res.json({
            message:"something went wrong"
        })
    }
}

export {login,register,getUserHistory,addToHistory}