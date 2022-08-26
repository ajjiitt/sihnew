import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import {
  getAccountID,
  intializeMasterContract,
} from "../../Utils/connectWallet";
import { sendDemandMessage } from "../../Utils/telegramMessage";

const DemandRequest = () => {
  let tempDemandArr = [];
  const [searchParams, setSearchParams] = useSearchParams();
  const contractAddress = searchParams.get("q");
  // const accoundId = await getAccountID();
  let id;
  const contract = intializeMasterContract();
  //just set supplies called from contract
  const [modal, setModal] = useState(false);
  const [supplyType, setSupplyType] = useState("");
  const [disasterName, setDisasterName] = useState("Flood-Pune");
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [demands, setDemands] = useState([]);
  const [senderName, setSenderName] = useState("");
  const [viewCreateDemands, setViewDemandsSupplies] = useState([]);
  const handleOnchange = (val) => setMultipleSelectValuesOption(val);
  const typeSupplyOption = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Food",
      value: "food",
    },
    {
      label: "Medicine",
      value: "medicine",
    },
    {
      label: "Equiments",
      value: "equiments",
    },
    {
      label: "Other",
      value: "other",
    },
  ];
  const multipleSelectValues = [
    { label: "wheat", value: "wheat", type: "food" },
    { label: "rice", value: "rice", type: "food" },
    { label: "maggi", value: "maggi", type: "food" },
    { label: "Dolo", value: "Dolo", type: "medicine" },
    { label: "Crocin", value: "Crocin", type: "medicine" },
    { label: "pickle", value: "pickle", type: "equiments" },
    { label: "axe", value: "axe", type: "equiments" },
  ];
  const [inputOther, setInputOther] = useState(false);
  const [multipleSelectTag, setMultipleSelectTag] =
    useState(multipleSelectValues);
  // multiselect need to ut
  let supplyTypeOptionValueTemp = "all";
  const [supplyTypeOptionValue, setSupplyTypeOptionValue] = useState("all"); // normal select - dont work

  const [multipleSelectValuesOption, setMultipleSelectValuesOption] =
    useState(""); // all selected tag value store for taht tag
  const fetchAllDemands = async () => {
    const contractAddress = searchParams.get("q");
    const demands = await contract.methods
      .getAllDemands(contractAddress)
      .call();
    console.log(demands);
    setDemands(demands);
  };

  const fetchUserDemands = async () => {
    const contractAddress = searchParams.get("q");
    const accountId = await getAccountID();
    const userDemands = await contract.methods
      .getDemands(contractAddress, accountId)
      .call();
    console.log(userDemands);
    tempDemandArr = userDemands;
    setViewDemandsSupplies(userDemands);
  };

  const [curIndex, setCurIndex] = useState(0);
  const options = [
    {
      label: "View Demands",
      value: 0,
    },
    {
      label: "View Created Demands",
      value: 1,
    },
  ];
  console.log(supplyTypeOptionValue, "   ", multipleSelectValuesOption);
  const tabComponents = [
    <ViewDemand demands={demands} />,
    <ViewCreatedDemand demands={viewCreateDemands} />,
  ];
  const createSupply = async () => {
    // const [searchParams, setSearchParams] = useSearchParams();
    // const contractAddress = searchParams.get("q");
    // const accoundId = getAccountID();
    const contractAddress = searchParams.get("q");
    const accoundId = await getAccountID();
    console.log(supplyTypeOptionValueTemp + ":" + multipleSelectValuesOption);
    id = toast.loading("Creating Demand", {
      position: "top-center",
      // closeOnClick: true,
    });
    // location={props.location}
    // supplyType={props.supplyType}
    // requestedBy={props.creatorName}
    // quantity={props.quantity}
    // disasterDetails={props.disasterDetails}
    if (location.length >= 2 && supplyTypeOptionValueTemp.length >= 2) {
      console.log(supplyType);
      const generateSupply = await contract.methods
        .createDemand(
          contractAddress,
          location,
          multipleSelectValuesOption,
          quantity
        )
        .send({ from: accoundId })
        .then((res) => {
          console.log(res);

          fetchAllDemands();
          fetchUserDemands().then((cur) => {
            let sz = tempDemandArr.length;
            // console.log(demands[sz].creatorName, "I wash er");
            sendDemandMessage(
              tempDemandArr[sz - 1].disasterDetails,
              multipleSelectValuesOption,
              location,
              tempDemandArr[sz - 1].quantity,
              tempDemandArr[sz - 1].creatorName
            );
          });
          setQuantity(0);
          setLocation("");
          setSupplyType("");
          setMultipleSelectValuesOption("");
          setSupplyTypeOptionValue("all");
          toast.update(id, {
            render: "Demands created successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setModal(false);
        })
        .catch((err) => {
          console.log(err);
          setLocation("");
          setSupplyType("");
          toast.update(id, {
            render: "Failed to create Demand",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
        });
    } else {
      toast.info("Please Fill Valid Details");
    }
  };
  useEffect(() => {
    fetchAllDemands();
    fetchUserDemands();
  }, []);
  const updateOptionTypeBased = () => {
    if (supplyTypeOptionValueTemp == "all")
      setMultipleSelectTag(multipleSelectValues);
    else {
      let temp = [];
      multipleSelectValues.forEach((element) => {
        console.log(element);
        if (supplyTypeOptionValueTemp == element.type) temp.push(element);
      });
      console.log(temp);
      setMultipleSelectTag(temp);
    }
  };

  return (
    <>
      <div>
        {/* modal */}
        <div
          className={modal ? "relative z-10" : "relative z-10 hidden"}
          id="fileUploadModal"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
              <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-center justify-center gap-5">
                    <div className="text-2xl">Create Demand</div>
                    <div className="w-3/4">
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Supply Type
                      </label>
                      {/* <input
                        maxLength={250}
                        type="text"
                        id="demandDescription"
                        value={supplyType}
                        onChange={(e) => setSupplyType(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Demand Description - max.length 250"
                        required
                      /> */}
                      <select
                        onChange={(e) => {
                          supplyTypeOptionValueTemp = e.target.value;
                          if (e.target.value == "other") setInputOther(true);
                          else setInputOther(false)
                          setSupplyTypeOptionValue(e.target.value);
                          updateOptionTypeBased();
                        }}
                        id="tabs"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                      >
                        {typeSupplyOption.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="w-3/4">
                      {inputOther ? (
                        <input
                          type="text"
                          id="description"
                          maxLength={250}
                          value={multipleSelectValuesOption}
                          onChange={(e) =>
                            setMultipleSelectValuesOption(e.target.value)
                          }
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          placeholder="Please add Products"
                          required
                        />
                      ) : (
                        <>
                          <MultiSelect
                            className="multi-select"
                            onChange={handleOnchange}
                            options={multipleSelectTag}
                          />
                        </>
                      )}
                    </div>
                    <div className="w-3/4">
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        maxLength={250}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Description"
                        required
                      />
                    </div>
                    <div className="w-3/4">
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        id="receiverAddress"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Quantity"
                        required
                      />
                    </div>
                    <div className="w-3/4">
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        id="receiverAddress"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Delivery Address"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={createSupply}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* main */}
        <div className="mx-5 my-5">
          <div className="sm:hidden flex justify-between gap-2">
            <label htmlFor="tabs" className="sr-only">
              Select Option
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
            <button
              className="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal text-white bg-footer-darkblue hover:text-footer-darkblue hover:bg-white "
              onClick={(e) => {
                e.preventDefault();
                setModal(true);
              }}
            >
              Create Demand
            </button>
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
                View Demand
              </button>
            </li>
            <li className="w-full h-full">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setModal(true);
                }}
                className="inline-block p-4 w-full h-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                aria-current="page"
              >
                Create Demand
              </button>
            </li>
            <li className="w-full h-full rounded-r-md">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  setCurIndex(1);
                }}
                // className="inline-block  w-full h-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 "
              >
                <button className="inline-block p-4 w-full bg-white h-full hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 rounded-r-lg">
                  View Created Demand
                </button>
              </a>
            </li>
          </ul>
        </div>
        <div className="px-3 md:px-12">{tabComponents[curIndex]}</div>
      </div>
    </>
  );
};

