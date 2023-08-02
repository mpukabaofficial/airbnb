import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Places } from "../Components/Types/placesInterface";
import { perkIcons } from "../Components/FormComponents/PerksData";

const PlacePage = () => {
  const { id } = useParams();
  const path = "http://localhost:4000/uploads/";
  const [place, setPlace] = useState<Places>();
  const [showPhotos, setShowPhotos] = useState<boolean>(false);
  const [showPhoto, setShowPhoto] = useState<boolean>(false);
  const [showingPhoto, setShowingPhoto] = useState<string>("");
  useEffect(() => {
    if (!id) <Navigate to={"/"} />;
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  const address =
    place.address.city +
    ", " +
    place.address.state +
    ", " +
    place.address.country;

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

  function createPerks(perk: string): React.ReactNode {
    if (perkIcons.hasOwnProperty(perk)) {
      return (
        <div className="my-1 flex items-center gap-4 text-gray-500">
          <div>{perkIcons[perk]}</div>
          <h3 className="text-lg ">{perk}</h3>
        </div>
      );
    }
  }

  if (showPhoto) {
    return (
      <div className="absolute left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-80 p-40 backdrop-blur-2xl transition-all">
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
      <div className="absolute left-0 top-0 z-20 block h-screen w-full bg-white bg-opacity-80 p-40 backdrop-blur-2xl transition-all">
        <div className="m-auto max-w-[1024px]">
          <h1 className="mb-4 text-3xl">{"Pictures of " + place.title}</h1>
          <div className="  m-auto grid grid-cols-2 gap-2">
            {place?.photos?.length > 0 &&
              place.photos.map((photo) => (
                <button
                  key={place._id}
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
    <div className="py m-auto mt-4 flex max-w-[1024px] flex-col gap-8 px-8 py-6 transition-all">
      <div>
        <h1 className="text-3xl">{place.title}</h1>
        <a
          className="my-2 flex items-center font-semibold underline"
          target="_blank"
          href={"https://maps.google.com/?q=" + address}
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
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
          {address}
        </a>
      </div>
      <div className="relative">
        <div className="grid grid-cols-5 gap-2 overflow-hidden rounded-xl">
          {place?.photos &&
            place.photos.map((photo, index) => (
              <div className={photoDisplay(index)}>
                <img
                  className="w-full object-cover"
                  src={path + photo}
                  alt=""
                />
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
      <div className=" border-b px-8 pb-8">
        <h2 className="mb-2 text-2xl font-semibold">Check in and check out</h2>
        <div className="grid max-w-[400px] grid-cols-2">
          <div className="flex gap-1">
            <p>Check-in:</p>
            <p>{place.checkIn}</p>
          </div>
          <div className="flex gap-1">
            <p>Check-out:</p>
            <p>{place.checkOut}</p>
          </div>
        </div>
      </div>
      <div className="border-b px-8 pb-8">
        <h2 className="mb-2 text-2xl font-semibold">Description</h2>
        <p className="text-gray-600">{place.description}</p>
      </div>
      <div className="border-b px-8 pb-8">
        {place.perks.map((perk) => (
          <div>{createPerks(perk)}</div>
        ))}
      </div>
      <div className="border-b px-8 pb-8">
        <h2 className="mb-2 text-2xl font-semibold">Extra Info</h2>
        <p className="text-gray-600">{place.extraInfo}</p>
      </div>
    </div>
  );
};

export default PlacePage;
