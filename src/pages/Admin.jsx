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
  const tabComponents = [<ViewDisasters />, <CreateDisaster />, <AuthorizeCentral />, <AuthorizeState />, <CentralAuthorities />, <StateAuthorities />, <FileSharing />];
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
        <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(0);
              }}
              className="inline-block p-4 w-full text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
              aria-current="page"
            >
              View Disaster
            </button>
          </li>
          <li className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(1);
              }}
              className="inline-block p-4 w-full text-gray-900 bg-gray-100 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white"
              aria-current="page"
            >
              Create Disaster
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
              Authorize Central Authority
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
              Authorize State Authority
            </button>
          </li>
          <li className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(4);
              }}
              className="inline-block p-4 w-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
             Central Authorities
            </button>
          </li>
          <li className="w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(5);
              }}
              className="inline-block p-4 w-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
               State Authorities
            </button>
          </li>
          <li className="w-full">
            <a
              onClick={(e) => {
                e.preventDefault();
                setCurIndex(6);
              }}
              className="inline-block p-4 w-full bg-white rounded-r-lg hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              File Storage
            </a>
          </li>
        </ul>
      </div>
      <div className="">
            {tabComponents[curIndex]}
      </div>
    </div>
  );
};

export default Admin;
