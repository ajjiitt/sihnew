import { Web3Storage } from "web3.storage";
const storeFiles = async (files) => {
  const client = new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEM3NjFlMjRCQWMyZGFDMzY3MWViNEM5MkU0MUM4MzMwMDQxMjM2ZDkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTk5ODQ1MDEyNDEsIm5hbWUiOiJUcm9qYW5IZXgifQ.APiCo9i29EdV4gBxka1HrnKseI4huwDUT30gy3N82iY",
  });
  // let fileNameNoSpaces = files.name;
  // const tempFile = files;
  // tempFile.name = fileNameNoSpaces;
  // files.name = files.name.replace(/ /g, '_');
  const cid = await client.put([files]);
  console.log(`https://${cid}.ipfs.dweb.link/${files.name}`);
  //https://dweb.link/ipfs
  return { cid, link: `https://${cid}.ipfs.dweb.link/${files.name}` };
};

export default storeFiles;
