import React from "react";
export default function Homepagebanner() {
  return (
    <div
      style={{
        backgroundImage: `url('https://cdn.discordapp.com/attachments/1005565612749246467/1009563352814596126/unknown.png')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        opacity:"0.8"
      }}
      className="h-full w-full py-48 flex flex-col items-center justify-around text-white gap-3 text-center "
    >
      <div className="font-thin text-sm">Give Hopes for Homeless</div>
      <div className="text-6xl text-center text-bold">
        Helping each other <br /> can make world better
      </div>
      <div className="text-base">
        We are a transparent platform that help in reaching out to the people
        stuck in Calamities and help them.
      </div>
      <div className="flex gap-1 text-sm">
        <button className="max p-5 bg-orange-600 ">Donate Now</button>
        <button className="p-5 border-2 border-orange-600">
          Know about us
        </button>
      </div>
    </div>
  );
}
