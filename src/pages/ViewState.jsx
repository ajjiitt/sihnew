import React, { useState } from "react";
import StateDemandRequest from "../SubComponents/State/StateDemandRequest";
import StateSupplyRequest from "../SubComponents/State/StateSupplyRequest";
import FileSharing from "../Components/FileSharing";
import AllGroundAuthorities from "../SubComponents/State/AllGroundAuthorities";
import AllStateAuthorities from "../SubComponents/State/AllStateAuthorities";
export default function ViewState() {
  const [curIndex, setCurIndex] = useState(0);
  const tabComponents = [
    <StateSupplyRequest />,
    <StateDemandRequest />,
    <AllStateAuthorities />,
    <AllGroundAuthorities />,
    <FileSharing />,
  ];
  return (
    <div>
      <div className="mx-5 my-5">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select your country
          </label>
          <select
            id="tabs"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Profile</option>
            <option>Canada</option>
            <option>France</option>
            <option>Germany</option>
          </select>
        </div>
        <ul className="hidden text-xs  font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(0);
              }}
              className="inline-block p-4 w-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-l-lg"
              aria-current="page"
            >
              Supply Request
            </button>
          </li>
          <li className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(1);
              }}
              className="inline-block p-4 w-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-current="page"
            >
              Demand Request
            </button>
          </li>
          <li className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(2);
              }}
              className="inline-block p-4 w-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              State Authorities
            </button>
          </li>
          <li className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(3);
              }}
              className="inline-block p-4 w-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Ground Authorities
            </button>
          </li>
          <li className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(4);
              }}
              className="rounded-r-lg inline-block p-4 w-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              File Storage
            </button>
          </li>
        </ul>
      </div>
      <div className="px-9 md:px-24">{tabComponents[curIndex]}</div>
    </div>
  );
}
