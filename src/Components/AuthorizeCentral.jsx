import React,{ useState, useEffect } from 'react'
import { getAccountID, intializeMasterContract } from '../Utils/connectWallet';

const AuthorizeCentral = () => {
  const [buttoncolor,setButtonColor] = useState(0);
  const [centralArr, setCentralArr] = useState([]);
  const [ contract ] = useState(intializeMasterContract());
  // const contract = intializeMasterContract();
  const fetchCentralAuthorities = async () => {
    let central = await contract.methods.getRegCenter().call();
    setCentralArr(central);
    // let arr = [];
    // central.forEach((ele) => {
    //   arr.push({ele, isApproved(ele)});
    // })
    // const arr = central.forEach( async (element, index) => {
    //   central[index].state = await isApproved(element.registerAddress);
    // });
    // console.log(arr);
    // let arr = central;
    // central.forEach((ele) => {
    //   const obj = {ele.name}
    //   setCentralArr([...centralArr, {ele.name, ele.}])
    // })
    // setCentralArr(
    //   arr.map((ele) => ({...ele, state: isApproved(ele.registerAddress).then(function(results){
    //     ele.state = results;
    //     return ele.state;
    //   })}))
    // );
  }
  
  console.log(centralArr);
  // const createCenterLevel = async () => {
  //   const contract = intializeRegisterContract();
  // }
  const getDisasterName = async () => {
    const contract = intializeMasterContract();
    const disasterName = await contract.methods.isCenter("0xabE45d16e0390b9611098a2A58d25484D75d6F6E").call();
    console.log(disasterName);

  } 

  const isApproved = async (address)=> {
    const response = await contract.methods.isCenter(address).call();
    console.log(response);
    return response;
  }

  const createCenterLevel = async (events, name, address) => {
    events.preventDefault();
    const accoundId = await getAccountID();
    const newCenter = await contract.methods.createCenterLevel(address, name).send({from: accoundId});
    console.log(newCenter);
  }
  
  useEffect(() => {
    fetchCentralAuthorities();
    // getDisasterName();
  }, [])
  return (
    <div >
      <p className='font-semibold text-center text-2xl'>ALL AUTHORITIES</p>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden border-1 border-gray-400  rounded-lg">
              <table className="min-w-full ">
                <thead className="bg-white  ">
                  <tr className='bg-gray-200'>
                    <th scope="col" className="text-center  text-sm font-medium text-gray-900 px-6 py-4 ">
                      Authority Name
                    </th>
                    <th scope="col" className="text-center text-sm font-medium text-gray-900 px-6 py-4 ">
                      Address
                    </th>
                    <th scope="col" className=" text-center text-sm font-medium text-gray-900 px-6 py-4 ">
                      Approved?
                    </th>
                  </tr>
                </thead>
                <tbody className='text-center'>
                  {
                    centralArr.map( (ele, index) => {
                      // console.log(ekle)
                      return (
                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ele.name}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {ele.registerAddress}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <button className='rounded-xl text-black p-3 font-semibold' style={{backgroundColor: ele.state ?"#e6e629a1":"#42c642d6"}}
                            onClick={(events)=>{
                              createCenterLevel(events, ele.name, ele.registerAddress);
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
  )
}

export default AuthorizeCentral