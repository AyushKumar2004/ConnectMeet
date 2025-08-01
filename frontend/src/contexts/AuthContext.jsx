import { useContext } from "react";
import { useState } from "react";
import { Children } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import httpStatus from "http-status"

export const AuthContext=createContext({});

const client=axios.create({
    baseURL:process.env.REACT_APP_BASE_URL
})

export const AuthProvider=({children})=>{
    const authContext=useContext(AuthContext);

    const [userData,setUserData]=useState(authContext);

    const router=useNavigate();

    const handleRegister=async(name,username,password)=>{
        try {
            let request=await client.post("/register",{
                name:name,
                username:username,
                password:password,
            })

            if(request.status===httpStatus.CREATED){
                return request.data.message;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const handleLogin=async(username,password)=>{
        try {
            let request=await client.post('/login',{
                username:username,
                password:password,
            })
            //console.log("LOGIN----------",request)
            if(request.status===httpStatus.OK){
                localStorage.setItem('token',request.data.token);
                router("/home")
            }
        } catch (error) {
            console.log(error)
        }
    }


    const getHistoryOfUser=async(req,res)=>{
        try {
            let request=await client.get("/get_all_activity",{
                params:{
                    token:localStorage.getItem("token")
                }
            })
            return request.data
        } catch (error) {
            throw error
        }
    }

    const addToUserHistory=async(meetingCode)=>{
        try {
            let request=await client.post("/add_to_activity",{
                token:localStorage.getItem("token"),
                meeting_code:meetingCode
            })
            return request
        } catch (error) {
            throw error
        }
    }


    const data={
        userData,setUserData,handleRegister,handleLogin,getHistoryOfUser,addToUserHistory
    }

    return(
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}