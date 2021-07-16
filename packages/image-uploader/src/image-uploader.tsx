import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import classNames from 'classnames';
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
    ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);
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
    rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270;
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
    reader.addEventListener('load', () => resolve(reader.result as string), false);
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

  const [croppedAreaPixelsArray, setCroppedAreaPixelsArray] = useState<Area[]>([]);
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

      const readyFiles = await Promise.all(readFilePromiseFns.map((promiseFn) => promiseFn()));

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

      const readyFiles = await Promise.all(readFilePromiseFns.map((promiseFn) => promiseFn()));

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
    <div className="image-uploader-container">
      {error && <p className="image-uploader-error">{error}</p>}
      <h1 className="image-uploader-add-new-images">Add new images</h1>
      <div {...getRootProps({ className: 'dropzone image-uploader-box-main-container' })}>
        <input
          {...getInputProps()}
          onChange={onFileChange}
          multiple={isMultiple ? true : undefined}
          accept="image/*"
        />
        {isDragActive ? (
          <div className="image-uploader-box-drag-container">
            <div className="image-uploader-box-drag-text-container">
              <p>Drag the files here...</p>
            </div>
            <svg
              className={classNames('image-uploader-box-drag-svg', {
                'image-uploader-box-drag-svg-drag-active': isDragActive === true,
              })}
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1"
              viewBox="0 0 48 48"
              enableBackground="new 0 0 48 48"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#8CBCD6"
                d="M40,41H8c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v26C44,39.2,42.2,41,40,41z"
              />
              <circle fill="#B3DDF5" cx="35" cy="16" r="3" />
              <polygon fill="#9AC9E3" points="20,16 9,32 31,32" />
              <polygon fill="#B3DDF5" points="31,22 23,32 39,32" />
              <circle fill="#43A047" cx="38" cy="38" r="10" />
              <g fill="#fff">
                <rect x="36" y="32" width="4" height="12" />
                <rect x="32" y="36" width="12" height="4" />
              </g>
            </svg>
          </div>
        ) : (
          <div className="image-uploader-box-container">
            <div className="image-uploader-box-text-container">
              <p>Drag and drop files here or click to upload</p>
            </div>
            <svg
              className="image-uploader-box-svg"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              version="1"
              viewBox="0 0 48 48"
              enableBackground="new 0 0 48 48"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#8CBCD6"
                d="M40,41H8c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v26C44,39.2,42.2,41,40,41z"
              />
              <circle fill="#B3DDF5" cx="35" cy="16" r="3" />
              <polygon fill="#9AC9E3" points="20,16 9,32 31,32" />
              <polygon fill="#B3DDF5" points="31,22 23,32 39,32" />
              <circle fill="#43A047" cx="38" cy="38" r="10" />
              <g fill="#fff">
                <rect x="36" y="32" width="4" height="12" />
                <rect x="32" y="36" width="12" height="4" />
              </g>
            </svg>
          </div>
        )}
      </div>
      {imageSources ? (
        <>
          <div className="image-uploader-image-sources-container">
            {!withCrop ? (
              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                modalClassName="image-uploader-image-sources-modal"
              >
                {isMultiple ? (
                  <SliderWithModal
                    startAtIndex={0}
                    itemsToShow={1}
                    itemsToScroll={1}
                    containerClassName="image-uploader-image-sources-modal-multiple-slider-container"
                  >
                    {imageSources.map((image, index) => (
                      <div
                        className="image-uploader-image-sources-modal-slider-generate-image-container"
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                      >
                        <div className="image-uploader-image-sources-modal-slider-generate-image-container-2">
                          {acceptedFiles && acceptedFiles[index] && (
                            <div className="image-uploader-image-sources-modale-slider-generate-image-accepted-files">
                              <h4>Feltöltött File:</h4>
                              <p key={acceptedFiles[index].name}>
                                {acceptedFiles[index].name} - {acceptedFiles[index].size} bytes
                              </p>
                            </div>
                          )}
                          <div className="image-uploader-image-sources-modal-slider-generate-image-cropper-container">
                            <Cropper
                              classes={{
                                mediaClassName:
                                  'image-uploader-image-sources-modal-slider-generate-image-cropper',
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
                                setCroppedAreaPixelsArray((prevCroppedAreaPixelsArray) => {
                                  const newCroppedAreaPixelsArray = [...prevCroppedAreaPixelsArray];

                                  newCroppedAreaPixelsArray[index] = croppedAreaPixels;

                                  return newCroppedAreaPixelsArray;
                                })
                              }
                            />
                          </div>
                          <div className="image-uploader-image-sources-modal-slider-generate-image-button-container">
                            <Button
                              className="image-uploader-image-sources-modal-slider-generate-image-button"
                              onClick={() => {
                                showCroppedImage(index);
                              }}
                            >
                              <svg
                                className="image-uploader-image-sources-modal-slider-generate-image-button-svg"
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 1024 1024"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M396 512a112 112 0 1 0 224 0 112 112 0 1 0-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
                              </svg>
                              Generate Image
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </SliderWithModal>
                ) : (
                  imageSources.map((image, index) => (
                    <div
                      className="image-uploader-image-sources-modal-slider-generate-image-container"
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                    >
                      <div className="image-uploader-image-sources-modal-slider-generate-image-container-2">
                        {acceptedFiles && acceptedFiles[index] && (
                          <div className="image-uploader-image-sources-modal-slider-generate-image-accepted-files">
                            <h4>Feltöltött File:</h4>
                            <p key={acceptedFiles[index].name}>
                              {acceptedFiles[index].name} - {acceptedFiles[index].size} bytes
                            </p>
                          </div>
                        )}
                        <div className="image-uploader-image-sources-modal-slider-generate-image-cropper-container">
                          <Cropper
                            classes={{
                              mediaClassName:
                                'image-uploader-image-sources-modal-slider-generate-image-cropper',
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
                              setCroppedAreaPixelsArray((prevCroppedAreaPixelsArray) => {
                                const newCroppedAreaPixelsArray = [...prevCroppedAreaPixelsArray];

                                newCroppedAreaPixelsArray[index] = croppedAreaPixels;

                                return newCroppedAreaPixelsArray;
                              })
                            }
                          />
                        </div>
                        <div className="image-uploader-image-sources-modal-slider-generate-image-button-container">
                          <Button
                            className="image-uploader-image-sources-modal-slider-generate-image-button"
                            onClick={() => {
                              showCroppedImage(index);
                            }}
                          >
                            <svg
                              className="image-uploader-image-sources-modal-slider-generate-image-button-svg"
                              stroke="currentColor"
                              fill="currentColor"
                              strokeWidth="0"
                              viewBox="0 0 1024 1024"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M396 512a112 112 0 1 0 224 0 112 112 0 1 0-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
                            </svg>
                            Kép létrehozása
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
              <div className="image-uploader-image-display-text-container">
                <p className="image-uploader-image-display-text">Preview</p>
              </div>
              {isMultiple ? (
                <SliderWithModal
                  startAtIndex={0}
                  itemsToShow={1}
                  itemsToScroll={1}
                  containerClassName="image-uploader-image-display-slider-with-modal"
                >
                  {images.map((image, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
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
                  <div key={index}>
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
