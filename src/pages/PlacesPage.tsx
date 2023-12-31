import { Link } from "react-router-dom";
import AccountNavigation from "../Components/AccountNavigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Places } from "../Components/Types/placesInterface";

const PlacesPage = () => {
  const [places, setPlaces] = useState<Places[]>([]);
  const path = "http://localhost:4000/uploads/";
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNavigation />

      <div>
        <div className="my-10 flex max-w-full justify-center text-xl">
          <Link
            className=" flex items-center justify-center rounded-full px-6 py-2 text-primary hover:bg-primary  hover:text-white"
            to={"/account/places/new"}
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Place
          </Link>
        </div>
        <div className="m-auto mt-4 max-w-4xl">
          {places.length > 0 &&
            places.map((place) => (
              <Link
                to={"/account/places/" + place._id}
                key={place._id}
                className="my-2 flex gap-4 rounded-2xl bg-gray-100 p-4 hover:bg-gray-200"
              >
                <div className="h-32 w-32 shrink-0 overflow-hidden rounded-lg bg-gray-300">
                  <img
                    className="h-full w-full object-cover"
                    src={path + place.photos[0]}
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm ">
                    {place.description}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PlacesPage;
