import Web3 from "web3";
import MasterContractABI from './MasterContractABI.json';
import DisasterContractABI from './DisasterContractABI.json';

const MasterContractAddress = "0xC092c7CB9eD833D896B0A0e1908e2178e3933013";
const DisasterContractAddress = "0xb8EC8BA2Be1781C3Ac6B9cF7B5204FFe9f34885C";

export const intializeMasterContract = () => {
    const web3 = new Web3(Web3.givenProvider);
    return new web3.eth.Contract(MasterContractABI, MasterContractAddress);
};
export const intializeDisasterContract = () => {
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