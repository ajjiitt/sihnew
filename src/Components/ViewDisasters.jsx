import React, { useState, useEffect } from "react";
import Disaster from "../Cards/Disaster";
import { intializeMasterContract } from "../Utils/connectWallet";

const ViewDisasters = () => {
    const [disasters, setDisasters] = useState([]);

    const fetchDisasters = async () => {
        const contract = intializeMasterContract();
        const allDisasters = await contract.methods.getDisasters().call();
        console.log(allDisasters);
        setDisasters(allDisasters);
    }

    useEffect(() => {
        fetchDisasters();
    }, [])

  return (
    <div>
      <div class="p-6 my-5 mx-5 bg-white rounded-lg border border-gray-200 shadow-md  ">
        <h5 class="mb-2 text-5xl font-semibold tracking-tight text-center text-gray-900 pt-4 pb-6">
          DISASTERS
        </h5>

        <div class="bg-white rounded-lg border border-gray-200 shadow-md  dark:border-gray-700">
          <div className="w-full md:flex flex-wrap justify-center items-start">
            {
                disasters.map((ele, index) => {
                    return (
                        <Disaster name={ele.disasterName} location={ele.location} contract={ele.disasterContract} key={index}/>
                    );
                })
            }
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDisasters;
