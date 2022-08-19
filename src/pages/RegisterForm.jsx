import React, { useState } from "react";

export default function RegisterForm() {
  const [authorityName, setAuthorityName] = useState("");
  const [role, setRole] = useState("");
  const registerUser = () => {
    console.log({ authorityName, role });
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
                    </select>
                  </div>
                  <div className="flex flex-col mt-8">
                    <button
                      type="submit"
                      onClick={registerUser}
                      className="bg-blackDmain bg-footer-darkblue text-white hover:text-footer-darkblue hover:bg-white hover:border-1 hover:border-footer-darkblue  text-sm font-semibold py-2 px-4 rounded"
                    >
                      Login
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
              backgroundImage: `url('https://images.pexels.com/photos/12747521/pexels-photo-12747521.png?cs=srgb&dl=pexels-ryan-morris-12747521.jpg&fm=jpg')`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
