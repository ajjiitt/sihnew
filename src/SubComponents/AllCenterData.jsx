import React, { useEffect } from 'react'
import { intializeDisasterContract } from '../Utils/connectWallet'
const AllCenterData = () => {

  const contract = intializeDisasterContract("0xb8EC8BA2Be1781C3Ac6B9cF7B5204FFe9f34885C");

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