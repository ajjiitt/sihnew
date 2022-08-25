import React, { useState, useEffect } from "react";
import { db } from "../Utils/firebaseConfig";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  collection,
  getDocs,
  limit,
  query,
  addDoc,
  doc,
} from "firebase/firestore";
const RecentDisasters = () => {
  const [newsDisaster, setNewsDisaster] = useState([]);
  const getData = async () => {
    const querySapshoot = await getDocs(
      query(collection(db, "disasters"), limit(10))
    )
      .then((res) => {
        let tempARr = [];
        res.forEach((doc) => {
          console.log(doc.data());
          tempARr.push(doc.data());
        });
        console.log(tempARr);
        setNewsDisaster(tempARr);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(newsDisaster);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className=" px-3  rounded-lg   ">
      <div className="flex flex-row items-center justify-start pb-3">
        <div
          className="w-11 h-0"
          style={{ borderTop: "3px solid #c5b58f" }}
        ></div>
        <div className="pl-1 tracking-wider text-xl font-semibold  text-buttonOrange">
          Recent Disasters
        </div>
      </div>
      <div className="flex flex-col pl-2 pt-4 gap-2 max-h-[31rem] scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-orange-100 overflow-y-scroll">
        {newsDisaster?.map((d) => (
          <>
            <div
              onClick={() => window.open(d.link, "_blank")}
              className="flex flex-row items-start hover:text-buttonOrange hover:pl-1 justify-start cursor-pointer"
            >
              <KeyboardDoubleArrowRightIcon
                className=""
                style={{ height: "25px", width: "25px" }}
              />
              <p className=" ml-2 pr-4" style={{ fontSize: "13px" }}>
                {d.description}
              </p>
            </div>
            <hr />
          </>
        ))}
      </div>
    </div>
  );
};

export default RecentDisasters;
