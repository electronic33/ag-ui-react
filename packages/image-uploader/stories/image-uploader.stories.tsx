import React, { useState } from 'react';
import { ImageUploader } from '../src';

export default {
  title: 'OTHERS/ImageUploader',
  component: ImageUploader,
};

export const Default = (props): React.ReactNode => {
  const [images, setImages] = useState([]);
  return (
    <ImageUploader
      {...props}
      setImages={(newImages) => setImages(newImages)}
      images={images}
      // error={touched?.newImages && errors?.newImages}
    />
  );
};
