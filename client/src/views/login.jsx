import React from 'react'
import { useState } from 'react';
import Log from '../components/login';


const Login = () => {
    const [user, setUser] = useState([]);
    
    return (
    <div>
        <Log user={user} setUser={setUser} />
    </div>
    )
} 

export default Login