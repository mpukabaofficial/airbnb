import axios from "axios";
import { useState } from "react";
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
  photoLink: string;
  photoFile: File | null | undefined;
  photos: string[];
  description: string;
  perks: string[];
  extraInfo: string;
  checkIn: string;
  checkOut: string;
  maxGuests: number;
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
  photoFile: null,
  photos: [],
  description: "",
  perks: [],
  extraInfo: "",
  checkIn: "",
  checkOut: "",
  maxGuests: 0,
  photoLink: "",
};
type PerkIcons = Record<string, JSX.Element>;

const perkIcons: PerkIcons = {
  "Free Wi-Fi": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-10 w-10"
    >
      <path
        fillRule="evenodd"
        d="M1.371 8.143c5.858-5.857 15.356-5.857 21.213 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.06 0c-4.98-4.979-13.053-4.979-18.032 0a.75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182c4.1-4.1 10.749-4.1 14.85 0a.75.75 0 010 1.061l-.53.53a.75.75 0 01-1.062 0 8.25 8.25 0 00-11.667 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.204 3.182a6 6 0 018.486 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0 3.75 3.75 0 00-5.304 0 .75.75 0 01-1.06 0l-.53-.53a.75.75 0 010-1.06zm3.182 3.182a1.5 1.5 0 012.122 0 .75.75 0 010 1.061l-.53.53a.75.75 0 01-1.061 0l-.53-.53a.75.75 0 010-1.06z"
        clipRule="evenodd"
      />
    </svg>
  ),
  "Swimming Pool": (
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
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  ),
  Gym: (
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
        d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
      />
    </svg>
  ),
  "Breakfast Included": (
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
        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
      />
    </svg>
  ),
  Parking: (
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
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  ),
  "Air Conditioning": (
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
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  ),
  "Pet-Friendly": (
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
        d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002"
      />
    </svg>
  ),
  "Ocean View": (
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
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
};

const perksData = [
  { id: 1, name: "Free Wi-Fi", selected: false },
  { id: 2, name: "Swimming Pool", selected: false },
  { id: 3, name: "Gym", selected: false },
  { id: 4, name: "Breakfast Included", selected: false },
  { id: 5, name: "Parking", selected: false },
  { id: 6, name: "Air Conditioning", selected: false },
  { id: 7, name: "Pet-Friendly", selected: false },
  { id: 8, name: "Ocean View", selected: false },
];

