import React, { useState } from "react";

export default function SupplyForm() {
  const [supplyType, setSupplyType] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [amount, setAmount] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const createSupply = () => {
    console.log({ supplyType, requestedBy, amount, deliveryAddress });
  };
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-3/4 md:w-1/2 my-5 block p-6 rounded-lg bg-white shadow-2xl">
        <div className="form-group mb-6">
          <div className="text-bold text-center text-2xl mb-5">
            CREATE SUPPLY
          </div>
          <label
            for="exampleInputEmail2"
            class="form-label inline-block mb-2 text-gray-700"
          >
            SUPPLY TYPE
          </label>
          <input
            type="text"
            value={supplyType}
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
            placeholder="Supply Type"
          />
        </div>
        <div className="form-group mb-6">
          <label
            for="exampleInputEmail2"
            class="form-label inline-block mb-2 text-gray-700"
          >
            Requested By
          </label>
          <input
            type="text"
            value={requestedBy}
            onChange={(e) => setRequestedBy(e.target.value)}
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
            Delivery Address
          </label>
          <input
            type="text"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
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
            placeholder="Delivery Address"
          />
        </div>
        <div className="form-group mb-6">
          <label
            for="exampleInputEmail2"
            class="form-label inline-block mb-2 text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
            id="amount"
            placeholder="Quantity"
          />
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
          onClick={createSupply}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
