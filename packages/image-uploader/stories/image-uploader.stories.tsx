import React, { useState } from 'react';
import { ImageUploader } from '../src';

export default {
  title: 'OTHERS/ImageUploader',
  component: ImageUploader,
};

export const Default = () => {
  const [images, setImages] = useState<string[]>([]);

  return (
    <ImageUploader
      setImages={(newImages) => setImages(newImages)}
      images={images}
    />
  );
};
