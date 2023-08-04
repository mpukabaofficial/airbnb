import React, { useState } from "react";
import { Places } from "./Types/placesInterface";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

const BookingWidget = (place: Places) => {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState<number | undefined>();
  const [redirect, setRedirect] = useState(false);
  const [redirectDest, setRedirectDest] = useState("");

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const totalPrice = parseInt(place.price) * numberOfNights;

  function dropdown(): React.ReactNode[] {
    let list: React.ReactNode[] = [];
    if (!place) return list;
    for (let i = 1; i <= place?.maxGuests; i++) {
      if (i === 1) {
        list.push(
          <option key={i} value={i}>
            {i} guest
          </option>
        );
      } else {
        list.push(
          <option key={i} value={i}>
            {i} guests
          </option>
        );
      }
    }
    return list;
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(event.target.value);
    setNumberOfGuests(selectedValue);
  };

  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      place: place._id,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      totalPrice,
    });
    const bookingId = response.data._id;
    setRedirect(true);
    setRedirectDest(`/account/bookings/${bookingId}`);
  }

  if (redirect) return <Navigate to={redirectDest} />;

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:relative sm:w-[400px] md:my-4">
      <div className="rounded-2xl bg-white p-4 text-lg shadow">
        <p>Price: ${place.price} per night</p>
        <div className="my-4 rounded-xl border">
          <div className="flex border-b">
            <div className=" border-r px-4 py-2">
              <label className="text-xs font-semibold" htmlFor="checkIn">
                CheckIn
              </label>
              <input
                onChange={(event) => setCheckIn(event.target.value)}
                type="date"
                name="checkIn"
                id=""
                placeholder="select a date"
                value={checkIn}
              />
            </div>
            <div className=" px-4 py-2">
              <label className="text-xs font-semibold" htmlFor="checkOut">
                CheckOut
              </label>
              <input
                type="date"
                name="checkOut"
                id=""
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
              />
            </div>
          </div>
          <div className=" py-2">
            <select
              className="border-none bg-white px-4 py-2"
              name="numberOfGuests"
              id=""
              onChange={handleChange}
            >
              {dropdown()}
            </select>
          </div>
          <div>
            {numberOfNights > 0 && (
              <form className="border-t p-2">
                <label className="mx-2 font-semibold" htmlFor="name">
                  Name:
                </label>
                <input
                  value={name}
                  type="text"
                  name="name"
                  id=""
                  placeholder="Name"
                  onChange={(event) => setName(event?.target.value)}
                />
                <label className="mx-2 font-semibold" htmlFor="name">
                  Phone:
                </label>
                <input
                  value={phone}
                  type="tel"
                  name="number"
                  id=""
                  placeholder="(000) 000 0000"
                  className="appearance-none bg-white px-4 py-2"
                  onWheel={(e) => e.currentTarget.blur()}
                  style={{ MozAppearance: "textfield" }}
                  onChange={(event) => setPhone(parseInt(event?.target.value))}
                />
              </form>
            )}
          </div>
        </div>

        <div>
          {numberOfNights > 0 && (
            <div className="my-4 border p-2">
              <div className="border-b">
                <p className="p-1 font-semibold">Total Price for your stay</p>
              </div>
              <div className="px-4 py-2">
                <div className="font flex justify-between text-sm">
                  <p>Nights: </p>
                  <p>{numberOfNights} nights</p>
                </div>
                <div className="font flex justify-between text-sm">
                  <p>Guests: </p>
                  <p>
                    {numberOfGuests} {numberOfGuests === 1 ? "guest" : "guests"}
                  </p>
                </div>
                <div className="font mt-2 flex justify-between border-t">
                  <p>Total: </p>
                  <p>${totalPrice}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <button className="primary" onClick={bookThisPlace}>
          Book
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
