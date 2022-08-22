import React, { useState, useEffect } from 'react'
import { getAccountID, intializeMasterContract } from '../Utils/connectWallet';
import storeFiles from "../Utils/storeFiles";

const DocumentForum = (props) => {
  const contract = intializeMasterContract();
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [address, setAddress] = useState("");
  const [search, setSearch] = useState("");
  const [description, setDescription] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  const sendFile = async () => {
    if (file && address.length > 10) {
      await storeFiles(file)
        .then( async (res) => {
          const today = new Date();
          console.log({
            link: res.link,
            description,
            sendAddress: address,
            fileName: file.name,
            time:
              today.getDate() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getFullYear(),
          });
          console.log(props.contract, "cow");
          const accoundId = await getAccountID();
          const sharedFile = await contract.methods.shareFileGlobal(props.contract, file.name, description, res.link, today.getDate() +"-" +
          (today.getMonth() + 1) +
          "-" +
          today.getFullYear()).send({from : accoundId});
          console.log(sharedFile);
          fetchGlobalFiles();
        })
        .then(() => {
          setModal(false);
        })
        .catch((err) => console.log(err));
    }
  };

    const fetchGlobalFiles = async () => {
        console.log(props.contract, "cow");
        const getAllFiles = await contract.methods.getFilesGlobally(props.contract).call();
        console.log(getAllFiles);             
        setAllFiles(getAllFiles);
    }

  useEffect(() => {
    fetchGlobalFiles();
  }, []);

  return (
    <>
    <div>DocumentForum</div>

    <div>
    <button
            onClick={() => setModal(true)}
            class="w-full bg-transparent hover:bg-footer-darkblue text-footer-darkblue font-semibold hover:text-white py-2 px-4 border border-footer-darkblue hover:border-transparent rounded"
          >
            Share File
          </button>
    </div>
    <div>
        {allFiles.map((ele, index) => {
            return (
                <div key={index}>
                <div>{ele.name}</div>
                <div>{ele.description}</div>
                <div>{ele.link}</div>
                <div>{ele.time}</div>
                <div>{ele.from}</div>
                </div>
            )
        })}
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
  )
}

export default DocumentForum