import React from 'react'
import Navbar from '../components/navbar';
import { useState } from 'react';
import Edit from '../components/edit';


const Detail = () => {
    const [image, setImage] = useState([]);
    const removeDom = imageId => {
        setImage(image.filter(image => image._id !== imageId));
    }
  return (
    <div>
        <Navbar/>
        <Edit image={image} setImage={setImage} removeDom={removeDom}/>
    </div>
  )
}

export default Detail