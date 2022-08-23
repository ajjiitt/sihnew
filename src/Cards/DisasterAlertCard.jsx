import React from 'react'

const DisasterAlertCard = () => {
    return (
        <div>
            <section className="basis-3/4 flex flex-col md:flex-row box-border  md:pr-9 md:pt-11 pt-4 mb-14" >
                <div className="basis-1/2 box-border md:pr-0 flex justify-center items-center overflow-hidden h-96 sm:h-[28rem] p-3 md:p-0"  >
                    <img src="https://ndrf.gov.in/sites/default/files/Dk5e-FhUwAAn5qT.jpg" style={{ width: "100%", height: "100%" }} alt='' />
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
                            <p className='text-base from-neutral-800 font-thin text-left'>lorem ipsum dolopr awd anwl dawn lda wdlka wd lakwdalkw<br></br> life at! We pawdaw dawdawwd d awd awd awd awd aw<br></br>aw wadCalifornia andwd awd wjd wd awkdwkd aw dk</p>
                        </div>
                        <div className="flex flex-start items-center justify-start mt-7"

                        >
                            <button
                                style={{ boxShadow: "10px 10px 10px #80808085", cursor: "pointer" }} className="ml-0 h-12 w-36 border-2 text-md font-semibold  leading-normal text-gray-800 hover:bg-amber-500 bg-buttonOrange m-2">
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