import React, { useState, useEffect } from "react";
import { db } from "../../Utils/firebaseConfig";
import {
    collection,
    getDocs,
    limit,
    query,
    addDoc,
    doc,
    deleteDoc,
    setDoc,
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
                tempARr.reverse();
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
    const deleteData = async (id) => {
        await deleteDoc(doc(db, "disasters", id))
            .then(() => {
                toast.info("News Deleted Successfully.");
            })
            .catch((err) => {
                toast.error("Something went wrong while Deleting");
            });
    };
    const updateData = async (id, link, description) => {
        await setDoc(doc(db, "disasters", id), {
            link,
            description,
        })
            .then((res) => {
                toast.info("News Updated Successfully.");
            })
            .catch((err) => {
                toast.error("Something went wrong while Updating");
            });
    };
    useEffect(() => {
        getData();
        // deleteData("zAENYBttzZVwJzPNIeyt");
        // updateData(
        //     "WtBctf6aia9FjGIazyen",
        //     "https://firebase.google.com/docs/firestore/query-data/order-limit-data",
        //     "test"
        // );
        // addData("https://github.com/machadop1407/firebase-react-crud/blob/main/src/firebase-config.js","Learn Firebase");
        console.log(newsDisaster);
    }, []);

    
    
    return (
        <div>
            <div className="flex justify-center items-center mb-5 py-5">
                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="flex items-center justify-center pb-8">
                                <button className="px-4 py-2 bg-green-600 text-white rounded-md">
                                    Add
                                </button>
                            </div>
                            <div class="overflow-hidden">
                                <table class="min-w-full">
                                    <thead class="bg-white border-b">
                                        <tr>
                                            <th
                                                scope="col"
                                                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                #
                                            </th>
                                            <th
                                                scope="col"
                                                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                Link
                                            </th>
                                            <th
                                                scope="col"
                                                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                Description
                                            </th>
                                            <th
                                                scope="col"
                                                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                Edit?
                                            </th>
                                            <th
                                                scope="col"
                                                class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                            >
                                                Delete?
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {newsDisaster.map((data, key) => {
                                            return(
                                            <tr key={key} class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <input type="text" className='p-2 ' value={data.description} disabled />
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap overflow-x-scroll">
                                                    <input type="text" className='p-2 ' value={data.link} disabled />
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <button className='bg-yellow-600 py-2 text-white px-4 rounded-lg'>
                                                        Edit
                                                    </button>
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <button className='bg-red-600 py-2 text-white px-4 rounded-lg'>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                            )
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentDisasterAdmin;
