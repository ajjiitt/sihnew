import React from "react";
import { useNavigate } from "react-router-dom";

const Disaster = ({ name, location, description, contract, severity, authority }) => {
  console.log(contract);
  const navigate = useNavigate();
  return (
    <div class="p-6 w-full bg-white rounded-lg border border-gray-200 shadow-md max-h-52">
      <div class="flex flex-col sm:flex-row justify-between items-center">
        <p class="mb-2 w-full h-10 text-gray-500 dark:text-gray-600 text-lg">
          Location: {location}
        </p>
        <div
          class={`bg-orange-600 text-xs uppercase px-2 py-1 rounded-full border border-gray-200 text-gray-200 font-bold`}
        >
          {severity}
        </div>
      </div>
      <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-footer-darkblue">
        {name}
      </h5>
      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400 break-all truncate">
        {/* {description ? description : "No description"} */}
      </p>
      <a
        onClick={(e) => {
          navigate(`/disaster-${authority}?q=${contract}`);
        }}
        class="inline-flex items-center text-footer-darkblue hover:underline"
      >
        View Disaster
        <svg
          class="ml-2 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
          <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
        </svg>
      </a>
    </div>
  );
};

export default Disaster;
