import { setRef } from "@mui/material";
import React, { useState, useEffect } from "react";
import storeFiles from "../Utils/storeFiles";
import { toast } from "react-toastify";
import { getAccountID, intializeMasterContract } from "../Utils/connectWallet";
export default function FileSharing() {
  let id;
  const contract = intializeMasterContract();
  const [curIndex, setCurIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");
  const [description, setDescription] = useState("");
  const [sharedFiles, setSharedFiles] = useState([]);
  const [receivedFiles, setReceivedFiles] = useState([]);
  const searchFile = () => {
    if (curIndex == 0) {
      let temp = receivedFiles.filter((file) => {
        if (file.name.toLowerCase().search(search.toLowerCase()) != -1) {
          return file;
        }
      });
      if (temp.length == 0) toast.error("No Received Files Found");
      setReceivedFiles(temp);
    } else {
      let temp = sharedFiles.filter((file) => {
        if (file.name.toLowerCase().search(search.toLowerCase()) != -1) {
          return file;
        }
      });
      setSharedFiles(temp);
      if (temp.length == 0) toast.error("No Shared Files Found");
      fileNotFoundToast();
    }
  };

  const fetchUserFiles = async () => {
    let accoundId = await getAccountID();
    let userFiles = await contract.methods.fetchUserFiles(accoundId).call();
    setSharedFiles(
      userFiles.filter(
        (ele) => ele.from.toLowerCase() === accoundId.toLowerCase()
      )
    );
    setReceivedFiles(
      userFiles.filter(
        (ele) => ele.to.toLowerCase() === accoundId.toLowerCase()
      )
    );
  };
  const sendFile = async () => {
    if (file && address.length > 10) {
      id = toast.loading("Uploading...", {
        position: "top-center",
        // closeOnClick: true,
      });
      await storeFiles(file)
        .then(async (res) => {
          const today = new Date();
          const accoundId = await getAccountID();
          const sharedFile = await contract.methods
            .shareFile(
              file.name,
              description,
              res.link,
              today.getDate() +
                "-" +
                (today.getMonth() + 1) +
                "-" +
                today.getFullYear(),
              address
            )
            .send({ from: accoundId });
        })
        .then(() => {
          fetchUserFiles();
          setModal(false);
        }).then(() => {
          toast.update(id, {
            render: "Uploaded",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });
          setFile(null);
          setDescription("");
          setModal(false);
        })
        .catch((err) => {
          toast.update(id, {
            render: "Failed to Upload",
            type: "error",
            isLoading: false,
            autoClose: 3000,
          });
          setFile(null);
          setDescription("");
          setModal(false);
          console.log(err);
        });
    }
  };
  const options = [
    {
      label: "Received Files",
      value: 0,
    },
    {
      label: "Shared  Files",
      value: 1,
    },
  ];

  useEffect(() => {
    fetchUserFiles();
  }, [curIndex]);

  return (
    <>
      {/* <button onClick={() => setModal(true)}>Toggle</button> */}
      {/* top input tag & select tag */}
      <div className="flex flex-col justify-center gap-2 md:gap-5 m-3 md:flex-col">
        {/* input tag */}
        <div class="flex justify-center items-center">
          <div class="xl:w-96">
            <div class="input-group relative flex flex-wrap items-stretch w-full mb-4">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                class="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-500 focus:outline-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <button
                class="btn px-6 py-2.5 bg-footer-darkblue text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-slate-300  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-500 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                onClick={() => searchFile()}
                type="button"
                id="button-addon2"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="search"
                  class="w-4"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* select */}
        <div className="w-full md:w-2/3 px-5 md:mx-auto flex items-center justify-center gap-5 flex-col md:flex-row">
          <select
            value={curIndex}
            onChange={(e) => setCurIndex(e.target.value)}
            id="tabs"
            className="h-full w-full py-2 px-4 text-md bg-gray-50 border border-gray-300 text-gray-900 sm:text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block  "
          >
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
          <button
            onClick={() => setModal(true)}
            class="w-full bg-transparent hover:bg-footer-darkblue text-footer-darkblue font-semibold hover:text-white py-2 px-4 border border-footer-darkblue hover:border-transparent rounded"
          >
            Share File
          </button>
          <button
            onClick={() => fetchUserFiles()}
            class="w-full bg-transparent hover:bg-footer-darkblue text-footer-darkblue font-semibold hover:text-white py-2 px-4 border border-footer-darkblue hover:border-transparent rounded"
          >
            Reset Filter
          </button>
        </div>
      </div>
      {/* table */}
      <p className="font-semibold text-center text-2xl my-4">
        {curIndex == 0 ? "Received Files" : "Shared Files"}
      </p>
      <div className="flex md:w-full justify-center items-center px-3 md:px-0 overflow-scroll md:overflow-hidden">
        <div class="overflow-x-auto shadow-xl sm:rounded-lg mb-5">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="py-3 px-6">
                  #
                </th>
                <th scope="col" class="py-3 px-6">
                  File Name
                </th>
                <th scope="col" class="py-3 px-6">
                  Address
                </th>
                <th scope="col" class="py-3 px-6">
                  Description
                </th>
                <th scope="col" class="py-3 px-6">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {curIndex == 0
                ? receivedFiles.map((ele, index) => (
                    <tr class="bg-white border-b " key={index}>
                      <th
                        scope="row"
                        class="py-4 px-6 font-medium text-footer-darkblue whitespace-nowrap "
                      >
                        {index + 1}
                      </th>
                      <th
                        scope="row"
                        class="py-4 px-6 font-medium text-footer-darkblue whitespace-nowrap truncate"
                      >
                        {ele.name}
                      </th>
                      <td class="py-4 px-6 text-footer-darkblue">{ele.from}</td>
                      <td class="py-4 px-6 text-footer-darkblue">
                        {ele.description}
                      </td>
                      <td class="py-4 px-6 text-footer-darkblue">
                        <a
                          // href="#"
                          onClick={() => {
                            window.open(ele.link, "_blank");
                          }}
                          class="inline-flex items-center text-blue-600 hover:underline"
                        >
                          Open
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
                      </td>
                    </tr>
                  ))
                : sharedFiles.map((ele, index) => (
                    <tr class="bg-white border-b " key={index}>
                      <th
                        scope="row"
                        class="py-4 px-6 font-medium text-footer-darkblue whitespace-nowrap "
                      >
                        {index + 1}
                      </th>
                      <th
                        scope="row"
                        class="py-4 px-6 font-medium text-footer-darkblue whitespace-nowrap truncate"
                      >
                        {ele.name}
                      </th>
                      <td class="py-4 px-6 text-footer-darkblue">{ele.to}</td>
                      <td class="py-4 px-6 text-footer-darkblue">
                        {ele.description}
                      </td>
                      <td class="py-4 px-6 text-footer-darkblue">
                        <a
                          // href="#"
                          onClick={() => {
                            window.open(ele.link, "_blank");
                          }}
                          class="inline-flex items-center text-blue-600 hover:underline"
                        >
                          Open
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
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
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
                  <div className="w-3/4">
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Receiver Address
                    </label>
                    <input
                      type="text"
                      id="receiverAddress"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Receiver Address"
                      required
                    />
                  </div>
                  <div className="w-3/4">
                    <label
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      for="small_size"
                    >
                      Upload File
                    </label>
                    <input
                      class="block w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer "
                      id="default_size"
                      onChange={(e) => setFile(e.target.files[0])}
                      type="file"
                    />
                  </div>
                  <div className="w-3/4">
                    <label
                      for="first_name"
                      class="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Description
                    </label>
                    <textarea
                      maxlength="150"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      id="description"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Description - max.length 150"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={sendFile}
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
    </>
  );
}
