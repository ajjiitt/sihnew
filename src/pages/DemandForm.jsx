import React, { useState } from "react";

export default function DemandForm() {
  const [authorityName, setAuthorityName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const createDemandSupplies = () => {
    console.log({ authorityName, location, description });
  };
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-3/4 md:w-1/2 my-5 block p-6 rounded-lg bg-white shadow-2xl">
        <div className="form-group mb-6">
          <div className="text-bold text-center text-2xl mb-5">
            CREATE DEMAND SUPPLIES
          </div>
          <label
            for="exampleInputEmail2"
            class="form-label inline-block mb-2 text-gray-700"
          >
            Authority Name
          </label>
          <input
            type="text"
            value={authorityName}
            onChange={(e) => setAuthorityName(e.target.value)}
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
            id="authorityName"
            placeholder="Authority Name"
          />
        </div>
        <div className="form-group mb-6">
          <label
            for="exampleInputEmail2"
            class="form-label inline-block mb-2 text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            id="Location"
            placeholder="Location"
          />
        </div>
        <div className="form-group mb-6">
          <label
            for="exampleInputEmail2"
            class="form-label inline-block mb-2 text-gray-700"
          >
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="
        form-control
        block
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
            id="demandDescription"
            rows="3"
            placeholder="Demand Description"
          ></textarea>
        </div>
        <button
          type="submit"
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
          onClick={createDemandSupplies}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
