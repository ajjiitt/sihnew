import React, { useState } from "react";
import storeFiles from "../Utils/storeFiles";
const FileSharing = () => {
  return (
    <div className="flex items-center justify-center my-5 flex-col px-9 md:px-24">
      <FileShareForm />
      <FileTable />
    </div>
  );
};

export default FileSharing;

const FileShareForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [address, setAdddress] = useState("");
  const uploadFile = async () => {
    if (selectedFile != null) {
      await storeFiles(selectedFile)
        .then((res) => {
          console.log({
            link: res.link,
            address,
            fileName: selectedFile.name,
            time: new Date().getTime(),
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("No file selected");
    }
  };
  return (
    <div className="p-2 md:p-6 rounded-lg shadow-lg bg-white max-w-full mb-5">
      <div className="form-group mb-6">
        <input
          type="text"
          className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="address"
          placeholder="Address"
          onChange={(e) => setAdddress(e.target.value)}
        />
      </div>
      <input
        type="file"
        className="mb-6 w-full"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      />
      <button
        className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
        onClick={uploadFile}
      >
        Submit
      </button>
    </div>
  );
};

const FileTable = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const color = "footer-darkblue";
  return (
    <>
      <div className="flex flex-wrap w-full">
        <div className=" w-full ">
          <ul
            className="flex mb-0 list-none flex-col pt-3 pb-4 md:flex-row w-full gap-3"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center ">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-" + color + " bg-white"
                    : "text-white bg-" + color)
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Received Files
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center ">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-" + color + " bg-white"
                    : "text-white bg-" + color)
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Shared Files
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <ReceivedFilesTable />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <SharedFilesTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SharedFilesTable = () => {
  const [files, setFiles] = useState([
    {
      link: "https://bafybeiac3g2z6jue3fqizgyct733po4kad7sccdh63cr3j5gjbimili2la.ipfs.dweb.link/404.png",
      address: "0x1234567890123456789012345678901234567890",
      fileName: "404.png",
      time: 1660865357314,
    },
  ]);
  return (
    <div className="sm:flex items-center justify-center text-xs">
      {files.length !== 0 ? (
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        File Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Link
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file, index) => (
                      <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {file.fileName}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {file.address}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {/* {file.link} */}
                          <a
                            href={file.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-footer-darkblue hover:text-black visited:text-purple-600"
                          >
                            Open
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-black">
          No files shared yet.
        </div>
      )}
    </div>
  );
};

const ReceivedFilesTable = () => {
  const [files, setFiles] = useState([
    {
      link: "https://bafybeiac3g2z6jue3fqizgyct733po4kad7sccdh63cr3j5gjbimili2la.ipfs.dweb.link/404.png",
      address: "0x1234567890123456789012345678901234567890",
      fileName: "404.png",
      time: 1660865357314,
    },
  ]);
  return (
    <div className="sm:flex items-center justify-center text-xs">
      {files.length !== 0 ? (
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        No.
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        File Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Address
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Link
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file, index) => (
                      <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {file.fileName}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {file.address}
                        </td>
                        <td className="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {/* {file.link} */}
                          <a
                            href={file.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-footer-darkblue hover:text-black visited:text-purple-600"
                          >
                            Open
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-black">
          No files shared yet.
        </div>
      )}
    </div>
  );
};
