import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { perksData, perkIcons } from "../Components/FormComponents/PerksData";
import PhotosUploader from "../Components/FormComponents/PhotosUploader";
import AccountNavigation from "../Components/AccountNavigation";
import {
  Address,
  initialFormValues,
} from "../Components/Types/placesInterface";

const PlacesFormPage = () => {
  const [perks, setPerks] = useState(perksData);

  const [title, setTitle] = useState(initialFormValues.title);
  const [address, setAddress] = useState(initialFormValues.address);
  const [addedPhotos, setAddedPhotos] = useState<string[]>(
    initialFormValues.addedPhotos
  );
  const [description, setDescription] = useState(initialFormValues.description);
  const [perksValue, setPerksValue] = useState<string[]>(
    initialFormValues.perksValue
  );
  const [extraInfo, setExtraInfo] = useState(initialFormValues.extraInfo);
  const [checkIn, setCheckIn] = useState(initialFormValues.checkIn);
  const [checkOut, setCheckOut] = useState(initialFormValues.checkOut);
  const [maxGuests, setMaxGuests] = useState(initialFormValues.maxGuests);
  const [redirect, setRedirect] = useState<boolean>(false);

  async function addNewPlace(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perksValue,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  const handleAddressChange = (
    event: ChangeEvent<HTMLInputElement>,
    property: keyof Address
  ) => {
    const { value } = event.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [property]: value,
    }));
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

  const handleCheckboxChange = (perkId: number) => {
    setPerks((prevPerks) =>
      prevPerks.map((perk) =>
        perk.id === perkId ? { ...perk, selected: !perk.selected } : perk
      )
    );
  };

  function selectedPerks(event: ChangeEvent<HTMLInputElement>) {
    const { name, checked } = event.target;
    if (checked) setPerksValue([...perksValue, name]);
    else setPerksValue([...perksValue.filter((selected) => selected !== name)]);
  }

  const handleMaxGuestsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value, 10); // Parse the input value to an integer
    setMaxGuests(value);
  };

  return (
    <div>
      <AccountNavigation />
      <form onSubmit={addNewPlace} className="mx-auto my-10 max-w-2xl">
        <h2 className="input-header">Title</h2>
        <h3 className="input-subheading">
          The title for your place should be short catchy
        </h3>
        <input
          placeholder="Title here"
          type="text"
          name="title"
          value={title}
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
            onChange={(e) => handleAddressChange(e, "street")}
          />
          <input
            placeholder="Apartment no, building, room, ..."
            type="text"
            name="address.specific"
            value={address.specific}
            onChange={(e) => handleAddressChange(e, "specific")}
          />

          <input
            placeholder="Town/City"
            type="text"
            name="address.city"
            value={address.city}
            onChange={(e) => handleAddressChange(e, "city")}
          />
          <input
            placeholder="ZipCode"
            type="number"
            name="address.zipCode"
            value={address.zipCode}
            onChange={(e) => handleAddressChange(e, "zipCode")}
          />
          <input
            placeholder="State"
            type="text"
            name="address.state"
            value={address.state}
            onChange={(e) => handleAddressChange(e, "state")}
          />
          <input
            placeholder="Country"
            type="text"
            name="address.country"
            value={address.country}
            onChange={(e) => handleAddressChange(e, "country")}
          />
        </div>
        {/* photos */}
        <h2 className="input-header mt-8">Photos</h2>
        <h3 className="input-subheading">The more the better</h3>
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        <div>
          <h2 className="input-header mt-8">Description</h2>
          <h3 className="input-subheading">
            Make your place stand out by telling us how it is!
          </h3>
          <textarea
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
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
                  name={perk.name}
                  checked={perk.selected}
                  onChange={(event) => {
                    handleCheckboxChange(perk.id);
                    selectedPerks(event);
                  }}
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
            value={extraInfo}
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
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
          />
          <h3 className="input-subheading">Input checkout time</h3>
          <input
            placeholder="1:00pm"
            type="text"
            name="checkOut"
            value={checkOut}
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
          type="submit"
          className="primary opacity-80 transition-all hover:opacity-100"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PlacesFormPage;
