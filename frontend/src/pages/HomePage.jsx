
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export const HomePage = () => {
    return <div className='min-h-screen bg-gray-900'>
        <div>
            <div className="flex justify-between ">
                <div className="flex justify-start px-4 pt-4">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bg-white size-10">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                    </div>
                    <div className="font-bold text-4xl text-gray-50 px-2">Phone Se</div>
                </div>

                <div className="flex justify-end pr-4 pt-4" >
                    <div className='pr-3 pt-1 text-2xl text-gray-50'>
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
                                        href="http://localhost:5173/signup"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                    >
                                        Sign up
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        href="http://localhost:5173/signin"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                    >
                                        Sign in
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        href="http://localhost:5173/About Us"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                    >
                                        About Us
                                    </a>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
            <div className='pt-20 '>
                <div className="text-center pt-15 mt-10">
                    <div className="text-blue-500 font-bold text-5xl">
                        Pay with Phone Se
                    </div>
                    <br></br>
                    <div className="text-gray-50 font-bold text-5xl">
                        Seamless, fast, and easy
                    </div>
                </div>
            </div>
            <div className='pt-20 '>
                <img class="max-h-w-full mx-auto rounded-lg" src="https://img.freepik.com/free-vector/flat-receiving-cashback-bonus-from-paying-online_88138-766.jpg" alt="image description" />
            </div>
        </div>
    </div>

}