const PlacesPage = () => {
  const { action } = useParams();

  const [perks, setPerks] = useState(perksData);

  const [title, setTitle] = useState(initialFormValues.title);
  const [address, setAddress] = useState(initialFormValues.address);
  const [addedPhotos, setAddedPhotos] = useState<string[]>(
    initialFormValues.photos
  );
  const [photoLink, setPhotoLink] = useState(initialFormValues.photoLink);
  const [photoFile, setPhotoFile] = useState(initialFormValues.photoFile);
  const [description, setDescription] = useState(initialFormValues.description);
  const [perksValue, setPerksValue] = useState<string[]>(
    initialFormValues.perks
  );
  const [extraInfo, setExtraInfo] = useState(initialFormValues.extraInfo);
  const [checkIn, setCheckIn] = useState(initialFormValues.checkIn);
  const [checkOut, setCheckOut] = useState(initialFormValues.checkOut);
  const [maxGuests, setMaxGuests] = useState(initialFormValues.maxGuests);

  const handleCheckboxChange = (perkId: number) => {
    setPerks((prevPerks) =>
      prevPerks.map((perk) =>
        perk.id === perkId ? { ...perk, selected: !perk.selected } : perk
      )
    );
  };

  function checked(selected: boolean): string {
    let classes =
      " cursor-pointer rounded-xl border p-4 flex h-[128px] justify-center items-center flex-col";
    if (selected) classes += " border-primary text-gray-900 ";
    else {
      classes += " text-gray-300 ";
    }
    return classes;
  }

  const handleAddressChange = (event: { target: { value: any } }) => {
    const newAddress = { ...address, street: event.target.value };
    setAddress(newAddress);
  };

  const addPhotoByLink: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      setAddedPhotos((prev) => {
        return [...prev, filename];
      });
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
    setPhotoLink("");
  };

  const handleMaxGuestsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10); // Parse the input value to an integer
    setMaxGuests(value);
  };

  function uploadPhoto(event: any) {
    const files = event.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

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
          <input
            placeholder="Title here"
            type="text"
            name="title"
            onChange={(event) => setTitle(event.target.value)}
          />

          <div className="mt-8">
            <h2 className="input-header">Address</h2>
            <h3 className="input-subheading">Address to this place</h3>
            <input
              placeholder="Street address"
              type="text"
              name="address.street"
              value={address.street}
              onChange={handleAddressChange}
            />
            <input
              placeholder="Apartment no, building, room, ..."
              type="text"
              name="address.specific"
              value={address.specific}
              onChange={handleAddressChange}
            />

            <input
              placeholder="Town/City"
              type="text"
              name="address.city"
              value={address.city}
              onChange={handleAddressChange}
            />
            <input
              placeholder="ZipCode"
              type="number"
              name="address.zipCode"
              value={address.zipCode}
              onChange={handleAddressChange}
            />
            <input
              placeholder="State"
              type="text"
              name="address.state"
              value={address.state}
              onChange={handleAddressChange}
            />
            <input
              placeholder="Country"
              type="text"
              name="address.country"
              value={address.country}
              onChange={handleAddressChange}
            />
          </div>
          {/* photos */}
          <h2 className="input-header mt-8">Photos</h2>
          <h3 className="input-subheading">The more the better</h3>
          <div className="flex gap-2">
            <input
              placeholder="Add using a link"
              type="text"
              name="photos"
              value={photoLink}
              onChange={(e) => setPhotoLink(e.target.value)}
            />
            <button
              className="rounded-2xl bg-gray-200 px-4"
              onClick={addPhotoByLink}
            >
              Add&nbsp;photo
            </button>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 ">
            {setAddedPhotos.length > 0 &&
              addedPhotos.map((link) => (
                <div className="h-[150px] overflow-hidden rounded-2xl object-cover">
                  <img
                    src={"http://localhost:4000/uploads/" + link}
                    alt=""
                    className="object-cover"
                  />
                </div>
              ))}
            <label className="flex h-[150px] cursor-pointer items-center justify-center gap-1 rounded-2xl border bg-transparent p-4 text-2xl text-gray-600">
              <input
                type="file"
                name="pictureFiles"
                multiple
                id=""
                className="hidden"
                onChange={uploadPhoto}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Upload
            </label>
          </div>

          <div>
            <h2 className="input-header mt-8">Description</h2>
            <h3 className="input-subheading">
              Make your place stand out by telling us how it is!
            </h3>
            <textarea name="description" />
          </div>

          <div className="mt-8">
            <h2 className="input-header">Perks</h2>
            <h3 className="input-subheading">
              Select all the perks of your place
            </h3>
            <div className="my-4 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {perks.map((perk) => (
                <label key={perk.id} className={checked(perk.selected)}>
                  <input
                    type="checkbox"
                    checked={perk.selected}
                    onChange={() => handleCheckboxChange(perk.id)}
                    className="appearance-none border-none outline-none"
                  />
                  <div>{perkIcons[perk.name]}</div>
                  <p className="text-center">{perk.name}</p>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="input-header ">Extra Info</h2>
            <h3 className="input-subheading">House rules, conduct, etc</h3>
            <textarea
              name="extraInfo"
              onChange={(event) => setExtraInfo(event.target.value)}
            />
          </div>

          <div className="mt-8">
            <h2 className="input-header">Check in and check out times</h2>
            <h3 className="input-subheading">Input check in time</h3>
            <input
              placeholder="1:00pm"
              type="text"
              name="checkIn"
              onChange={(event) => setCheckIn(event.target.value)}
            />
            <h3 className="input-subheading">Input checkout time</h3>
            <input
              placeholder="1:00pm"
              type="text"
              name="checkOut"
              onChange={(event) => setCheckOut(event.target.value)}
            />
          </div>
          <div className="my-8">
            <h2 className="input-header">Max guests</h2>
            <h3 className="input-subheading">
              What is the max capacity of your accomodation
            </h3>
            <input
              placeholder="5 guests"
              type="number"
              name="maxGuests"
              value={maxGuests || ""}
              onChange={handleMaxGuestsChange}
            />
          </div>

          <button
            className="primary opacity-80 transition-all hover:opacity-100"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default PlacesPage;
