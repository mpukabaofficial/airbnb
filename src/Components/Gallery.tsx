import { useState } from "react";
interface Props {
  photos: string[];
  title: string;
}

const Gallery = ({ photos, title }: Props) => {
  const [showPhotos, setShowPhotos] = useState<boolean>(false);
  const [showPhoto, setShowPhoto] = useState<boolean>(false);
  const [showingPhoto, setShowingPhoto] = useState<string>("");
  const path = "http://localhost:4000/uploads/";
  function photoDisplay(index: number): string {
    let classes = "flex";

    if (index === 0) {
      classes += " col-span-5 aspect-video ";
    } else if (index > 5) {
      classes = "hidden";
    } else {
      classes += " aspect-square ";
    }

    return classes;
  }

  if (showPhoto) {
    return (
      <div className="absolute left-0 top-0 z-50 flex h-screen w-full items-center justify-center  bg-black bg-opacity-80 backdrop-blur-2xl transition-all md:p-40">
        <img src={path + showingPhoto} alt="" />
        <button
          onClick={() => setShowPhoto(false)}
          className="z-60 fixed right-10 top-10 bg-opacity-0 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-10 w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    );
  }

  if (showPhotos) {
    return (
      <div className="absolute left-0 top-0 z-20 block h-screen w-full bg-white bg-opacity-80 p-4 backdrop-blur-2xl transition-all md:p-40">
        <div className="m-auto max-w-[1024px]">
          <h1 className="mb-4 text-3xl">{"Pictures of " + title}</h1>
          <div className="  m-auto grid grid-cols-2 gap-2">
            {photos?.length > 0 &&
              photos.map((photo) => (
                <button
                  key={photo}
                  onClick={() => {
                    setShowingPhoto(photo);
                    setShowPhoto(true);
                  }}
                  className="flex aspect-square"
                >
                  <img
                    className="z-40 w-full object-cover"
                    src={path + photo}
                    alt=""
                  />
                </button>
              ))}
            <button
              onClick={() => setShowPhotos(false)}
              className="fixed right-10 top-10 z-50 bg-opacity-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-10 w-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative">
      <div className="grid grid-cols-5 gap-2 overflow-hidden rounded-xl">
        {photos &&
          photos.map((photo, index) => (
            <div className={photoDisplay(index)}>
              <img className="w-full object-cover" src={path + photo} alt="" />
            </div>
          ))}
      </div>
      <button
        onClick={() => setShowPhotos(true)}
        className="absolute bottom-4 right-2 z-10 flex items-center justify-center gap-1 rounded-md bg-white px-4 py-2 shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
};

export default Gallery;
