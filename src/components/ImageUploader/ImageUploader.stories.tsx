import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import "../../styles/index.css";

export default {
  title: "ImageUploader",
  component: ImageUploader,
};

export const Default = (props): React.ReactNode => {
  const [images, setImages] = useState([]);
  return (
    <ImageUploader
      {...props}
      setImages={(images) => setImages(images)}
      images={images}
      // error={touched?.newImages && errors?.newImages}
    />
  );
};
