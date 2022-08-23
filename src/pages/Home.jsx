import React from "react";
import DisasterAlertCard from "../Cards/DisasterAlertCard";
import ImageSlider from "../Cards/ImageSlider";
import Homepagebanner from "../Components/Homepagebanner";
import RecentDisasters from "../Cards/RecentDisasters";
import StoreIcon from '@mui/icons-material/Store';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export default function Home() {
  return (
    <div className="md:px-20">
      {/* <Homepagebanner /> */}
      <ImageSlider />
      <div className="flex  flex-col md:flex-row mb-10">
        <div className="basis-3/4">
          <DisasterAlertCard />
        </div>
        <div className="basis-1/4 border-l-2 border-gray-300 flex pl-3 justify-center">
          <RecentDisasters />
        </div>
      </div>

      <div className="flex justify-center items-center flex-col bg-orange-100 rounded-md pt-10">
        {/* title */}
        <div className='flex flex-row items-center justify-start pb-3'>
          <div className='w-11 h-0' style={{ borderTop: "3px solid #c5b58f" }}>
          </div>
          <div className='pl-1 tracking-wider text-2xl font-semibold text-buttonOrange' >
            Steps to Connect Metamask Wallet
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
            <div className=" ">
              <div className="flex justify-center items-center flex-col p-5 ">
                <div className="rounded-full bg-buttonOrange flex items-center justify-center p-9">
                  <StoreIcon className="text-gray-700" style={{height:"45px",width:"45px"}} />
                </div>
                <div className="flex flex-col text-center p-4 items-center justify-center">
                  <p className="font-bold ">Find Metamask in webstore</p>
                  <p className="text-sm text-gray-600 italic pt-2">From Chrome Webstore, just click on “Add to Chrome”<br className="visible md:hidden"/>  to add the MetaMask extension into your browser.</p>
                </div>
              </div>
            </div>
            <div className="flex items-start md:pt-20 justify-center">
              <hr className="md:border-t-2 md:border-r-0  border-r-2 border-t-0 border-dashed border-gray-600 md:w-32 md:h-2 w-2 h-20"/>
            </div>
            <div className="">
              <div className="flex justify-center items-center flex-col p-5">
                <div className="rounded-full bg-buttonOrange flex items-center justify-center p-9">
                  <PlaylistAddIcon className="text-gray-700" style={{height:"45px",width:"45px"}} />
                </div>
                <div className="flex flex-col text-center p-4">
                  <p className="font-bold ">Find Metamask in webstore</p>
                  <p className="text-sm text-gray-600 italic pt-2">Then click on “Add Extension” and immediately you will see the <br className="visible md:hidden"/> icon of MetaMask  on the right part of the<br className="visible md:hidden"/> navbar navigation of your Chrome browser.</p>
                </div>
              </div>
            </div>
            <div className="flex items-start md:pt-20 justify-center">
              <hr className="md:border-t-2 border-r-2 md:border-r-0 border-t-0 border-dashed border-gray-600 md:w-32 md:h-2 w-2 h-20"/>
            </div>
            <div className="">
              <div className="flex justify-center items-center flex-col p-5">
                <div className="rounded-full bg-buttonOrange flex items-center justify-center p-9">
                  <AssignmentTurnedInIcon className="text-gray-700" style={{height:"45px",width:"45px"}} />
                </div>
                <div className="flex flex-col text-center p-4">
                  <p className="font-bold ">Find Metamask in webstore</p>
                  <p className="text-sm text-gray-600 italic pt-2">Now Metamask is succesfully added to browser.<br className="visible md:hidden"/> Now Connect your Metamask to website</p>
                </div>
              </div>
            </div>
        </div>
      </div>

    </div>
  );
}
