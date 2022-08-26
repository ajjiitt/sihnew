import React, { useState, useEffect } from "react";
import { getAccountID, intializeMasterContract } from "../Utils/connectWallet";
import { toast } from "react-toastify";
const AuthorizeState = () => {
  let id;
  const [buttoncolor, setButtonColor] = useState(0);
  const [stateArr, setStateArr] = useState([]);

  const contract = intializeMasterContract();

  const fetchStateAuthorities = async () => {
    const state = await contract.methods.getRegCenter(1).call();
    setStateArr(state);
  };

  const createStateLevel = async (events, name, address) => {
    events.preventDefault();
    const accoundId = await getAccountID();
    id = toast.loading("Approving...", {
      position: "top-center",
      // closeOnClick: true,
    });
    await contract.methods
    .createLevel(address, name, 1)
      .send({ from: accoundId })
      .then((res) => {
        toast.update(id, {
          render: "Approving User",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render: "Failed to approve user",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  useEffect(() => {
    fetchStateAuthorities();
  }, []);

  return (
    <div>
      <p className="font-semibold text-center text-2xl">State Authorities</p>
      <div className="flex md:w-full justify-center items-center px-3 md:px-0 overflow-scroll md:overflow-hidden">
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
                        createStateLevel(
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
