import React, { useState, useEffect } from 'react';
import InputComponent from './InputComponent';
const ImageUploader = ({ currentImage, text, name, register, validation }) => {
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (currentImage) {
      const objectUrl = URL.createObjectURL(currentImage);
      setPreviewImage(objectUrl);
    }
  }, [currentImage]);


  return (
    <div>
        <label htmlFor="file">{text}</label>
      <InputComponent 
      type="file" 
      name={name}
      accept="image/*" 
      register={register}
      validation={validation}
      />
      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          className="max-w-full mb-4 w-full h-24"
        />
      )}
    </div>
  );
};

export default ImageUploader;
