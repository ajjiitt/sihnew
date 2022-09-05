
import React, { useState } from "react";
import { toast } from "react-toastify";
import { getAccountID, intializeMasterContract } from "../Utils/connectWallet";

export default function RegisterForm() {
  let id;
  const [authorityName, setAuthorityName] = useState("");
  const [role, setRole] = useState("");
  const registerUser = async (e) => {
    console.log("cow");
    e.preventDefault();
    if (role == "Select") toast.warning("Please select a role");
    console.log({ authorityName, role });
    id = toast.loading("Registering", {
      position: "top-center",
      // closeOnClick: true,
    });

    register()
      .then((res) => {
        toast.update(id, {
          render: "User registered successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setAuthorityName("");
        setRole("");
      })
      .catch((err) => {
        toast.update(id, {
          render: "Failed to register user  ",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
  };
  const register = async () => {
    const accountId = await getAccountID();
    const contract = intializeMasterContract();
    let user;
    if (role === "Central") {
      user = await contract.methods
        .regAuth(authorityName, accountId, 0)
        .send({ from: accountId });
    } else if (role === "State") {
      user = await contract.methods
        .regAuth(authorityName, accountId, 1)
        .send({ from: accountId });
    } else if (role === "Ground") {
      user = await contract.methods
        .regAuth(authorityName, accountId, 2)
        .send({ from: accountId });
    } else {
      user = await contract.methods
        .regAuth(authorityName, accountId, 3)
        .send({ from: accountId });
    }
    return user;
  };

  return (
    <div className="bg-main h-screen w-screen my-5">
      <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
        <div
          className="flex rounded-lg shadow-lg w-full sm:w-3/4 lg:w-1/2 bg-white sm:mx-0"
          style={{ height: "500px" }}
        >
          <div className="flex flex-col w-full md:w-1/2 p-4">
            <div className="flex flex-col flex-1 justify-center mb-8">
              <h1 className="text-4xl text-center font-thin">REGISTER USER</h1>
              <div className="w-full mt-4">
                <div className="form-horizontal w-3/4 mx-auto">
                  <div className="flex flex-col mt-4">
                    <input
                      id="authorityName"
                      type="text"
                      className="flex-grow h-8 px-2 border rounded border-grey-400"
                      name="email"
                      placeholder="Authority Name"
                      value={authorityName}
                      onChange={(e) => setAuthorityName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <select
                      id="role"
                      className="flex-grow h-8 px-2 rounded border border-grey-400"
                      name="role"
                      required
                      placeholder="Select Your Role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option default>Select</option>
                      <option>Central</option>
                      <option>State</option>
                      <option>Ground</option>
                      <option>Volunteer</option>
                    </select>
                  </div>
                  <div className="flex flex-col mt-8">
                    <button
                      type="submit"
                      onClick={(e) => registerUser(e)}
                      className="bg-[#22262F] text-white hover:text-footer-darkblue hover:bg-white hover:border-1 hover:border-footer-darkblue  text-sm font-semibold py-2 px-4 rounded"
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="hidden md:block md:w-1/2 rounded-r-lg"
            style={{
              // backgroundImage: `url("https://images.unsplash.com/photo-1515965885361-f1e0095517ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80")`,
              backgroundImage: `url('ndrfvertical.jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
