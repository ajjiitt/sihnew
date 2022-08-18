import React, { useState } from "react";
import storeFiles from "../Utils/storeFiles";
const FileSharing = () => {
  return (
    <div className="flex items-center justify-center my-5">
      <FileShareForm />
    </div>
  );
};

export default FileSharing;

const FileShareForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [address, setAdddress] = useState("");
  const uploadFile = async () => {
    if (selectedFile != null) {
      await storeFiles(selectedFile)
        .then((res) => {
          console.log({link:res.link, address, fileName: selectedFile.name});
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
      console.log("No file selected");
    }
  };
  return (
    <div className="p-2 md:p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <div className="form-group mb-6">
        <input
          type="text"
          className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="address"
          placeholder="Address"
          onChange={(e) => setAdddress(e.target.value)}
        />
      </div>
      <input
        type="file"
        className="mb-6"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <button
        className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
        onClick={uploadFile}
      >
        Submit
      </button>
    </div>
  );
};
