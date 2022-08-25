import React from 'react'

const DisasterAlertCard = () => {
    return (
        <div>
            <section className="basis-3/4 flex flex-col md:flex-row box-border  md:pr-9 md:pt-11 pt-4 mb-14" >
                <div className="basis-1/2 box-border md:pr-0 flex justify-center items-center overflow-hidden h-96 sm:h-[28rem] p-3 md:p-0"  >
                    <img src="https://ndrf.gov.in/sites/default/files/Dk5e-FhUwAAn5qT.jpg" style={{ width: "100%" }} alt='' />
                </div>
                <div className="basis-1/2 flex flex-col sm:flex-row px-5 sm:pl-0 ">
                    <div className="basis-1/6 ">

                    </div>
                    <div class="basis-5/6 pt-5">
                        <div className='flex flex-row items-center justify-start'>
                            <div className='w-11 h-0' style={{ borderTop: "3px solid #c5b58f" }}>
                            </div>
                            <div className='pl-1 tracking-wider text-xl font-semibold text-buttonOrange' >
                                Priority
                            </div>
                        </div>

                        <div className='flex items-start text-left mt-4'>
                            <span className="font-semibold font-sans text-4xl sm:text-4xl md:text-5xl">Flood in <br></br>Konkan</span>
                        </div>
                        <div className='w-11 my-4' style={{ borderTop: "3px solid black" }}>
                        </div>
                        <div className=" font-thin text-left text-xl flex flex-row justify-start items-center">
                            {/* <LocationOnOutlinedIcon className="m-2" /> */}
                            <p className='text-xs from-neutral-800 font-thin text-left '>  NDRF has always led from the front, displayed high level of dedication & commitment, fulfilling our motto आपदा सेवा सदैव सर्वत्र which implies Sustained Disaster Response Service under all circumstances. The sincerity, professionalism and devotion displayed by the Rescuers during disasters have popularized NDRF so much among citizens that the NDRF Rescuers have been named “Angels in Disaster” by our fellow citizens.</p>
                        </div>
                        <div className="flex flex-start items-center justify-start mt-7"

                        >
                            <button
                                 className="flex  mt-6 text-white  bg-gradient-to-tr from bg-orange-500 to-bg-yellow-500 border-0 py-2 px-5 focus:outline-none hover:bg-buttonOrange shadow-md hover:shadow rounded">
                                Read More
                            </button>
                        </div>

                    </div>
                </div>

            </section>
        </div>
    )
}

export default DisasterAlertCard