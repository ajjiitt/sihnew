import React, { useState, useEffect } from "react";
import { db } from "../../Utils/firebaseConfig";
import { collection, getDocs, limit, query } from "firebase/firestore";
const RecentDisasterAdmin = () => {
  const [newsDisaster, setNewsDisaster] = useState([]);
  const getData = async () => {
    const querySapshoot = await getDocs(
      query(collection(db, "disasters"), limit(2))
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
    console.log(newsDisaster);
  }, []);
  return <div>RecentDisasterAdmin</div>;
};

export default RecentDisasterAdmin;
