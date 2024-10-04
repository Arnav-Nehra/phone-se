import Balance from "../components/Balance";
import Users from "../components/Users";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import axios from "axios";
import { useState } from "react";
export const Dashboard = () => {
    const [balance,setBalance]=useState("")
    return <div>
        <div className='min-h-screen bg-white'>
            <div>
                <div className="flex justify-between ">
                    <div className="flex justify-start px-4 pt-4">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-white size-10">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </div>
                        <div className="font-bold text-4xl text-black px-2">Phone Se</div>
                    </div>

                    <div className="flex justify-end pr-4 pt-4" >
                        <div className='pr-3 pt-1 text-2xl text-black'>
                            Welcome Back
                        </div>
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 pt-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    Menu
                                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                                </MenuButton>
                            </div>

                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <a
                                            href="http://localhost:5173/signin"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                        >
                                            Update Details
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            
                                            href="http://localhost:5173/signup"
                                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                        >
                                            Sign out
                                        </a>
                                    </MenuItem>

                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
            <div className="m-8">
            <div className="flex justify-start">
            <Balance value={Math.round(balance)} />
            <div>
            <button type="button" class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4
             focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-blue-600
              dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={async ()=>{
                let userid="Bearer " + localStorage.getItem("token")
                console.log(userid)
                const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
                    headers:{
                        'Authorization':userid
                    }
                })
                .then((res)=>{setBalance(res.data.balance)})
              }}>Fetch</button>
            </div>
            </div>
            <Users />
            </div>
        </div>
    </div>
}