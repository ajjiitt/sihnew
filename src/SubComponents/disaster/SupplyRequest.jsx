import React, { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAccountID,
  intializeMasterContract,
} from "../../Utils/connectWallet";
import { generatePdf } from "../../Utils/generatePdf";
const SupplyRequest = () => {
  let id;
  //just set supplies called from contract
  const [modal, setModal] = useState(false);
  const [supplyType, setSupplyType] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [state, setState] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [supplies, setSupplies] = useState([
    {
      supplyType: "Home",
      requestedBy: "Ghi",
      deliveryAddress: "Mumbai",
      amount: 100,
      state: "Dispatched",
    },
  ]);
  const [viewCreateSupplies, setViewCreateSupplies] = useState([
    {
      supplyType: "Farm",
      requestedBy: "Ghi",
      deliveryAddress: "Mumbai",
      amount: 100,
      state: "Dispatched",
    },
  ]);
  const fetchSupplies = async () => {
    const contract = intializeMasterContract();
    const contractAddress = searchParams.get("q");
    const allRequests = await contract.methods
      .getAllRequest(contractAddress)
      .call();
    console.log(allRequests);
    setSupplies(allRequests);
  };
  const fetchUserSupply = async () => {
    const contract = intializeMasterContract();
    const contractAddress = searchParams.get("q");
    const accountId = await getAccountID();

    const userSupply = await contract.methods
      .getRequest(contractAddress, accountId)
      .call();
    console.log(userSupply);
    setViewCreateSupplies(userSupply);
  };

  const [curIndex, setCurIndex] = useState(0);
  const options = [
    {
      label: "View Supplies",
      value: 0,
    },
    {
      label: "View Created Supplies",
      value: 1,
    },
  ];
  const optionsForm = [
    {
      label: "Initiated",
      value: "Initiated",
    },
    {
      label: "Dispatched",
      value: "Dispatched",
    },
    {
      label: "Delivered",
      value: "Delivered",
    },
    {
      label: "Cancelled",
      value: "Cancelled",
    },
  ];
  const [selected, setSelected] = useState([]);
  const multipleSelectValues = [
    { label: "medicine", value: "medicine",type:"medicine" },
    { label: "food", value: "food",type:"medicine" },
    { label: "maggi", value: "maggi",type:"medicine" },
  ];
  const tabComponents = [
    <ViewSupplies supplies={supplies} />,
    <ViewCreated supplies={viewCreateSupplies} />,
  ];
  const createSupply = async () => {
    if (supplyType.length >= 2 && deliveryAddress.length >= 2 && amount >= 1) {
      const contract = intializeMasterContract();
      const accountId = await getAccountID();
      id = toast.loading("Creating Supply", {
        position: "top-center",
        closeOnClick: true,
      });
      const contractAddress = searchParams.get("q");
      console.log(contractAddress, "cow");
      await contract.methods
        .createRequest(contractAddress, supplyType, deliveryAddress, amount)
        .send({ from: accountId })
        .then((res) => {
          console.log(res);
          fetchSupplies();
          fetchUserSupply();
          setAmount(0);
          setDeliveryAddress("");
          setRequestedBy("");
          setSupplyType("");
          setState("");
          setModal(false);
          toast.update(id, {
            render: "Supply Created successfully",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
        })
        .catch((err) => { });
    } else {
      toast.info("Please Fill Valid Details");
    }
  };

  useEffect(() => {
    fetchSupplies();
    fetchUserSupply();
  }, []);
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
                    <div className="text-2xl">Create Supply</div>
                    <div className="w-3/4">
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Supply Type
                      </label>
                      {/* <input
                        type="text"
                        id="receiverAddress"
                        value={supplyType}
                        onChange={(e) => setSupplyType(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Supply Type"
                        required
                      /> */}
                      {/* Multiple Select Started */}
                      <MultiSelect
                        options={multipleSelectValues}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
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
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Delivery Address"
                        required
                      />
                    </div>
                    <div className="w-3/4">
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Amount
                      </label>
                      <input
                        type="number"
                        id="receiverAddress"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Amount"
                        required
                      />
                    </div>
                    {/* <div className="w-3/4">
                      <label
                        for="first_name"
                        class="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Supply State
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        id="tabs"
                        className="h-full w-full py-2 px-4 text-md bg-gray-50 border border-gray-300 text-gray-900 sm:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block  "
                      >
                        {optionsForm.map((option) => (
                          <option value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div> */}
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
              Create Supply
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
                View Supply
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
                Create Supply
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
                  View Created
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

export default SupplyRequest;

const ViewSupplies = ({ supplies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {supplies.length !== 0 ? (
        supplies.map((props, index) => (
          <SupplyCard
            supplyType={props.supplyType}
            requestedBy={props.requestedBy}
            deliveryAddress={props.deliveryAddress}
            amount={props.amount}
            state={props.state}
            key={index}
          />
        ))
      ) : (
        <div className="flex items-center justify-center text-black">
          No Supplies Found
        </div>
      )}
    </div>
  );
};
const ViewCreated = ({ supplies }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {supplies.length !== 0 ? (
        supplies.map((props, index) => (
          <SupplyCard
            supplyType={props.supplyType}
            requestedBy={props.requestedBy}
            deliveryAddress={props.deliveryAddress}
            amount={props.amount}
            state={props.state}
            key={index}
          />
        ))
      ) : (
        <div className="flex items-center justify-center text-black">
          No Supplies Found
        </div>
      )}
    </div>
  );
};

function SupplyCard({
  supplyType,
  requestedBy,
  deliveryAddress,
  amount,
  state,
}) {
  return (
    // suppply map
    <div class="w-full flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="bg-gray-200 text-gray-700 text-lg px-6 py-4">
        Supply Type : {supplyType}
      </div>

      <div class="flex flex-col sm:flex-row justify-between items-center sm:px-6 py-4">
        {/* <div class="bg-orange-600 text-xs uppercase px-2 py-1 rounded-full border border-gray-200 text-gray-200 font-bold">
          {state}
        </div> */}
        <button
          className="rounded-xl text-black p-3 font-semibold"
          style={{ backgroundColor: "#42c642d6" }}
          onClick={async (events) => {
            const data = {
              supplyType: supplyType,
              requestedBy: requestedBy,
              deliveryAddress: deliveryAddress,
              amount: amount,
            };
            await generatePdf("Hey there testing stuff", data);
          }}
        >
          {" "}
          Generate Receipt{" "}
        </button>
        <div class="text-sm">Amount : {amount}</div>
      </div>

      {/* <div class="px-6 py-4 border-t border-gray-200">
        <div class="border rounded-lg p-4 bg-gray-200">
          {deliveryAddress}
        </div>
      </div> */}

      <div class="bg-gray-200 px-6 py-4">
        <div class="uppercase text-xs text-gray-600 font-bold">
          Location : {deliveryAddress}
        </div>

        <div class="flex items-center pt-3">
          <div class="bg-blue-700 w-12 h-12 flex justify-center items-center rounded-full uppercase font-bold text-white">
            {requestedBy.charAt(0)}
          </div>
          <div class="ml-4">
            <p class="font-bold">{requestedBy}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
