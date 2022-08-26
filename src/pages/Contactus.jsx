import React from 'react'

const Contactus = () => {
    return (
        <div className='my-5 pb-3 md:px-20 px-3'>
            <section class="text-gray-600 body-font relative">
                <div className='flex justify-center items-center py-5'>
                    <p className='text-4xl text-black font-bold shadow p-5'>Contact Us</p>
                </div>
                <div class="container px-5 py-6 mx-auto flex sm:flex-nowrap flex-wrap">
                    <div class="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative  ">
                        <iframe width="100%" height="100%" class="absolute inset-0 " frameborder="0" title="map" marginheight="0" marginwidth="0" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14009.59566824656!2d77.20375053509446!3d28.617803905128902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd4b9839fb11%3A0x5bab46b0895abf9f!2sMinistry%20of%20Home%20Affairs%20(MHA)!5e0!3m2!1sen!2sin!4v1628242985071!5m2!1sen!2sin"></iframe>
                        <div class="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                            <div class="lg:w-1/2 px-6 ">
                                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">ADDRESS</h2>
                                <p class="mt-1 text-sm">DIRECTORATE GENERAL ,NATIONAL DISASTER RESPONSE FORCE,
                                    6th FLOOR, NDCC-II BUILDING, JAI SINGH ROAD, NEW DELHI-110001</p>
                            </div>
                            <div class="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs">EMAIL</h2>
                                <a class="text-indigo-500 leading-relaxed">hq.ndrf@nic.in</a>
                                {/* <h2 class="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">PHONE</h2>
                                <p class="leading-relaxed">123-456-7890</p> */}
                            </div>
                        </div>
                    </div>
                    <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 shadow-md p-5">
                        <h2 class="text-orange-500 text-xl mb-1 font-bold capitalize title-font mt-4">Contact Details of NDRF Headquarters</h2>
                        <p class="leading-relaxed mb-5 text-sm text-gray-600 mt-2">Directorate General ,National Disaster Response Force, <br></br>6th Floor, NDCC-II Building, Jai Singh Road, <br></br>NEW DELHI-110001</p>
                        <h2 class="text-orange-500 text-xl mb-1 font-bold capitalize title-font mt-4">Control Room Details </h2>
                        <p class="leading-relaxed mb-5 text-sm text-gray-600 mt-2">TELE/FAX NO. - 011-23438091, 011-23438136 <br></br>EMAIL ID - hq.ndrf@nic.in</p>
                        <h2 class="text-orange-500 text-xl mb-1 font-bold capitalize title-font mt-4">Exchange / Reception Details</h2>
                        <p class="leading-relaxed mb-5 text-sm text-gray-600  mt-2">NO. - 011-23438017,  011-23438019,</p>
                        
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contactus