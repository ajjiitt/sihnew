import React, { useState, useEffect } from "react";
import { db } from "../../Utils/firebaseConfig";
import {
  collection,
  getDocs,
  limit,
  query,
  addDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";
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
  const addData = async (link, description) => {
    if (link.length > 5 && description.length > 0) {
      await addDoc(collection(db, "disasters"), {
        link,
        description,
      })
        .then((res) => {
          console.log(res.id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please fill all fields");
    }
  };
  useEffect(() => {
    getData();
    // addData("https://github.com/machadop1407/firebase-react-crud/blob/main/src/firebase-config.js","Learn Firebase");
    console.log(newsDisaster);
  }, []);
  return <div>RecentDisasterAdmin</div>;
};

export default RecentDisasterAdmin;
