import React, { useState } from "react";
import ApproveVolunteer from "../SubComponents/ApproveVolunteer";
import ViewAllVolunteer from "../SubComponents/ViewAllVolunteer";

const ManageVolunteer = () => {
  const [openTab, setOpenTab] = useState(1);
  const [uaddress, setUaddress] = useState("");
  const [workHour, setWorkHour] = useState(0);
  const saveWOrkHour = () => {
    console.log(uaddress, workHour);
  };
  const color = "footer-darkblue";
  return (
    <div className="flex flex-wrap  justify-center items-center">
      <div class="container px-5 py-24  ">
        <div class=" bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
            Add Work Hours
          </h2>
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">
              Address
            </label>
            <input
              value={uaddress}
              onChange={(e) => setUaddress(e.target.value)}
              type="text"
              id="email"
              name="email"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4">
            <label for="email" class="leading-7 text-sm text-gray-600">
              WorkHour
            </label>
            <input
              value={workHour}
              onChange={(e) => setWorkHour(e.target.value)}
              type="number"
              id="email"
              name="email"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            onClick={saveWOrkHour}
            class="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Update
          </button>
        </div>
      </div>
      <div className="w-full ">
        <ul
          className="flex mb-0 list-none flex-col pt-3 pb-4 sm:flex-row w-9/12 mx-auto gap-3"
          role="tablist"
        >
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center ">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 1
                  ? "text-" + color + " bg-white"
                  : "text-white bg-" + color)
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              View All Volunteer
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center ">
            <a
              className={
                "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 2
                  ? "text-" + color + " bg-white"
                  : "text-white bg-" + color)
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              Approve Volunteer
            </a>
          </li>
        </ul>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <ViewAllVolunteer />
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <ApproveVolunteer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageVolunteer;
