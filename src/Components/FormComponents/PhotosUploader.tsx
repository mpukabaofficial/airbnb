import axios from "axios";
import React, { useState } from "react";

interface PhotosUploaderProps {
  addedPhotos: string[];
  onChange: (photos: string[]) => void;
  initialValue: string;
}

const PhotosUploader = ({
  addedPhotos,
  onChange,
  initialValue,
}: PhotosUploaderProps) => {
  const [photoLink, setPhotoLink] = useState(initialValue);

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
        onChange([...addedPhotos, ...filenames]);
      });
  }

  const addPhotoByLink: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    try {
      const { data: filename } = await axios.post("/upload-by-link", {
        link: photoLink,
      });

      // Use the onChange prop to update the parent component's state
      onChange([...addedPhotos, filename]);
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
    setPhotoLink("");
  };

  return (
    <>
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
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div
              key={link}
              className="h-[150px] overflow-hidden rounded-2xl border-red-500 object-cover"
            >
              <img
                src={"http://localhost:4000/uploads/" + link}
                alt=""
                className="min-h-full object-cover"
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
    </>
  );
};

export default PhotosUploader;
