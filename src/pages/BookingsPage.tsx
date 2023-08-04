import { useEffect, useState } from "react";
import AccountNavigation from "../Components/AccountNavigation";
import axios from "axios";
import { Link } from "react-router-dom";
import { Places } from "../Components/Types/placesInterface";
import { differenceInCalendarDays, format } from "date-fns";

interface Booking {
  place: Places;
  checkIn: Date;
  checkOut: Date;
  numberOfGuests: number;
  name: string;
  phone: number;
  totalPrice: number;
}

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [ready, setReady] = useState(false);
  const path = "http://localhost:4000/uploads/";

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
      setReady(true);
    });
  }, []);

  if (ready && bookings.length <= 0) {
    return (
      <div>
        <AccountNavigation />

        <div className="flex h-screen flex-col items-center p-20">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-[300px] w-[300px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
          </div>
          <h2 className="">You have no bookings at this moment</h2>
          <Link className="p-2 text-center text-primary underline" to={"/"}>
            Click here to explore places
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AccountNavigation />
      <div className="mx-auto mt-8 flex max-w-[1024px] flex-wrap justify-center gap-4">
        {bookings?.length > 0 &&
          bookings?.map((booking) => (
            <Link
              to={"/account/bookings/" + booking.place._id}
              className=" h-[450px] max-w-[400px] overflow-hidden rounded-xl border shadow-md"
            >
              <div className="">
                {booking.place.photos.length > 0 && (
                  <div className="flex aspect-video h-auto w-full">
                    <img
                      src={path + booking?.place?.photos[0]}
                      alt={booking.place.title}
                      className="w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <div className=" px-8 py-4">
                <div className="text-center">
                  <h1 className="mb-4 text-2xl">{booking.place.title}</h1>
                </div>
                <div className="">
                  <div>
                    <h2>Name: {booking.name}</h2>
                  </div>
                  <div>
                    <h2>
                      Date: {format(new Date(booking.checkIn), "yyyy-MM-dd")} to{" "}
                      {format(new Date(booking.checkOut), "yyyy-MM-dd")}
                      {" ("}
                      {differenceInCalendarDays(
                        new Date(booking.checkOut),
                        new Date(booking.checkIn)
                      )}{" "}
                      nights{") "}
                    </h2>
                  </div>
                  <div>
                    <h2>
                      Address:{" "}
                      {booking.place.address.city +
                        ", " +
                        booking.place.address.country}
                    </h2>
                  </div>
                  <div>
                    <h2>Total Price: ${booking.totalPrice}</h2>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
