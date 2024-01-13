import React from 'react'
import Navbar from '../components/navbar';
import DisplayImg from '../components/displayImg';
import { useState } from 'react';
import Carousel from '../components/EmblaCarousel';



const Home = () => {
    const [image, setImage] = useState([]);
    const removeDom = imageId => {
        setImage(image.filter(image => image._id !== imageId));
    }

  return (
    <div>
      <Navbar/>
      <Carousel/>
      <DisplayImg image={image} setImage={setImage} removeDom={removeDom}/>
    </div>
  )
}

export default Home
