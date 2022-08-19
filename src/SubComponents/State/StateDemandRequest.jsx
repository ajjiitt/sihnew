import React, { useState, useEffect } from "react";
import { intializeDisasterContract } from "../../Utils/connectWallet";
const StateDemandRequest = () => {
  //just set supplies called from contract
  const [supplies, setSupplies] = useState([
    {
      location: "Mumbai",
      demandDescription: "XYZ",
      name: "Ajit",
      state: "Created",
    },
  ]);
  const fetchSupplies = async () => {
    const contract = intializeDisasterContract();
    const s = await contract.methods.getAllDemands().call();
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
            location={props.location}
            demandDescription={props.demandDescription}
            name={props.name}
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

export default StateDemandRequest;

function SupplyCard({ location, demandDescription, name, state }) {
  return (
    <div class="w-8/12 md:w-4/12 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="bg-gray-200 text-gray-700 text-lg px-6 py-4">
        Description : {demandDescription}
      </div>

      <div class="flex flex-col sm:flex-row justify-between items-center sm:px-6 py-4">
        <div class="bg-orange-600 text-xs uppercase px-2 py-1 rounded-full border border-gray-200 text-gray-200 font-bold">
          {state}
        </div>
        {/* <div class="text-sm">Amount : {amount}</div> */}
      </div>

      {/* <div class="px-6 py-4 border-t border-gray-200">
        <div class="border rounded-lg p-4 bg-gray-200">
          {deliveryAddress}
        </div>
      </div> */}

      <div class="bg-gray-200 px-6 py-4">
        <div class="uppercase text-xs text-gray-600 font-bold">
          Location : {location}
        </div>

        <div class="flex items-center pt-3">
          <div class="bg-blue-700 w-12 h-12 flex justify-center items-center rounded-full uppercase font-bold text-white">
            {name.charAt(0)}
          </div>
          <div class="ml-4">
            <p class="font-bold">{name}</p>
          </div>
        </div>
        <hr className="w-full my-2 border-t-2 border-gray-300" />
        <div className="flex gap-2 items-center justify-center flex-col md:flex-row">
          <div className="w-4/5 md:w-2/5 ">
            <button className="text-xs w-full  bg-green-700 rounded-lg p-2 text-white font-semibold cursor-pointer">CREATE</button>
          </div>
          <div className="w-4/5 md:w-2/5">
            <button className="text-xs w-full bg-red-600 rounded-lg p-2 text-white font-semibold cursor-pointer">CANCEL</button>
          </div>
        </div>
      </div>
    </div>
  );
}
