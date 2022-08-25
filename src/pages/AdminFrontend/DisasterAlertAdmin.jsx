import React from 'react'

const DisasterAlertAdmin = () => {
    return (
        <div>
            <div>
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
                                                    Title
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                                                >
                                                    Image
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <input type="text" className='p-2 ' value="title" disabled />
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap overflow-x-scroll">
                                                    <input type="text" className='p-2 ' value="image" disabled />
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap overflow-x-scroll">
                                                    <input type="text" className='p-2 ' value="description" disabled />
                                                </td>
                                                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <button className='bg-yellow-600 py-2 text-white px-4 rounded-lg'>
                                                        Edit
                                                    </button>
                                                </td>
                                                {/* <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <button onClick={() => {
                                                        deleteData();
                                                    }} className='bg-red-600 py-2 text-white px-4 rounded-lg'>
                                                        Delete
                                                    </button>
                                                </td> */}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default DisasterAlertAdmin