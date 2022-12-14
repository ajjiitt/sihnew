import React, { useState } from "react";
import AuthorizeCentral from "../Components/AuthorizeCentral";
import AuthorizeState from "../Components/AuthorizeState";
import CentralAuthorities from "../Components/CentralAuthorities";
import CreateDisaster from "../Components/CreateDisaster";
import FileSharing from "../Components/FileSharing";
import StateAuthorities from "../Components/StateAuthorities";
import ViewDisasters from "../Components/ViewDisasters";

const Admin = () => {
  const [curIndex, setCurIndex] = useState(0);
  const options = [
    {
      label: "View Disaster",
      value: 0,
    },
    {
      label: "Create Disaster",
      value: 1,
    },
    {
      label: "Authorize Central",
      value: 2,
    },
    {
      label: "Authorize State",
      value: 3,
    },
    {
      label: "Central Authorities",
      value: 4,
    },
    {
      label: "State Authorities",
      value: 5,
    },
    {
      label: "File Storage",
      value: 6,
    },
  ];
  const tabComponents = [
    <ViewDisasters authority="admin"/>,
    <CreateDisaster />,
    <AuthorizeCentral />,
    <AuthorizeState />,
    <CentralAuthorities />,
    <StateAuthorities />,
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
            value={curIndex}
            onChange={(e) => setCurIndex(e.target.value)}
            id="tabs"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <ul className="hidden text-xs h-16  font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full h-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(0);
              }}
              className="inline-block p-4 w-full h-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-l-lg"
              aria-current="page"
            >
              View Disaster
            </button>
          </li>
          <li className="w-full h-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(1);
              }}
              className="inline-block p-4 w-full h-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-current="page"
            >
              Create Disaster
            </button>
          </li>
          <li className="w-full h-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(2);
              }}
              className="inline-block p-4 w-full h-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Authorize Central
            </button>
          </li>
          <li className="w-full h-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(3);
              }}
              className="inline-block p-4 w-full h-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Authorize State
            </button>
          </li>
          <li className="w-full h-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(4);
              }}
              className="inline-block p-4 w-full h-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Central Authorities
            </button>
          </li>
          <li className="w-full h-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(5);
              }}
              className="inline-block p-4 w-full bg-white h-full hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              State Authorities
            </button>
          </li>
          <li className="w-full h-full rounded-r-md">
            <a
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(6);
              }}
              // className="inline-block  w-full h-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 "
            >
              <button
              className="inline-block p-4 w-full bg-white h-full hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-r-lg"
            >

              File Storage
            </button>
            </a>
          </li>
        </ul>
      </div>
      <div className="px-3 md:px-12">{tabComponents[curIndex]}</div>
    </div>
  );
};

export default Admin;
