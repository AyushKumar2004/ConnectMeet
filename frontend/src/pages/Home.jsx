import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import RestoreIcon from '@mui/icons-material/Restore';
import styles from "../styles/videoComponent.module.css"
import { Button, IconButton, TextField } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';


const Home = () => {

    let navigate=useNavigate();
    const [meetingCode,setMeetingCode]=useState("");
    const {addToUserHistory}=useContext(AuthContext)


    let handleJoinVideoCall=async()=>{
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

  return (
    <>
      <div className={styles.navBar}>
        <div style={{display:"flex",alignItems:"center"}}>
            <h2>ConnectMeet</h2>
        </div>
        <div style={{display:"flex"}}>
            <IconButton onClick={()=>{
                navigate("/history")
            }}>
                <RestoreIcon/>
                <p>History</p>
            </IconButton>
            <Button onClick={()=>{
                localStorage.removeItem("token");
                navigate("/")
            }}>
                Logout
            </Button>
        </div>
      </div>

      <div className={styles.meetContainer}>
            <div className={styles.leftPanel}>
                <div>
                    <h2>Providing Quality Video Call Just Like Quality Education</h2>
                    <div style={{display:"flex",gap:"10px"}}>
                        <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                        <Button onClick={handleJoinVideoCall} variant='contained'>Join</Button>
                    </div>
                </div>
            </div>
            <div className={styles.rightPanel}>
                <img src='/logo3.png'/>
            </div>
      </div>
    </>
  )
}

export default withAuth(Home)
