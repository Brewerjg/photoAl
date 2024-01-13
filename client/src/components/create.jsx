import React, {useState} from 'react'
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import { useNavigate } from 'react-router-dom';



export default function Create () {
    const [image , setImage] = useState({
        title: "",
        imageBody: "",
        image: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();



    const url = "http://localhost:8000/api/image/new";
    const createImage = (newImage) => axios.post(url, newImage);
    
      const createImg = async (image) => {
        try {
          await createImage(image);
          return alert("Image Added");
          
        } catch (setError) {
          console.log(error.message);
          return alert("Invalid Form, Please Try Again");
        }
      };

      const handleSubmit = () => {
        if (image.image === "" || image.image === null) {
          return alert("Please Upload an Image");
          
        }
        createImg(image);
        navigate("/dashboard");
      };
  
    return (
    <div className='flex justify-center mt-32'>
      <div className='flex flex-col bg-gray-400 rounded-2xl m-10 h-1/3 w-full md:w-1/3 p-5 ' >
        <div className='flex justify-center'>
          <h1 className='text-5xl text-black m-4'>Add Image</h1>
        </div>
        <form onSubmit={handleSubmit}>
        
          <div className='flex flex-col justify-start'>
            <label className='text-white-900' for="title">Choose a name:</label>
              <select className='w-2/3 rounded-xl' name="title" id="title" onChange={e => setImage({ ...image, title: e.target.value })} path={image.title}>
                <option  value="">--Please choose an option--</option>
                <option value="Grammer">Grammer</option>
                <option value="Bhakta">Bhakta</option>
                <option value="Hooks">Hooks</option>
              </select>
          </div>
          <div className="form-group my-2">
            <label path="imageBody">Description: optional</label>
            <input required="" className="form-control" onChange={e => setImage({ ...image, imageBody: e.target.value })} path={image.imageBody} name="imageBody" id="imageBody" type="text"/>
          </div>
          <FileBase64 
          type="file"
          multiple={false}
          required={true}
          onDone={({ base64 }) => setImage({ ...image, image: base64 })}
          />
          <button className='btn'>Submit</button>
        </form>
      </div>
    </div>
  )
}

