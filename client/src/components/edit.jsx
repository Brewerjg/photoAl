import React from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';


const Edit = () => {
    const { id } = useParams(); 
    const [title, setTitle] = useState();
    const [imageBody, setImageBody] = useState();
    const [image, setImage] = useState();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);


    const deleteImage = () => {
        axios.delete('http://localhost:8000/api/delete/' + id)
            .then(res => {

                navigate("/");
            })
            .catch(err => console.log(err))
    }
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/oneimage/' + id)
            .then(res => {
                setTitle(res.data.title);
                setImageBody(res.data.imageBody);
                setImage(res.data.image);

            })
            .catch(err => console.log(err))
    }, [])
    
    const updateImage = (e) => {
        e.preventDefault();
        axios.patch('http://localhost:8000/api/image/' + id, {
            title,
            imageBody,
            image,
    })   
            .then(res => {
                console.log(res);
                navigate("/"); 
            })

            .catch((err) => {
                const errorResponse = err.response.data.errors;
                console.log(err.response);
                const errorArr = Object.values(errorResponse).map((error) => error.message);
                setErrors(errorArr);
        });            
}


    return (
        <div className='flex flex-col justify-center w-full m-5 p-10'>
            <div >
            {errors.map((err, index) => (
                <p key={index}>{err}</p>
            ))}
            <form className='' onSubmit={updateImage}>

                <p className='m-4'>
                <label for="title" className='text-red-700'>Choose a name:</label>
                    <select name="title" id="title" onChange={(e) => { setTitle(e.target.value) }}>
                    <option value={title}>{title}</option>
                    <option value="Grammer">Grammer</option>
                    <option value="Bhakta">Bhakta</option>
                    <option value="Hooks">Hooks</option>
                    
                    </select>
                </p>
                <p className='flex flex-col w-1/3'>
                    <label for="formGroupExampleInput2" className="text-2xl text-red-800">Description</label>
                    <textarea class="form-control border border-dark" id="exampleFormControlTextarea1" rows="3" value={imageBody}  onChange={(e)=>setImageBody(e.target.value)}></textarea>
                </p>
                <p className='hidden m-4'>
                    <label className="text-2xl text-red-800">Image</label><br />
                    <input type="text" 
                    title="file" 
                    value={image} 
                    onChange={(e) => { setImage(e.target.value) }} />
                </p>
                <input className='m-2 btn btn-primary btn-sm' type="submit" />
            </form>
            <div class="col">
                <div>
                    <img className='w-[300px]' src={image} alt="" />
                </div>
                
                <button onClick={(e)=>{deleteImage(id)}} className='ms-2' >Delete</button>
                
            </div>
            </div>
        </div>
  )
}

export default Edit