import React, { useState, useEffect } from "react";
import { intializeDisasterContract } from "../../Utils/connectWallet";
const SupplyRequest = () => {
  //just set supplies called from contract
  const [supplies, setSupplies] = useState([
    {
      supplyType: "Home",
      requestedBy: "Ghi",
      deliveryAddress: "Mumbai",
      amount: 100,
      state: "Dispatched",
    },
    // {
    //   supplyType: "Home",
    //   requestedBy: "Ghi",
    //   deliveryAddress: "Mumbai",
    //   amount: 100,
    //   state: "Dispatched",
    // },
  ]);
  const fetchSupplies = async () => {
    const contract = intializeDisasterContract();
    const s = await contract.methods.getAllRequest().call();
    console.log(s);
  };
  useEffect(() => {
    fetchSupplies();
  }, []);
  return (
    <div className="flex items-center justify-center gap-5 flex-wrap">
      {supplies.length !== 0 ? (
        supplies.map((props, index) => (
          <SupplyCard
            supplyType={props.supplyType}
            requestedBy={props.requestedBy}
            deliveryAddress={props.deliveryAddress}
            amount={props.amount}
            state={props.state}
            index={index}
          />
        ))
      ) : (
        <div className="flex items-center justify-center text-black">
          No Supplies Found
        </div>
      )}
    </div>
  );
};

export default SupplyRequest;

function SupplyCard({
  supplyType,
  requestedBy,
  deliveryAddress,
  amount,
  state,
}) {
  return (
    <div class="w-10/12 md:w-5/12 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="bg-gray-200 text-gray-700 text-lg px-6 py-4">
        Supply Type : {supplyType}
      </div>

      <div class="flex flex-col sm:flex-row justify-between items-center sm:px-6 py-4">
        <div class="bg-orange-600 text-xs uppercase px-2 py-1 rounded-full border border-gray-200 text-gray-200 font-bold">
          {state}
        </div>
        <div class="text-sm">Amount : {amount}</div>
      </div>

      {/* <div class="px-6 py-4 border-t border-gray-200">
        <div class="border rounded-lg p-4 bg-gray-200">
          {deliveryAddress}
        </div>
      </div> */}

      <div class="bg-gray-200 px-6 py-4">
        <div class="uppercase text-xs text-gray-600 font-bold">
          Location : {deliveryAddress}
        </div>

        <div class="flex items-center pt-3">
          <div class="bg-blue-700 w-12 h-12 flex justify-center items-center rounded-full uppercase font-bold text-white">
            {requestedBy.charAt(0)}
          </div>
          <div class="ml-4">
            <p class="font-bold">{requestedBy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