export default DemandRequest;
const contract = intializeMasterContract();
const ViewDemand = ({ demands }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const contractAddress = searchParams.get("q");
  const accoundId = localStorage.getItem("account");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {demands.length !== 0 ? (
        demands.map((props, index) => (
          <DemandCard
            contractAddress={contractAddress}
            accountId={accoundId}
            location={props.location}
            supplyType={props.supplyType}
            requestedBy={props.creatorName}
            quantity={props.quantity}
            disasterDetails={props.disasterDetails}
            state={props[5]}
            key={index}
            index={index}
          />
        ))
      ) : (
        <div className="flex items-center justify-center text-black">
          No Demands Found
        </div>
      )}
    </div>
  );
};
const ViewCreatedDemand = ({ demands }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const contractAddress = searchParams.get("q");

  const accoundId = localStorage.getItem("account");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {demands.length !== 0 ? (
        demands.map((props, index) => (
          <DemandCard
            contractAddress={contractAddress}
            accountId={accoundId}
            location={props.location}
            supplyType={props.supplyType}
            requestedBy={props.creatorName}
            quantity={props.quantity}
            disasterDetails={props.disasterDetails}
            state={demands[5]}
            key={index}
            index={index}
          />
        ))
      ) : (
        <div className="flex items-center justify-center text-black">
          No Demand Found
        </div>
      )}
    </div>
  );
};

