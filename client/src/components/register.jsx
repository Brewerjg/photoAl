import React from 'react'
import {useState, useContext} from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../utils/userContext'
import Logimg from '../assets/logreg.jpg'




const Register = () => {
  const {setLoggedInUser} = useContext(UserContext)
  const [user, setUser] = useState({ 
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const navigate = useNavigate();
  
    const changeHandler = (e) => {
      setUser({...user, [e.target.name]: e.target.value})
    }
  
  
    const registerHandleSubmit = (e) => {
      e.preventDefault()
      axios.post('http://localhost:8000/api/register', user, { withCredentials: true })
              .then(res=>{
                  setLoggedInUser(true)
                  console.log(res.data);
                  navigate('/dashboard');
                  
              })
              .catch((err) => {
                  console.log(err)
                  
          }); 
      }
  return (
    <div className='flex justify-center align-middle py-[20rem]'>
      <img className='image-bg' src={Logimg} alt="" />
        <div className="card">
          <div className="card-header">
            <div className="text-header">Register</div>
          </div>
          <div onSubmit={registerHandleSubmit} className="card-body ">
            <form action="#">
              <div className="form-group">
                <label className='text-black' for="name">First Name:</label>
                <input required="" className="form-control" onChange={changeHandler} value={user.firstName} name="firstName" id="firstName" type="text"/>
              </div>
              <div className="form-group">
                <label className='text-black' for="name">Last Name:</label>
                <input required="" className="form-control" onChange={changeHandler} value={user.lasName} name="lastName" id="lastName" type="text"/>
              </div>
              <div className="form-group">
                <label className='text-black' for="email">Email:</label>
                <input required="" className="form-control" onChange={changeHandler} value={user.email} name="email" id="email" type="email"/>
              </div>
              <div className="form-group">
                <label className='text-black' for="password">Password:</label>
                <input required="" className="form-control" onChange={changeHandler} value={user.password} name="password" id="password" type="password"/>
              </div>
              <div className="form-group">
                <label className='text-black' for="confirm-password">Confirm Password:</label>
                <input required="" className="form-control" onChange={changeHandler} value={user.confirmPassword} name="confirmPassword" id="confirmPassword" type="password"/>
              </div>
              <div className="form-group flex justify-center">
                    <input type="submit" className="btn" value="submit"/>   
            </div> 
            </form>
            <div className='mt-4'>
                <Link className='p-8 text-lg text-white ' to="/">Already a user? Click here</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Register