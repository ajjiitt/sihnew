import React,{ useState, useEffect } from 'react';
import { getAccountID, intializeMasterContract } from '../Utils/connectWallet';

const AuthorizeGround = () => {

  const [groundArr, setGroundArr] = useState([]); 

  const contract = intializeMasterContract();

  const fetchGroundAuthorities = async () => {
    const ground = await contract.methods.getRegCenter(2).call();
    setGroundArr(ground);
    console.log(ground);
  }

  const createGroundLevel = async (events, name, address) => {
    events.preventDefault();
    const accoundId = await getAccountID();
    const newCenter = await contract.methods.createLevel(address, name, 2).send({from: accoundId});
    console.log(newCenter);
  }
  
  useEffect(() => {
    fetchGroundAuthorities();
  }, []);

  return (
    <div>
      <div >
        <p className='font-semibold text-center text-2xl'>Ground Authorities</p>
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
                  {
                    groundArr.map( (ele, index) => {
                      console.log(ele)
                      return (
                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ele.name}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {ele.registerAddress}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button className='rounded-xl text-black p-3 font-semibold' style={{backgroundColor: ele.state ?"#e6e629a1":"#42c642d6"}}
                            onClick={(events)=>{
                                createGroundLevel(events, ele.name, ele.registerAddress);
                            }}
                          >
                            Approve
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
  )
}

export default AuthorizeGround