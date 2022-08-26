import React, { useState, useEffect } from "react";
import { getAccountID, intializeMasterContract } from "../Utils/connectWallet";
import { toast } from "react-toastify";
const AuthorizeCentral = () => {
  let id;
  const [buttoncolor, setButtonColor] = useState(0);
  const [centralArr, setCentralArr] = useState([]);
  const [contract] = useState(intializeMasterContract());
  // const contract = intializeMasterContract();
  const fetchCentralAuthorities = async () => {
    let central = await contract.methods.getRegCenter(0).call();
    setCentralArr(central);
    // let arr = [];
    // central.forEach((ele) => {
    //   arr.push({ele, isApproved(ele)});
    // })
    // const arr = central.forEach( async (element, index) => {
    //   central[index].state = await isApproved(element.registerAddress);
    // });
    // console.log(arr);
    // let arr = central;
    // central.forEach((ele) => {
    //   const obj = {ele.name}
    //   setCentralArr([...centralArr, {ele.name, ele.}])
    // })
    // setCentralArr(
    //   arr.map((ele) => ({...ele, state: isApproved(ele.registerAddress).then(function(results){
    //     ele.state = results;
    //     return ele.state;
    //   })}))
    // );
  };

  console.log(centralArr);
  // const createCenterLevel = async () => {
  //   const contract = intializeRegisterContract();
  // }
  const getDisasterName = async () => {
    const contract = intializeMasterContract();
    const disasterName = await contract.methods
      .isCenter("0xabE45d16e0390b9611098a2A58d25484D75d6F6E")
      .call();
    console.log(disasterName);
  };

  const isApproved = async (address) => {
    const response = await contract.methods.isCenter(address).call();
    console.log(response);
    return response;
  };

  const createCenterLevel = async (events, name, address) => {
    events.preventDefault();
    const accoundId = await getAccountID();
    id = toast.loading("Approving...", {
      position: "top-center",
      closeOnClick: true,
    });
    await contract.methods
      .createLevel(address, name, 0)
      .send({ from: accoundId })
      .then((res) => {
        toast.update(id, {
          render: "Approving User",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        // setAuthorityName("");
        // setRole("");
      })
      .catch((err) => {
        toast.update(id, {
          render: "Failed to approve user",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };

  useEffect(() => {
    fetchCentralAuthorities();
    // getDisasterName();
  }, []);
  return (
    <div>
      <p className="font-semibold text-center text-2xl">Central Authorities</p>
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
              {centralArr.map((ele, index) => (
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

export default AuthorizeCentral;
