import React, { useState, useEffect } from "react";
import { getAccountID, intializeMasterContract } from "../Utils/connectWallet";

const ApproveVolunteer = () => {
  const contract = intializeMasterContract();
  const [volunteerApprove, setVolunteerApprove] = useState([
    {
      address: "0xabE45d16e0390b9611098a2A58d25484D75d6F6E",
      name: "Volunteer 1",
    },
  ]);
  const accountId = getAccountID();
  const approve = async (address, name) => {
    console.log({ msg: "approve volunteer", address });
    const newCenter = await contract.methods.createLevel(address, name, 3).send({from: accountId});

  };
  const fetchVolunteers = async () => {
    const volunteers = await contract.methods.getRegCenter(3).call();
    console.log(volunteers);
    setVolunteerApprove(volunteers);
  }
  useEffect(() => {
    fetchVolunteers();
  }, [])
  return (
    <div>
      <p className="font-semibold text-center text-2xl">ALL AUTHORITIES</p>
      <div className="flex md:w-full justify-center items-center px-3 md:px-0 overflow-scroll md:overflow-hidden">
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
                <th scope="col" class="py-3 px-6">
                  Approved ?
                </th>
              </tr>
            </thead>
            <tbody>
              {volunteerApprove.map((ele, index) => (
                <tr class="bg-white border-b " key={index}>
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium text-footer-darkblue whitespace-nowrap "
                  >
                    {index + 1}
                  </th>
                  <td class="py-4 px-6 text-footer-darkblue">{ele.name}</td>
                  <td class="py-4 px-6 text-footer-darkblue">{ele.registerAddress}</td>
                  <td class="py-4 px-6 text-footer-darkblue">
                    <button
                      className="rounded-xl text-black p-3 font-semibold"
                      style={{
                        backgroundColor: "#e6e629a1",
                      }}
                      onClick={(events) => {
                        approve(ele.address, ele.name);
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

export default ApproveVolunteer;
