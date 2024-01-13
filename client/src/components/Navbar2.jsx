import React from 'react'
import BgVideo from '../assets/film-effect-cut.mp4'
import { Link } from 'react-router-dom'

const Navbar2 = () => {
  return (
    <div className="navbar">
        <div className="wrapper">
            <Link to="/dashboard">
                <button > Home</button>
            </Link>
        </div>
	<video className="video-bg" src={BgVideo} autoPlay loop muted></video>
    </div>
  )
}

export default Navbar2