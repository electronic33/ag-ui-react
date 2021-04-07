import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import { FcAddImage } from 'react-icons/fc';
import classNames from 'classnames';
import { AiFillEye } from 'react-icons/ai';
import { useDropzone } from 'react-dropzone';
import { Button } from '@app-garage/button';
import { Modal } from '@app-garage/modal';
import { SliderWithModal } from '@app-garage/slider';
import { Area, Point } from 'react-easy-crop/types';

const initialCropPosition = { x: 0, y: 0 };

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

const getRadianAngle = (degreeValue: number) => (degreeValue * Math.PI) / 180;

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { width: number; height: number; x: number; y: number },
  rotation = 0,
  type = 'image/jpeg',
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  if (ctx) {
    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // draw rotated image and store data.
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5,
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
    );
    // As Base64 string
    // return canvas.toDataURL('image/jpeg');
  }

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, type);
  });
};

export async function getRotatedImage(imageSrc: string, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const orientationChanged =
    rotation === 90 ||
    rotation === -90 ||
    rotation === 270 ||
    rotation === -270;
  if (orientationChanged) {
    canvas.width = image.height;
    canvas.height = image.width;
  } else {
    canvas.width = image.width;
    canvas.height = image.height;
  }
  if (ctx) {
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
  }

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, 'image/jpeg');
  });
}

const readFile = (file: File) =>
  new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => resolve(reader.result as string),
      false,
    );
    reader.readAsDataURL(file);
  });

type ImageUploaderTypes = {
  images: string[];
  setImages: (images: string[]) => void;
  isMultiple?: boolean;
  aspectRatio?: number;
  withCrop?: boolean;
  onlyWithCrop?: boolean;
  error?: string;
};

