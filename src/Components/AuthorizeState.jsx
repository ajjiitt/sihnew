import React,{useState} from 'react'

const AuthorizeState = () => {
  const [buttoncolor,setButtonColor] = useState(0);
  return (
    <div>
      <div >
        <p className='font-semibold text-center text-2xl'>STATE AUTHORITIES</p>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden border-1 border-gray-400  rounded-lg">
                <table class="min-w-full ">
                  <thead class="bg-white  ">
                    <tr className='bg-gray-200'>
                      <th scope="col" class="text-center  text-sm font-medium text-gray-900 px-6 py-4 ">
                        Authority Name
                      </th>
                      <th scope="col" class="text-center text-sm font-medium text-gray-900 px-6 py-4 ">
                        Address
                      </th>
                      <th scope="col" class=" text-center text-sm font-medium text-gray-900 px-6 py-4 ">
                        Approved?
                      </th>
                    </tr>
                  </thead>
                  <tbody className='text-center'>
                    <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Vasant patil</td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Mark
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button className='rounded-xl text-black p-3 font-semibold' style={{ backgroundColor: buttoncolor ? "#e6e629a1" : "#42c642d6" }}
                          onClick={() => {
                            if (buttoncolor) {
                              setButtonColor(0);
                            }
                            else {
                              setButtonColor(1);
                            }
                          }}
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                    <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Vasant patil</td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Mark
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button className='rounded-xl bg-green-500 text-black p-3 font-semibold'>
                          Approve
                        </button>
                      </td>
                    </tr><tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 ">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Vasant patil</td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Mark
                      </td>
                      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <button className='rounded-xl bg-green-500 text-black p-3 font-semibold'>
                          Approve
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorizeState