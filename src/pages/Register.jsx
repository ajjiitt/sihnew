import React from 'react'

const Register = () => {
    const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
    return (
        <div >
            <div className='flex items-center justify-center'>
                <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div class="max-w-md w-full space-y-8 " >
                        <div>
                            {/* <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600" alt="Workflow" /> */}
                            <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Register</h2>
                        </div>
                        <form class="mt-8 space-y-6" >
                            <div class="rounded-md shadow-sm -space-y-px">
                                <div className='my-2'> 
                                    <label for="email-address" class=" text-black">Name of Authority</label>
                                    <input id="name" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                                </div>
                                <div className='flex flex-col pt-2'> 
                                    <label for="cars">Authority</label>
                                    <select name="cars" id="cars" className='p-2 border-1 border-black'>
                                        <option value="Central">Central</option>
                                        <option value="State">State</option>
                                        <option value="Ground">Ground</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                                        {/* <!-- Heroicon name: solid/lock-closed --> */}
                                        <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                        </svg>
                                    </span>
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register