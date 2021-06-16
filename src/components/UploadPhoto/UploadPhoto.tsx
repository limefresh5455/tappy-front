import "./UploadPhoto.scss"
import React, { useRef } from "react";
import { Button } from "react-bootstrap";

interface Props {
}


export const UploadPhoto: React.FC<Props> = (props) => {

  const imageUpload = useRef<HTMLInputElement>(null);

  const onUploadImageClick = () => {
    if (imageUpload && imageUpload.current) {
      imageUpload.current.click();
    }
  }


  return (
    <>
      <input className="image-upload-input" ref={imageUpload} type="file" />
      <Button 
        className="edit-profile-upload-photo__btn"
        onClick={onUploadImageClick}
      >Upload Photo</Button>
    </>  
  )
}