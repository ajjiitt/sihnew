import React, { useState, useEffect } from 'react'
import { intializeMasterContract } from '../Utils/connectWallet';
const AllDisasters = () => {

  const [disasters, setDisasters] = useState([]);

  const fetchAllDisasters = async () => {
    const contract = intializeMasterContract();
    const disasters = await contract.methods.getDisasters().call();
    setDisasters(disasters);
    console.log(disasters);
  }

  useEffect(() => {
    fetchAllDisasters();
  }, [])

  return (
    <div>
        {disasters.map((ele, index) => {
            return (
              <div key={index}>
                <div>
                  {ele.disasterName} 
                </div>
                <div>
                  {ele.disastarContract}
                </div>
              </div>
            )
        })}
    </div>
  )
}

export default AllDisasters;