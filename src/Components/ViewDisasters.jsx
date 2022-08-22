import React, { useState, useEffect } from "react";
import Disaster from "../Cards/Disaster";
import { intializeMasterContract } from "../Utils/connectWallet";

const ViewDisasters = ({ authority }) => {
  const [disasters, setDisasters] = useState([]);
  const fetchDisasters = async () => {
    const contract = intializeMasterContract();
    const allDisasters = await contract.methods.getDisasters().call();
    console.log(allDisasters);
    setDisasters(allDisasters);
  };

  useEffect(() => {
    fetchDisasters();
  }, []);

  return (
    <div>
      <div class="p-6 md:my-5">
        <h5 class="mb-2 text-3xl md:text-5xl font-semibold tracking-tight text-center text-gray-900 md:pt-4 pb-6">
          DISASTERS
        </h5>

        <div class="">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {disasters.map((ele, index) => {
              console.log(ele[0]);
              console.log(ele.disasterContract);
              return (
                <Disaster
                  name={ele.disasterName}
                  location={ele.location}
                  contract={ele[0]}
                  severity = {ele.severity}
                  key={index}
                  authority={authority}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDisasters;
