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
import { data } from "autoprefixer";
const RecentDisasterAdmin = () => {
    const [modal, setModal] = useState(false);
    const [newsDisaster, setNewsDisaster] = useState([]);
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const getData = async () => {
        const querySapshoot = await getDocs(
            query(collection(db, "disasters"), limit(30))
        )
            .then((res) => {
                let tempARr = [];
                res.forEach((doc) => {
                    tempARr.push({ ...doc.data(), id: data.id });
                    console.log(doc.data());
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
    const addData = async () => {
        if (link.length > 5 && description.length > 0) {
            await addDoc(collection(db, "disasters"), {
                link,
                description,
            })
                .then((res) => {
                    console.log(res.id);
                    getData();
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast.error("Please fill all fields");
        }
    };
    const deleteData = async (id) => {
        console.log('Clicked');
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
            <div className="flex items-center pt-4 justify-center pb-8">
                <button
                    onClick={() => setModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md">
                    Add
                </button>
            </div>
            <div className="px-11 md:px-24 mb-5 py-5">
                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">

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
                                            return (
                                                <tr key={key} class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key + 1}</td>
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
                                                        <button onClick={() => {
                                                            deleteData();
                                                        }} className='bg-red-600 py-2 text-white px-4 rounded-lg'>
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

            {/* Modal Code */}
            <div
                className={modal ? "relative z-10" : "relative z-10 hidden"}
                id="fileUploadModal"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="flex flex-col items-center justify-center gap-5">
                                    <div className="text-2xl">
                                        Share File
                                    </div>
                                    <div className="w-3/4">
                                        <label
                                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            for="small_size"
                                        >
                                            Link
                                        </label>
                                        <input
                                            class="block w-full text-xs p-3 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer "
                                            id="default_size"
                                            onChange={(e) => setLink(e.target.value)}
                                            type="text"
                                        />
                                    </div>
                                    <div className="w-3/4">
                                        <label
                                            for="first_name"
                                            class="block mb-2 text-sm font-medium text-gray-900 "
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            maxlength="150"
                                            type="text"
                                            onChange={(e) => setDescription(e.target.value)}
                                            id="description"
                                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                            placeholder="Description - max.length 150"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={() => {
                                        addData();

                                    }}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setModal(false)}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecentDisasterAdmin;
