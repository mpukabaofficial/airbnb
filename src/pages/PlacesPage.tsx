import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
interface Address {
  street: string;
  specific: string;
  zipCode: number;
  city: string;
  state: string;
  country: string;
}

interface YourFormData {
  owner: string; // Assuming the owner is represented by a user ID as a string
  title: string;
  address: Address;
  photos: string[];
  description: string;
  perks: string[];
  extraInfo: string;
  checkIn: number;
  checkOut: number;
}

const initialFormValues: YourFormData = {
  owner: "",
  title: "",
  address: {
    street: "",
    specific: "",
    zipCode: 0,
    city: "",
    state: "",
    country: "",
  },
  photos: [],
  description: "",
  perks: [],
  extraInfo: "",
  checkIn: 0,
  checkOut: 0,
};

const PlacesPage = () => {
  const { action } = useParams();
  return (
    <div>
      {action !== "new" && (
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
          <div>myplaces</div>
        </div>
      )}
      {/* the forms starts here */}
      {action === "new" && (
        <form className="mx-auto my-10 max-w-2xl">
          <h2 className="input-header">Title</h2>
          <h3 className="input-subheading">
            The title for your place should be short catchy
          </h3>
          <input placeholder="Title here" type="text" name="title" />

          <div className="mt-8">
            <h2 className="input-header">Address</h2>
            <h3 className="input-subheading">Address to this place</h3>
            <input
              placeholder="Street address"
              type="text"
              name="address.street"
            />
            <input
              placeholder="Apartment no, building, room, ..."
              type="text"
              name="address.specific"
            />

            <input placeholder="Town/City" type="text" name="address.city" />
            <input placeholder="ZipCode" type="number" name="address.zipCode" />
            <input placeholder="State" type="text" name="address.state" />
            <input placeholder="Country" type="text" name="address.country" />
          </div>
          {/* photos */}
          <h2 className="input-header mt-8">Photos</h2>
          <h3 className="input-subheading">The more the better</h3>
          <div>
            <input placeholder="Add using a link" type="text" name="photos" />
          </div>
          <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <button className="rounded-2xl border bg-transparent p-4 text-2xl text-gray-600">
              +
            </button>
          </div>

          <textarea name="description" />

          <h2 className="input-header">Title</h2>
          <h3 className="input-subheading">Subheading</h3>
          <input placeholder="Title here" type="text" name="perks" />

          <textarea name="extraInfo" />

          <h2 className="input-header">Title</h2>
          <h3 className="input-subheading">Subheading</h3>
          <input placeholder="Title here" type="number" name="checkIn" />

          <h2 className="input-header">Title</h2>
          <h3 className="input-subheading">Subheading</h3>
          <input placeholder="Title here" type="number" name="checkOut" />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default PlacesPage;
