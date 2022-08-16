import React from "react";
import instagram from "../assets/instagram.svg";
import twitter from "../assets/twitter.svg";
import youtube from "../assets/youtube.svg";
export default function Footer() {
  return (
    <>
      <div className="h-80 bg-footer-darkblue flex justify-center mx-10/12 text-white gap-1">
        {/* div1 */}
        <div className="w-2/12 text-xl font-bold flex items-center justify-center">
          10K <br /> user already <br /> connected worldwide
        </div>
        {/* div2 */}
        <div className="w-5/12 flex justify-around mx-5 mt-20">
          <div>
            <div className="my-2 font-bold"> Quick Links</div>
            <div className="flex gap-1 flex-col text-grey-copyright">
              <div>Home</div>
              <div>About</div>
              <div>XYZ</div>
              <div>XYZ</div>
            </div>
          </div>

          <div>
            <div className="my-2 font-bold"> Get Intouch</div>
            <div className="flex gap-1 flex-col text-grey-copyright">
              <div>Contact us</div>
            </div>
          </div>

          <div>
            <div className="my-2 font-bold">Address</div>
            <div className="flex gap-1 flex-col text-grey-copyright">
              <div>Mumbai, Mahrashtra</div>
            </div>
          </div>
        </div>
        {/* div3 */}
        <div className="w-3/12 flex items-start justify-center flex-col gap-2">
          <div className="text-bold">Follow Us</div>
          <div className="flex gap-3">
            <img src={instagram} alt="instagram" />
            <img src={twitter} alt="twitter" />
            <img src={youtube} alt="youtube" />
          </div>
        </div>
      </div>
      <div className="bg-footer-darkblue flex justify-center">
        <div className="w-8/12 text-grey-copyright text-sm flex justify-center py-3 border-t-1 border-grey-copyright">
          copyright &copy; 2022. All rights reserved. Privacy policy
        </div>
      </div>
    </>
  );
}
