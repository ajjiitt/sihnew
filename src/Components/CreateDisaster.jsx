import React, { useState } from "react";
import { getAccountID, intializeMasterContract } from "../Utils/connectWallet";

const CreateDisaster = () => {
  const [inputs, setInputs] = useState({
    type_of_disaster: "",
    location_of_disaster: "",
    severity: ""
  });

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name] : e.target.value});
  }
  
  const onSubmit = async (e) => {
    e.preventDefault();
    const contract = intializeMasterContract();
    const accountId = await getAccountID();
    const createDisaster = await contract.methods.CreateDisaster(inputs.type_of_disaster, inputs.location_of_disaster, inputs.severity).send({from: accountId})
    console.log(createDisaster);
    setInputs({
      type_of_disaster: "",
    location_of_disaster: "",
    severity: ""
    });
  }

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Register a New Disaster/Calamity
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                    Type of Disaster
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="type_of_disaster"
                    value={inputs.type_of_disaster}
                    onChange={e => handleChange(e)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                    Location of Disaster
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="location_of_disaster"
                    value={inputs.location_of_disaster}
                    onChange={e => handleChange(e)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              
              <div className="p-2 w-full md:flex flex-wrap justify-between">
                {/* <div className=""> */}
                <div  className="leading-7 text-sm text-gray-600 flex justify-center items-center">
                    Severity :
                  </div>
                <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700 md:w-1/4 w-full">
                  <input
                    id="bordered-radio-1"
                    type="radio"
                    name="severity"
                    value="Low"
                    onChange={e => handleChange(e)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-radio-1"
                    className="py-4 ml-2 w-full text-sm font-medium text-gray-900"
                  >
                    Low
                  </label>
                </div>
                <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700 md:w-1/4 w-full">
                  <input
                    id="bordered-radio-2"
                    type="radio"
                    name="severity"
                    value="Moderate"
                    onChange={e => handleChange(e)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-radio-2"
                    className="py-4 ml-2 w-full text-sm font-medium text-gray-900"
                  >
                    Moderate
                  </label>
                </div>
                <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700 md:w-1/4 w-full">
                  <input
                    id="bordered-radio-3"
                    type="radio"
                    name="severity"
                    value="High"
                    onChange={e => handleChange(e)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="bordered-radio-3"
                    className="py-4 ml-2 w-full text-sm font-medium text-gray-900"
                  >
                    High
                  </label>
                </div>
              </div>
              {/* </div> */}
              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={(e) => onSubmit(e)}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateDisaster;