function DemandCard({
  location,
  supplyType,
  requestedBy,
  quantity,
  disasterDetails,
  state,
  index,
  contractAddress,
}) {
  // const contractAddress = searchParams.get("q");
  // const accoundId = getAccountID();
  let accoundId = localStorage.getItem("account");
  const acceptDemand = async () => {
    const check = await contract.methods
      .acceptDemand(contractAddress, accoundId, index)
      .send({ from: accoundId });
    console.log(check);
  };

  return (
    <div class="w-full flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="bg-gray-200 text-gray-700 text-lg px-6 py-4">
        Disaster : {disasterDetails}
      </div>
      <div class="bg-gray-200 text-gray-700 text-lg px-6 py-4">
        Supply Products : {supplyType}
      </div>

      <div class="flex flex-col sm:flex-row justify-between items-center sm:px-6 py-4">
        <p class="font-bold">Name : {requestedBy}</p>
        {/* <div class="bg-orange-600 text-xs uppercase px-2 py-1 rounded-full border border-gray-200 text-gray-200 font-bold">
          {state}
        </div> */}
        {/* <div class="text-sm">Amount : {amount}</div> */}
      </div>

      {/* <div class="px-6 py-4 border-t border-gray-200">
        <div class="border rounded-lg p-4 bg-gray-200">
          {deliveryAddress}
        </div>
      </div> */}

      <div class="bg-gray-200 px-6 py-4">
        <div class="uppercase text-xs text-gray-600 font-bold">
          Location : {location}
        </div>

        <div class="flex items-center pt-3">
          <div class="bg-blue-700 w-12 h-12 flex justify-center items-center rounded-full uppercase font-bold text-white">
            {quantity}
          </div>
          <button
            className="rounded-xl text-black p-3 font-semibold"
            style={{ backgroundColor: "#42c642d6" }}
            onClick={(events) => {
              console.log(state, "state", contractAddress, accoundId, index);
              acceptDemand();
              events.preventDefault();
            }}
          >
            {" "}
            {state === 0 ? "Accept" : "Accepted"}{" "}
          </button>
          <div class="ml-4">
            <p class="font-bold">{requestedBy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
