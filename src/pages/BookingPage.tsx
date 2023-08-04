import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Places } from "../Components/Types/placesInterface";
import Gallery from "./../Components/Gallery";
import AccountNavigation from "../Components/AccountNavigation";

const BookingPage = () => {
  const [booking, setBooking] = useState<Places>();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        response.data.forEach((element: { place: Places }) => {
          const { _id } = element.place;

          if (_id === id) setBooking(element.place);
        });
      });
    }
  }, [id]);

  if (!booking) return "";
  return (
    <div>
      <AccountNavigation />
      <div className="mt-8">
        <Gallery photos={booking.photos} title={booking.title} />
      </div>
    </div>
  );
};

export default BookingPage;
