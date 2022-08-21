import React, { useState, useEffect } from "react";
import { intializeMasterContract } from "../Utils/connectWallet";

const CentralAuthorities = () => {
  const [authorities, setAuthorities] = useState([]);

  const contract = intializeMasterContract();

  const fetchCentralAuthorities = async () => {
    const central = await contract.methods.getCenterData().call();
    console.log(central);
    setAuthorities(central);
  };

  useEffect(() => {
    fetchCentralAuthorities();
  }, []);
  return (
    <div>
      <p className="font-semibold text-center text-2xl">State AUTHORITIES</p>
      <div className="flex md:w-full justify-center items-center px-3 md:px-0 overflow-scroll">
        <div class="overflow-x-auto shadow-xl sm:rounded-lg mb-5">
          <table class="w-full text-sm text-left text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="py-3 px-6">
                  #
                </th>
                <th scope="col" class="py-3 px-6">
                  Authority Name
                </th>
                <th scope="col" class="py-3 px-6">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {authorities.map((ele, index) => (
                <tr class="bg-white border-b " key={index}>
                  <th scope="row" class="py-4 px-6 text-footer-darkblue">
                    {index + 1}
                  </th>
                  <td class="py-4 px-6 text-footer-darkblue">
                    {ele.centerAddress}
                  </td>
                  <td class="py-4 px-6 text-footer-darkblue">{ele.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CentralAuthorities;
