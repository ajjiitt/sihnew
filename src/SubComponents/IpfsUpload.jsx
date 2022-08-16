import React, { useState } from "react";
import { Web3Storage } from "web3.storage";
import storeFiles from "../Utils/storeFiles";
export default function IpfsUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(selectedFile);
  return (
    <input
      type="file"
      value={selectedFile}
      onChange={async (e) => await storeFiles(e.target.files[0])}
    />
  );
}
