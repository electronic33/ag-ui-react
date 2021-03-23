import React, { useState, useCallback, Fragment } from "react";
import Cropper from "react-easy-crop";
import { FcAddImage } from "react-icons/fc";
import classNames from "classnames";
import { AiFillEye } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import { Button } from "@app-garage/button";
import { Modal } from "@app-garage/modal";
import { Slider } from "@app-garage/slider";

const initialCropPosition = { x: 0, y: 0 };

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { width: number; height: number; x: number; y: number},
  rotation = 0,
  type = "image/jpeg",
) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

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

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, type);
  });
}

export async function getRotatedImage(imageSrc, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

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

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, "image/jpeg");
  });
}

const readFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
};
type ImageUploaderTypes = {
  images: string[];
  setImages: (images: string[]) => void;
  multipleImages?: boolean;
  aspectRatio?: number;
  withoutCrop?: boolean;
  onlyWithCrop?: boolean;
  error?: string;
}

export const ImageUploader = ({
  /**
   An array where the images will be pushed.
  */
  images = [],
  setImages,
  multipleImages = false,
  aspectRatio = 4 / 4,
  /**
   Skip the cropping step.
  */
  withoutCrop = false,
  /**
   Only push the cropped images to the images array.
  */
  onlyWithCrop = false,
  error,
}: ImageUploaderTypes): React.ReactElement => {
  const [imageSources, setImageSources] = useState([]);
  const [cropPositions, setCropPositions] = useState([]);
  const [croppedAreaPixelsArray, setCroppedAreaPixelsArray] = useState([]);
  const [zoom, setZoom] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [acceptedFiles, setAcceptedFiles] = useState([]);

  const showCroppedImage = useCallback(
    async (index) => {
      try {
        const croppedImage = await getCroppedImg(
          imageSources[index],
          croppedAreaPixelsArray[index],
          0,
          acceptedFiles[index].type,
        );

        const newImages = [...images];

        newImages[index] = croppedImage;

        setImages(newImages);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    },
    [setImages, images, imageSources, croppedAreaPixelsArray],
  );

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const { files } = e.target;
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

      if (!onlyWithCrop) setImages(readyFiles);
      if (!withoutCrop) {
        setIsModalOpen(true);
      }
    }
  };

  const onDrop = useCallback(async (files) => {
    if (files && files.length > 0) {
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

      if (!onlyWithCrop) setImages(readyFiles);
      if (!withoutCrop) {
        setIsModalOpen(true);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col items-center justify-center mb-10 bg-white p-2 640:p-10 rounded shadow-xl">
      {error && (
        <p className="text-center text-lg font-semibold mb-4 text-red-600">
          {error}
        </p>
      )}
      <h1 className="flex uppercase font-bold text-lg text-gray-400 mb-10">
        Új Képek hozzáadása
      </h1>
      <div
        onChange={onFileChange}
        {...getRootProps({ className: "dropzone mb-5 outline-none" })}
      >
        {multipleImages ? (
          <input
            {...getInputProps()}
            onChange={onFileChange}
            accept="image/*"
          />
        ) : (
          <input
            {...getInputProps()}
            onChange={onFileChange}
            multiple={false}
            accept="image/*"
          />
        )}
        {isDragActive ? (
          <div className="flex flex-col items-center border-2 border-dashed border-gray-200 h-50 w-64 640:w-96 rounded">
            <div className=" flex justify-center items-center p-4 h-20 w-full text-base font-semibold text-gray-500 text-center bg-blue-100">
              <p> HÚZD IDE A FÁJLOKAT...</p>
            </div>
            <FcAddImage
              className={classNames(" my-auto text-8xl", {
                "transition-all duration-200 hover:scale-200":
                  isDragActive === true,
              })}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center border-2 overflow-hidden border-dashed border-gray-200 h-50 w-64 640:w-96 rounded-lg shadow">
            <div className=" flex justify-center items-center p-4 h-20 w-full text-base font-semibold text-gray-50 text-center bg-blue-500">
              <p>HÚZD IDE A FÁJLT ÉS ENGEDD EL VAGY KATTINTS</p>
            </div>
            <FcAddImage className="text-7xl my-auto" />
          </div>
        )}
      </div>

      {imageSources ? (
        <Fragment>
          <div className=" mb-3 flex flex-col items-center h-full ">
            {!withoutCrop && isModalOpen ? (
              <Modal
                onClose={() => setIsModalOpen(false)}
                className="flex flex-col items-center justify-center h-full"
              >
                {multipleImages ? (
                  <Slider
                    startAtIndex={0}
                    itemsToShow={1}
                    itemsToScroll={1}
                    className="w-screen m-auto h-full"
                  >
                    {imageSources.map((image, index) => (
                      <div className="w-full h-full" key={image}>
                        <div className="flex flex-col justify-center items-center h-full">
                          {acceptedFiles && acceptedFiles[index] && (
                            <div className="flex flex-col items-center w-max py-2 bg-blue-100 text-gray-500 text-sm rounded-lg px-4 mb-10">
                              <h4>Feltöltött File:</h4>
                              <p key={acceptedFiles[index].name}>
                                {acceptedFiles[index].name} -{" "}
                                {acceptedFiles[index].size} bytes
                              </p>
                            </div>
                          )}
                          <div className="relative w-72 h-48 640:w-96 640:h-4/6">
                            <Cropper
                              classes={{
                                containerClassName: "  ",
                                mediaClassName: " bg-black ",
                                cropAreaClassName: "",
                              }}
                              // disableAutomaticStylesInjection
                              image={image}
                              crop={cropPositions[index] || initialCropPosition}
                              zoom={zoom}
                              onZoomChange={!withoutCrop && setZoom}
                              aspect={aspectRatio}
                              onCropChange={(newCropPosition) =>
                                !withoutCrop &&
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
                                // setIsModalOpen(false);
                              }}
                            >
                              <AiFillEye className="mr-2" /> Kép létrehozása
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <>
                    {imageSources.map((image, index) => (
                      <div className="w-full h-full" key={image}>
                        <div className="flex flex-col justify-center items-center h-full">
                          {acceptedFiles && acceptedFiles[index] && (
                            <div className="flex flex-col items-center w-max py-2 bg-blue-100 text-gray-500 text-sm rounded-lg px-4 mb-10">
                              <h4>Feltöltött File:</h4>
                              <p key={acceptedFiles[index].name}>
                                {acceptedFiles[index].name} -{" "}
                                {acceptedFiles[index].size} bytes
                              </p>
                            </div>
                          )}
                          <div className="relative w-72 h-48 640:w-96 640:h-4/6">
                            <Cropper
                              classes={{
                                containerClassName: "  ",
                                mediaClassName: " bg-black ",
                                cropAreaClassName: "",
                              }}
                              // disableAutomaticStylesInjection
                              image={image}
                              crop={cropPositions[index] || initialCropPosition}
                              zoom={zoom}
                              onZoomChange={!withoutCrop && setZoom}
                              aspect={aspectRatio}
                              onCropChange={(newCropPosition) =>
                                !withoutCrop &&
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
                                // setIsModalOpen(false);
                              }}
                            >
                              <AiFillEye className="mr-2" /> Kép létrehozása
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}{" "}
                  </>
                )}
              </Modal>
            ) : null}
          </div>

          {images && images[0] && (
            <>
              <div className="flex flex-col justify-center items-center">
                <p className="text-xl text-gray-500 rounded-t-3xl shadow font-semibold bg-blue-100 px-8 py-1">
                  ELŐNÉZET
                </p>
              </div>
              {multipleImages ? (
                <Slider
                  startAtIndex={0}
                  itemsToShow={1}
                  itemsToScroll={1}
                  className="w-2/6 "
                >
                  {images.map((image) => (
                    <div key={image} className={classNames("")}>
                      <img
                        className="object-contain"
                        style={{ width: 384, height: 216 }}
                        src={image}
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <>
                  {images.map((image) => (
                    <div key={image} className={classNames("")}>
                      <img
                        className="object-contain"
                        style={{ width: 384, height: 216 }}
                        src={image}
                      />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </Fragment>
      ) : null}
    </div>
  );
};


