import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const DisplayImg = () => {
  const [image, setImage] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);


  useEffect(() => {
      axios.get("http://localhost:8000/api/image")
        .then((res) => {
          console.log(res.data);
          setImage(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

  function getFilteredList() {
    // Avoid filter when selectedCategory is null
    if (!filteredImages) {
      return image;
    }
    return image.filter((image) => image.title === filteredImages);
  }

  // Avoid duplicate function calls with useMemo
  var filteredList = useMemo(getFilteredList, [filteredImages, image]);

  function handleNameChange(e) {
    setFilteredImages(e.target.value);
  }

  return (
    <div>
      <div className="w-full flex justify-center my-2">
        <label htmlFor="title" className="text-red-700 text-xl sm:text-4xl m-2">
          Choose a name:
        </label>
        <select
          className="rounded-2xl"
          name="title"
          id="title"
          onChange={handleNameChange}
        >
          <option value="">Select a Name</option>
          <option value="">All</option>
          <option value="Grammer">Grammer</option>
          <option value="Bhakta">Bhakta</option>
          <option value="Hooks">Hooks</option>
        </select>
      </div>
      <div className="masonry mb-10">
        {filteredList.map((image, index) => {
          return (
            <div className="item" key={index}>
              <Link to={"/image/" + image._id}>
                <img
                  src={image.image}
                  alt=" random imgee"
                  className="h-auto max-w-full rounded-lg"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayImg;