export const ImageUploader = ({
  images = [],
  setImages,
  isMultiple = false,
  aspectRatio = 1,
  withCrop = true,
  onlyWithCrop = false,
  error,
}: ImageUploaderTypes): React.ReactElement => {
  const [imageSources, setImageSources] = useState<string[]>([]);
  const [cropPositions, setCropPositions] = useState<Point[]>([]);

  const [croppedAreaPixelsArray, setCroppedAreaPixelsArray] = useState<Area[]>(
    [],
  );
  const [zoom, setZoom] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

  const showCroppedImage = async (index: number) => {
    try {
      const croppedImage = await getCroppedImg(
        imageSources[index],
        croppedAreaPixelsArray[index],
        0,
        (acceptedFiles[index] as File).type,
      );

      const newImages = [...images];

      newImages[index] = croppedImage;

      setImages(newImages);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const { files } = event.target;
      const newFiles = [];
      const readFilePromiseFns = [];

      for (let i = 0; i < files.length; i += 1) {
        readFilePromiseFns.push(() => readFile(files[i]));
        newFiles.push(files[i]);
      }

      const readyFiles = await Promise.all(
        readFilePromiseFns.map((promiseFn) => promiseFn()),
      );

      setAcceptedFiles(newFiles);
      setImageSources(readyFiles);

      if (!onlyWithCrop) {
        setImages(readyFiles);
      }

      if (!withCrop) {
        setIsModalOpen(true);
      }
    }
  };

  const onDrop = async (newAcceptedFiles: File[]) => {
    if (newAcceptedFiles && newAcceptedFiles.length > 0) {
      const newFiles: File[] = [];
      const readFilePromiseFns: (() => Promise<string>)[] = [];

      newAcceptedFiles.forEach((acceptedFile) => {
        readFilePromiseFns.push(() => readFile(acceptedFile));
        newFiles.push(acceptedFile);
      });

      const readyFiles = await Promise.all(
        readFilePromiseFns.map((promiseFn) => promiseFn()),
      );

      setAcceptedFiles(newFiles);
      setImageSources(readyFiles);

      if (!onlyWithCrop) {
        setImages(readyFiles);
      }

      if (!withCrop) {
        setIsModalOpen(true);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col items-center justify-center mb-10 bg-white p-2 640:p-10 rounded shadow-xl">
      {error && (
        <p className="text-center text-lg font-semibold mb-4 text-red-600">
          {error}
        </p>
      )}
      <h1 className="flex uppercase font-bold text-lg text-gray-400 mb-10">
        Add new images
      </h1>
      <div {...getRootProps({ className: 'dropzone mb-5 outline-none' })}>
        <input
          {...getInputProps()}
          onChange={onFileChange}
          multiple={isMultiple ? true : undefined}
          accept="image/*"
        />
        {isDragActive ? (
          <div className="flex flex-col items-center border-2 border-dashed border-gray-200 h-50 w-64 640:w-96 rounded">
            <div className="flex justify-center items-center p-4 h-20 w-full text-base font-semibold text-gray-500 text-center bg-blue-100">
              <p>Drag the files here...</p>
            </div>
            <FcAddImage
              className={classNames('my-auto text-8xl', {
                'transition-all duration-200 hover:scale-200':
                  isDragActive === true,
              })}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center border-2 overflow-hidden border-dashed border-gray-200 h-50 w-64 640:w-96 rounded-lg shadow">
            <div className="flex justify-center items-center p-4 h-20 w-full text-base font-semibold text-gray-50 text-center bg-blue-500">
              <p>Drag and drop files here or click to upload</p>
            </div>
            <FcAddImage className="text-7xl my-auto" />
          </div>
        )}
      </div>
      {imageSources ? (
        <>
          <div className="mb-3 flex flex-col items-center h-full ">
            {!withCrop ? (
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                modalClassName="flex flex-col items-center justify-center h-full"
              >
                {isMultiple ? (
                  <SliderWithModal
                    startAtIndex={0}
                    itemsToShow={1}
                    itemsToScroll={1}
                    className="w-screen m-auto h-full"
                  >
                    {imageSources.map((image, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div className="w-full h-full" key={index}>
                        <div className="flex flex-col justify-center items-center h-full">
                          {acceptedFiles && acceptedFiles[index] && (
                            <div className="flex flex-col items-center w-max py-2 bg-blue-100 text-gray-500 text-sm rounded-lg px-4 mb-10">
                              <h4>Feltöltött File:</h4>
                              <p key={acceptedFiles[index].name}>
                                {acceptedFiles[index].name} -{' '}
                                {acceptedFiles[index].size} bytes
                              </p>
                            </div>
                          )}
                          <div className="relative w-72 h-48 640:w-96 640:h-4/6">
                            <Cropper
                              classes={{
                                mediaClassName: 'bg-gray-900',
                              }}
                              image={image}
                              crop={cropPositions[index] || initialCropPosition}
                              zoom={zoom}
                              onZoomChange={!withCrop && setZoom}
                              aspect={aspectRatio}
                              onCropChange={(newCropPosition) =>
                                !withCrop &&
                                setCropPositions((prevCropPositions) => {
                                  const newCropPositions = [
                                    ...prevCropPositions,
                                  ];

                                  newCropPositions[index] = newCropPosition;

                                  return newCropPositions;
                                })
                              }
                              onCropComplete={(_, croppedAreaPixels) =>
                                setCroppedAreaPixelsArray(
                                  (prevCroppedAreaPixelsArray) => {
                                    const newCroppedAreaPixelsArray = [
                                      ...prevCroppedAreaPixelsArray,
                                    ];

                                    newCroppedAreaPixelsArray[
                                      index
                                    ] = croppedAreaPixels;

                                    return newCroppedAreaPixelsArray;
                                  },
                                )
                              }
                            />
                          </div>
                          <div className="flex justify-center mb-2 mt-2">
                            <Button
                              className="mt-2"
                              onClick={() => {
                                showCroppedImage(index);
                              }}
                            >
                              <AiFillEye className="mr-2" />
                              Generate Image
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </SliderWithModal>
                ) : (
                  imageSources.map((image, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div className="w-full h-full" key={index}>
                      <div className="flex flex-col justify-center items-center h-full">
                        {acceptedFiles && acceptedFiles[index] && (
                          <div className="flex flex-col items-center w-max py-2 bg-blue-100 text-gray-500 text-sm rounded-lg px-4 mb-10">
                            <h4>Feltöltött File:</h4>
                            <p key={acceptedFiles[index].name}>
                              {acceptedFiles[index].name} -{' '}
                              {acceptedFiles[index].size} bytes
                            </p>
                          </div>
                        )}
                        <div className="relative w-72 h-48 640:w-96 640:h-4/6">
                          <Cropper
                            classes={{
                              mediaClassName: 'bg-gray-900',
                            }}
                            image={image}
                            crop={cropPositions[index] || initialCropPosition}
                            zoom={zoom}
                            onZoomChange={!withCrop && setZoom}
                            aspect={aspectRatio}
                            onCropChange={(newCropPosition) =>
                              !withCrop &&
                              setCropPositions((prevCropPositions) => {
                                const newCropPositions = [...prevCropPositions];

                                newCropPositions[index] = newCropPosition;

                                return newCropPositions;
                              })
                            }
                            onCropComplete={(_, croppedAreaPixels) =>
                              setCroppedAreaPixelsArray(
                                (prevCroppedAreaPixelsArray) => {
                                  const newCroppedAreaPixelsArray = [
                                    ...prevCroppedAreaPixelsArray,
                                  ];

                                  newCroppedAreaPixelsArray[
                                    index
                                  ] = croppedAreaPixels;

                                  return newCroppedAreaPixelsArray;
                                },
                              )
                            }
                          />
                        </div>
                        <div className="flex justify-center mb-2 mt-2">
                          <Button
                            className="mt-2"
                            onClick={() => {
                              showCroppedImage(index);
                            }}
                          >
                            <AiFillEye className="mr-2" /> Kép létrehozása
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </Modal>
            ) : null}
          </div>
          {images && images[0] && (
            <>
              <div className="flex flex-col justify-center items-center">
                <p className="text-xl text-gray-500 rounded-t-3xl shadow font-semibold bg-blue-100 px-8 py-1">
                  Preview
                </p>
              </div>
              {isMultiple ? (
                <SliderWithModal
                  startAtIndex={0}
                  itemsToShow={1}
                  itemsToScroll={1}
                  className="w-2/6 "
                >
                  {images.map((image, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index} className={classNames('')}>
                      <img
                        alt={`cropped-preview-${index}`}
                        className="object-contain"
                        style={{ width: 384, height: 216 }}
                        src={image}
                      />
                    </div>
                  ))}
                </SliderWithModal>
              ) : (
                images.map((image, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index} className={classNames('')}>
                    <img
                      alt={`cropped-preview-${index}`}
                      className="object-contain"
                      style={{ width: 384, height: 216 }}
                      src={image}
                    />
                  </div>
                ))
              )}
            </>
          )}
        </>
      ) : null}
    </div>
  );
};
