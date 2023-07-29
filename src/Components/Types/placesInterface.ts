export interface Address {
  street: string;
  specific: string;
  zipCode: number;
  city: string;
  state: string;
  country: string;
}
export interface PlacesData {
  title: string;
  address: Address;
  description: string;
  perksValue: string[];
  extraInfo: string;
  checkIn: string;
  checkOut: string;
  maxGuests: number;
  addedPhotos: string[];
}

export const initialAddress: Address = {
  street: "",
  specific: "",
  zipCode: 0,
  city: "",
  state: "",
  country: "",
};

export const initialFormValues: PlacesData = {
  title: "",
  address: initialAddress,
  description: "",
  extraInfo: "",
  checkIn: "",
  checkOut: "",
  maxGuests: 0,
  perksValue: [],
  addedPhotos: [],
};
