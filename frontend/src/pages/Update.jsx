import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Invalid } from '../components/Invalid'
import axios from "axios"
import { InputBox } from '../components/InputBox'

export const Update = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("")
    const [invalidd, setInvalidd] = useState("")
    const body = {
        firstName: firstName,
        lastName: lastName,
        password: password
    }
    const headers = {
        'Authorization': "Bearer " + localStorage.getItem("token")
    }
    return <div>
        <div className='min-h-screen bg-gray-900 '>
            <div className="flex justify-between ">
                <div className="flex justify-start px-4 pt-4">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-white size-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </div>
                    <div className="font-bold text-4xl text-white px-2">Phone Se</div>
                </div>

                <div className="flex justify-end pr-4 pt-4" >
                    <div className='pr-3 pt-1 text-2xl text-white'>
                        Welcome Back
                    </div>
                    <div>
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                     dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Out</button>
                    </div>
                </div>
            </div>

            <div className="pt-20">
                <form class="max-w-md mx-auto">
                    <div className='flex justify-start font-semibold font-sans text-red-600 text-2xl'>
                        Update Details
                    </div>
                    <div className='py-4'>
                        <InputBox label={"Password"} onChange={(e) => { setPassword(e.target.value) }} placeholder={"newPassword"}></InputBox>
                        <InputBox label={"First Name"} onChange={(e) => { setFirstName(e.target.value) }} placeholder={"newName"}></InputBox>
                        <InputBox label={"Last Name"} onChange={(e) => { setLastName(e.target.value) }} placeholder={"newName"}></InputBox>
                    </div>
                    <div className='pb-4 '>
                        <Invalid invalid={invalidd}></Invalid>
                    </div>
                    <button type="submit" onClick={async () => {
                        const response = await axios.put("http://localhost:3000/api/v1/user/update", body, { headers })
                            .catch((err) => {
                                if (err) {
                                    setInvalidd("error")
                                }
                            })
                    }
                } class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                    text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
    </div>
}