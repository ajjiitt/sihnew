import React from "react";
import Disaster from "../Cards/Disaster";

const ViewDisasters = () => {
  return (
    <div>
      <div class="p-6 my-5 mx-5 bg-white rounded-lg border border-gray-200 shadow-md  ">
        <h5 class="mb-2 text-5xl font-semibold tracking-tight text-center text-gray-900 pt-4 pb-6">
          DISASTERS
        </h5>

        <div class="bg-white rounded-lg border border-gray-200 shadow-md  dark:border-gray-700">
          <div className="w-full md:flex flex-wrap justify-center items-start">
            <Disaster name="Flood" location="Pune"/>
            <Disaster name="Earthquake" location="Mumbai"/>
            <Disaster name="Landslide" location="Delhi"/>
            <Disaster name="Cloud Burst" location="Ludhiyana"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDisasters;
