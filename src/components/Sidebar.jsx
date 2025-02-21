import React, { useState } from 'react';
import Logo from "../assets/sparkle1.png";
import { LayoutDashboard, StretchHorizontal, ChevronFirst, ChevronsUpDown, ChevronDown, Settings, Puzzle, BookOpen, SquareKanban, User, ChartPie, CopyCheck } from 'lucide-react';

const Sidebar = () => {

    const [open, setOpen] = useState(true);
    const [submenuOpen, setSubmenuOpen] = useState(false)
    const Menus = [
        { title: "Dashboard", icon: <LayoutDashboard /> },
        { title: "Test Plan", icon: <StretchHorizontal /> },
        {
            title: "Create Test",
            icon: <SquareKanban />,
            submenu: true,
            submenuItem: [
                { title: "Test Cases" },
                { title: "Shared Steps" }
            ]
        },
        { title: "Test Suites", icon: <CopyCheck /> },
        { title: "Test Run", icon: <ChartPie /> },
        { title: "Test Data", icon: <User /> },
        { title: "Integration", icon: <Puzzle />, spacing: true },
        { title: "Settings", icon: <Settings /> },
        { title: "View Documentaion", icon: <BookOpen /> },
    ]
    return (
        <div className={`bg-gray-100 h-screen p-5 pt-8 ${open ? "w-72" : "w-20"} relative`}>
            <ChevronFirst className={` text-black text-3xl cursor-pointer
             bg-red-200 rounded-full border-black absolute -right-3 duration-300 top-9 ${!open && "rotate-180"} `} onClick={() => setOpen(!open)} />

            {/* logo part */}
            <div className='inline-flex'>
                <img src={Logo} className={`w-8 h-8 rounded block float-left mr-2 duration-500 cursor-pointer ${open && "rotate-[360deg]"} `} alt="" />
                <h3 className={`text-gray-900 origin-left font-medium duration-300 text-xl ${!open && "scale-0"}`}>TB Copilot</h3>
            </div>
            {/* ranjan part */}

            <form class={`flex max-w-sm mt-3 mx-auto ${!open ? "px-2.5" : "px-4"}`}>
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose a Project</option>
                    <option value="NP">Nishi's Project</option>
                    <option value="RP">Ranjan's Project</option>
                    <option value="PP">Punit's Project</option>
                    <option value="AP">Ankita's Project</option>
                </select>
            </form>


            <ul className='pt-2'>
                {Menus.map((menu, index) => (
                    <>
                        <li key={index} className={`text-sm text-gray-900 flex items-center gap-x-4 p-2 cursor-pointer hover:bg-gray-200
                        rounded-md ${menu.spacing ? "mt-12" : "mt-2"}`}>
                            <span className='text-2xl block float-left'>
                                {menu.icon ? menu.icon : <LayoutDashboard />}
                            </span>
                            <span className={`text-base font-medium flex-1 duration-200 ${!open && "hidden"}`}>{menu.title}</span>
                            {menu.submenu && open && (
                                <ChevronDown className={`${submenuOpen && "rotate-180"}`} onClick={() => { setSubmenuOpen(!submenuOpen) }} />
                            )}
                        </li>
                        {menu.submenu && submenuOpen && open && (
                            <ul>
                                {menu.submenuItem.map((submenuItem, index) => (
                                    <li key={index} className={`text-sm font-semibold
                                     text-gray-900 flex items-center gap-x-4 p-2 px-12 cursor-pointer hover:bg-gray-200rounded-md ${menu.spacing ? "mt-12" : "mt-2"}`}>
                                        {submenuItem.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                ))}
            </ul>

            {/* card part */}
            <div class={`w-full max-w-md mt-4 bg-gray-200 border border-gray-200 rounded-lg shadow-sm sm:p-4 dark:bg-gray-800 dark:border-gray-700`}>
                <div class={`flex items-center ${!open ? "mx-[-12.5px]" : "mx-[4px]"}`}>
                    <div class="shrink-0">
                        <img class="w-8 h-8 rounded-full" src="https://avatars.githubusercontent.com/u/73206636?v=4" alt="Neil image" />
                    </div>
                    <div class="flex-1 min-w-0 ms-4">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            Punit Panda
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            Hello@Punit.com
                        </p>
                    </div>
                    <div class="inline-flex items-center text-base sm:hidden font-semibold text-gray-900 dark:text-white">
                        <ChevronsUpDown />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Sidebar