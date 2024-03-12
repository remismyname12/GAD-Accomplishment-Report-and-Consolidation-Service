import { MinusCircleIcon } from '@heroicons/react/20/solid';
import React, { useState, useRef } from 'react';

export default function AddImages({ onImagesChange }) {
  const [images, setImages] = useState([]);
  const inputRef = useRef(null);

  const handleImageChange = (event) => {
    const selectedImages = event.target.files;

    const uniqueImages = Array.from(selectedImages).filter(
      (newImage) => !images.some((existingImage) => existingImage.name === newImage.name)
    );

    setImages((prevImages) => [...prevImages, ...uniqueImages]);

    const formData = new FormData();
    images.forEach((image) => formData.append('images[]', image));
    onImagesChange(formData);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const droppedFiles = event.dataTransfer.files;

    const uniqueFiles = Array.from(droppedFiles).filter(
      (newFile) => !images.some((existingImage) => existingImage.name === newFile.name)
    );

    setImages((prevImages) => [...prevImages, ...uniqueFiles]);

    const formData = new FormData();
    uniqueFiles.forEach((file) => formData.append('images[]', file));
    onImagesChange(formData);

    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    const formData = new FormData();
    updatedImages.forEach((image) => formData.append('images[]', image));

    onImagesChange(formData);
  };

  const handleClick = () => inputRef.current && inputRef.current.click();

  return (
    <div className='w-100%' style={{ textAlign: 'center' }}>
      <div
        className='p-5 border-dashed border-2 border-sky-500 w-100%'
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          ref={inputRef}
          type="file"
          id="imageInput"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          style={{ display: 'none', width: '100%' }}
        />
        <button type="button" onClick={handleClick}>Choose Image</button>
        {images.length > 0 && (
          <div>
            {images.map((image, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <img src={URL.createObjectURL(image)} alt={`Selected Image ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                <button onClick={() => handleRemoveImage(index)}>
                  <MinusCircleIcon className="w-6 h-6 text-red-500 cursor-pointer transform transition-transform hover:scale-125" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
