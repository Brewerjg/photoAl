import React from 'react'
import { useState } from 'react';
import Reg from '../components/register';


const Register = () => {
    const [user, setUser] = useState([]);
    
    return (
    <div>
        <Reg user={user} setUser={setUser} />
    </div>
    )
} 

export default Register