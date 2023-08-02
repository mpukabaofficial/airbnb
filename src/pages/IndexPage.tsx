import axios from "axios";
import { useEffect, useState } from "react";
import { Places } from "../Components/Types/placesInterface";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState<Places[]>([]);
  const path = "http://localhost:4000/uploads/";

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([...response.data, ...response.data]);
    });
  });

  return (
    <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {places.length > 0 &&
        places.map((place) => (
          <Link className=" flex flex-col gap-1" to={"/place/" + place._id}>
            <div className="flex aspect-square rounded-2xl bg-gray-500">
              {place.photos?.[0] && (
                <img
                  className="rounded-2xl object-cover"
                  src={path + place.photos[0]}
                  alt=""
                />
              )}
            </div>
            <h3 className="truncate text-sm font-bold">
              {place.address.city +
                ", " +
                place.address.state +
                ", " +
                place.address.country}
            </h3>
            <h2 className="truncate text-sm">{place.title}</h2>
            <div>
              <span className="font-bold">{"$" + place.price + " "}</span>
              per night
            </div>
          </Link>
        ))}
    </div>
  );
};

export default IndexPage;
