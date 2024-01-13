import React from 'react'
import BgVideo from '../assets/film-effect-cut.mp4'
import { Link, useNavigate } from 'react-router-dom'
import { useLayoutEffect, useState} from 'react'
import SplitType from 'split-type'
import gsap from 'gsap'
import axios from 'axios'
import { useContext } from 'react'
import UserContext from '../utils/userContext'
import {FaBars, FaTimes} from 'react-icons/fa'



 
const Navbar = () => {
    const {setLoggedInUser} = useContext(UserContext)
    const [nav, setNav] = useState(false)
    const handleNav = () => setNav(!nav)

    useLayoutEffect(() => {
        var myText = new SplitType ('.my-text');
        gsap.to(myText.chars, {duration: 1, y: 0, stagger: 0.04, delay: .5,
            duration: .1, ease: 'power2.inOut'});
        }, [])
    
    const navigate = useNavigate()
    const handleClick = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
            .then(res => {
                setLoggedInUser(false)
                console.log(res.data)
                navigate('/')
            })
            .catch(err => console.log(err))
    }



  return (
    <div className="navbar">
        <div className="wrapper hidden:md">
            <Link to="/dashboard">
                <button > Home</button>
            </Link>
            <Link to="/new">
                <button >Add Photo</button>
            </Link>
            <Link to="/">
            <button onClick={handleClick} >Logout</button>
            </Link>
        </div>

        <div onClick={handleNav} className='md:hidden z-10'>
            {!nav ? <FaBars/> : <FaTimes/>}
        </div>

        <div className="head-div h-screen">
		    <h1 className='head-name my-text font-["Elsie"] text-3xl xl:text-8xl lg:text-8xl md:text-5xl sm:text-3xl '>Grammer | Bhakta</h1>
	    </div>
	<video className="video-bg" src={BgVideo} autoPlay loop muted></video>
    </div>
  )
}

export default Navbar