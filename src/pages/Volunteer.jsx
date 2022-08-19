import React from "react";
import coin from "../assets/coin.svg";
const Volunteer = () => {
  const redeemToken = () => {
    console.log("redeemed token");
  };
  return (
    <div class="flex justify-center my-10">
      <div class="block p-6 rounded-lg shadow-lg bg-white">
        <div className="w-full flex items-center justify-center flex-col gap-5">
          <img
            class="w-1/2 h-1/2"
            src={`https://avatars.dicebear.com/4.5/api/human/${Math.floor(
              Math.random() * 5000
            )}.svg`}
            alt="Rounded avatar"
          ></img>
          <p className="text-bold">Click below button to redeem your tokens</p>
          <button
            onClick={redeemToken}
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <img className="w-10 m-3" src={coin} alt="" />
            <span>Redeem</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
