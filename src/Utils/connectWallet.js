import Web3 from "web3";
import MasterContractABI from './MasterContractABI.json';
import DisasterContractABI from './DisasterContractABI.json';
// import RegisterDataABI from './RegisterDataABI.json';

// const MasterContractAddress = "0xdd28763CEf20664047Bb08a1eB457d56b0FCef49";
const MasterContractAddress = "0x73eF28D5d4A0519c007C42d0Ba34Fe4EF96362fD";
// const RegisterDataContractAddress = "0xcDb089c1B785Db76C607Ce4C4C8C1eD6EB4c50B8";
// const DisasterContractAddress = "0xb8EC8BA2Be1781C3Ac6B9cF7B5204FFe9f34885C";

export const intializeMasterContract = () => {
    const web3 = new Web3(Web3.givenProvider);
    return new web3.eth.Contract(MasterContractABI, MasterContractAddress);
};

export const intializeDisasterContract = (DisasterContractAddress) => {
    const web3 = new Web3(Web3.givenProvider);
    return new web3.eth.Contract(DisasterContractABI, DisasterContractAddress);
};

export const connectWallet = async(setdata) => {
    await window.ethereum
        .request({
            method: "eth_requestAccounts",
        })
        .then((account) => {
            console.log("Account :" + account);
            console.log("Type Disaster");
            // console.log(contract.methods);
            console.log("Main");
            // console.log(mainContract.methods);
            localStorage.setItem("account", account[0]);
            setdata({ address: account[0] });
        });
};
export const getAccountID = async() => {
    const id = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    console.log(id[0], "here");
    return id[0];
};

export const disconnectWallet = async(setdata) => {
    setdata({ address: "" });
    localStorage.removeItem("account");
};