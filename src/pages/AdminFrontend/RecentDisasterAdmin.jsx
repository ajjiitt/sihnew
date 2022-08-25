import React, { useState, useEffect } from "react";
import { db } from "../../Utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
const RecentDisasterAdmin = () => {
  const [newsDisaster, setNewsDisaster] = useState([]);
  const getData = async () => {
    await getDocs(collection(db, "disasters"))
      .then((res) => {
        let tempARr = [];
        res.forEach((doc) => {
          console.log(doc.data());
          tempARr.push(doc.data());
        });
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
  getData();
  return <div>RecentDisasterAdmin</div>;
};

export default RecentDisasterAdmin;
