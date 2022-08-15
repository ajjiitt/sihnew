import React, { useEffect } from 'react'
import { intializeDisasterContract } from '../Utils/connectWallet'
const AllCenterData = () => {

  const contract = intializeDisasterContract();

  const fetchDisasterViaIndex = async () => {
    const disaster = await contract.methods.getCenterData().call();
    console.log(disaster);
  } 

  useEffect(() => {
    
    fetchDisasterViaIndex();

  }, [])
  return (
    <div>
        
    </div>
  )
}

export default AllCenterData