import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate=useNavigate();

  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='navHeader'>
            <h2>ConnectMeet</h2>
        </div>
        <div className='navList'>
            <p onClick={()=>navigate("/guest-8456534858-dbtdf-5834y")}>Join as guest</p>
            <p onClick={()=>{
              navigate("/auth")
            }}>Register</p>
            <div role='button'>
                <p onClick={()=>{
                  navigate("/auth")
                }}>Login</p>
            </div>
        </div>
      </nav>

      <div className='landingMainContainer'>
        <div>
            <h1><span style={{color:"#ff9839"}}>Connect With</span>  your Loved Ones</h1>
            <p>Cover a distance by Apna video Call</p>
            <div role='button' >
                <Link to={'/auth'}>Get Started</Link>
            </div>
        </div>
        <div>
            <img src='./mobile.png' alt='mobile' />
        </div>
      </div>
    </div>
  )
}

export default LandingPage
