import React, { useState } from "react";
import { getAccountID, intializeMasterContract } from "../Utils/connectWallet";
import { toast } from "react-toastify";
import { sendAlert } from "../Utils/telegramMessage";
const CreateDisaster = () => {
  let id;
  const [inputs, setInputs] = useState({
    type_of_disaster: "",
    location_of_disaster: "",
    otherName: "",
    severity: "Low",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const options = [
    {
      label: "Low",
      value: "Low",
    },
    {
      label: "Medium",
      value: "Medium",
    },
    {
      label: "High",
      value: "High",
    },
  ];
  const optionsD = [
    {
      label: "Flood",
      value: "Flood",
    },
    {
      label: "Cyclone",
      value: "Cyclone",
    },
    {
      label: "Fire",
      value: "Fire",
    },
    {
      label: "Fire",
      value: "Fire",
    },
    {
      label: "Earthquake",
      value: "Earthquake",
    },
    {
      label: "Building Collapse",
      value: "Building Collapse",
    },
    {
      label: "Other",
      value: "other",
    },
  ];
  console.log(inputs);
  const onSubmit = async (e) => {
    e.preventDefault();
    const contract = intializeMasterContract();
    const accountId = await getAccountID();
    if (inputs.type_of_disaster !== "" && inputs.location_of_disaster !== "") {
      if (inputs.type_of_disaster === "other") {
        inputs.type_of_disaster = inputs.otherName;
      }
      id = toast.loading("Creating Disaster", {
        position: "top-center",
        // closeOnClick: true,
      });
      await contract.methods
        .createDisaster(
          inputs.type_of_disaster,
          inputs.location_of_disaster,
          inputs.severity
        )
        .send({ from: accountId })
        .then((res) => {
          if (inputs.type_of_disaster === "other") {
            sendAlert(
              inputs.otherName,
              inputs.location_of_disaster,
              inputs.severity
            );
          } else {
            sendAlert(
              inputs.type_of_disaster,
              inputs.location_of_disaster,
              inputs.severity
            );
          }
          toast.update(id, {
            render: "Disaster created successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setInputs({
            type_of_disaster: "",
            location_of_disaster: "",
            severity: "",
          });
          console.log(res);
        })
        .catch((err) => {
          toast.update(id, {
            render: "Failed to create disaster",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        });
    } else {
      toast.error("Please fill all the fields");
    }
  };

  return (
    <div className="flex justify-center items-center md:mb-5">
      <div className="bg-white rounded-xl shadow-xl w-full m-8 md:m-0 md:w-10/12 lg:w-2/3">
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 pt-10 mx-auto">
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
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Type of Disaster
                    </label>
                    <select
                      onChange={(e) =>
                        setInputs({
                          ...inputs,
                          type_of_disaster: e.target.value,
                        })
                      }
                      id="tabs"
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                    >
                      <option disabled selected> -- select an option -- </option>
                      {optionsD.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                {inputs.type_of_disaster === "other" && (
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Name of Disaster
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="otherName"
                        value={inputs.otherName}
                        onChange={(e) => handleChange(e)}
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                )}
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Location of Disaster
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="location_of_disaster"
                      value={inputs.location_of_disaster}
                      onChange={(e) => handleChange(e)}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>

                <div className="p-2 w-full md:flex flex-wrap justify-between">
                  <div className="flex justify-between items-center w-full">
                    <div className="leading-7 text-sm text-gray-600 flex justify-center items-center px-2 ">
                      Severity :
                    </div>
                    <select
                      onChange={(e) =>
                        setInputs({ ...inputs, severity: e.target.value })
                      }
                      id="tabs"
                      className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                    >
                      {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="p-2 w-full">
                    <button
                      className="my-2 flex mx-auto text-white bg-footer-darkblue border-0 p-2 px-8 focus:outline-none hover:bg-gray-100 hover:text-footer-darkblue rounded text-lg hover:border-1 hover:border-footer-darkblue"
                      onClick={(e) => onSubmit(e)}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateDisaster;
