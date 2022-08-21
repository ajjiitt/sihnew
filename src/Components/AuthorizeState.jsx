import React, { useState, useEffect } from "react";
import { getAccountID, intializeMasterContract } from "../Utils/connectWallet";

const AuthorizeState = () => {
  const [buttoncolor, setButtonColor] = useState(0);
  const [stateArr, setStateArr] = useState([]);

  const contract = intializeMasterContract();

  const fetchStateAuthorities = async () => {
    const state = await contract.methods.getRegState().call();
    setStateArr(state);
  };

  const createStateLevel = async (events, name, address) => {
    events.preventDefault();
    const accoundId = await getAccountID();
    const newCenter = await contract.methods
      .createStateLevel(address, name)
      .send({ from: accoundId });
    console.log(newCenter);
  };

  useEffect(() => {
    fetchStateAuthorities();
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
                  Authority Name
                </th>
                <th scope="col" class="py-3 px-6">
                  Address
                </th>
                <th scope="col" class="py-3 px-6">
                  Approved ?
                </th>
              </tr>
            </thead>
            <tbody>
              {stateArr.map((ele, index) => (
                <tr class="bg-white border-b " key={index}>
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium text-footer-darkblue whitespace-nowrap "
                  >
                    {ele.name}
                  </th>
                  <td class="py-4 px-6 text-footer-darkblue">
                    {ele.registerAddress}
                  </td>
                  <td class="py-4 px-6 text-footer-darkblue">
                    <button
                      className="rounded-xl text-black p-3 font-semibold"
                      style={{
                        backgroundColor: ele.state ? "#e6e629a1" : "#42c642d6",
                      }}
                      onClick={(events) => {
                        createCenterLevel(
                          events,
                          ele.name,
                          ele.registerAddress
                        );
                      }}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuthorizeState;
