import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Places } from "../Components/Types/placesInterface";
import { perkIcons } from "../Components/FormComponents/PerksData";
import BookingWidget from "../Components/BookingWidget";
import Gallery from "../Components/Gallery";

const PlacePage = () => {
  const { id } = useParams();

  const [place, setPlace] = useState<Places>();

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

  return (
    <div className="py m-auto mt-4 flex max-w-[1024px] flex-col gap-8 py-6 transition-all sm:px-8">
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
      <Gallery title={place.title} photos={place.photos} />

      <div className=" grid border-b pb-8 sm:px-8 lg:grid-cols-[10fr,9fr]">
        <div className="">
          <h2 className="mb-2 text-2xl font-semibold">
            Check in and check out
          </h2>
          <div className="grid max-w-[400px] grid-cols-1 md:grid-cols-2">
            <div className="flex gap-1">
              <p className="font-semibold">Check-in:</p>
              <p>{place.checkIn}</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold">Check-out:</p>
              <p>{place.checkOut}</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold">Max-Guests:</p>
              <p>{place.maxGuests + " guests"}</p>
            </div>
          </div>
        </div>
        <BookingWidget {...place} />
      </div>
      <div className="border-b pb-8 sm:px-8">
        <h2 className="mb-2 text-2xl font-semibold">Description</h2>
        <p className="text-gray-600">{place.description}</p>
      </div>
      <div className="border-b pb-8 sm:px-8">
        {place.perks.map((perk) => (
          <div>{createPerks(perk)}</div>
        ))}
      </div>
      <div className="border-b pb-8 sm:px-8">
        <h2 className="mb-2 text-2xl font-semibold">Extra Info</h2>
        <p className="text-gray-600">{place.extraInfo}</p>
      </div>
    </div>
  );
};

export default PlacePage;
