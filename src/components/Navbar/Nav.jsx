"use client"
import Link from "next/link";
import NavLi from "./NavLi";
import { useState } from "react";

const Nav = () => {
    const [isSideMenuOpen, setSideMenuOpen] = useState(false);

    const toggleSideMenu = () => {
      setSideMenuOpen(!isSideMenuOpen);
    };
    return (
        <div>
            <header className="sticky top-0 z-40 flex-none mx-auto w-full bg-white dark:bg-gray-900 left-0 border-b border-gray-200 dark:border-gray-700">
                <div className="w-full px-3 py-3 mx-auto lg:flex lg:justify-between max-w-8xl lg:px-3">
                    <nav className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700 px-2 sm:px-4 py-2.5 w-full">
                        <div className="mx-auto flex flex-wrap justify-between items-center container">
                            <div className="flex justify-between w-full lg:w-auto">
                                <div className="flex items-center">
                                    <Link href="/" className="flex items-center">
                                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">&lt; Luminous&gt;Internet for all</span>
                                    </Link>
                                </div>
                                
                                <div className="flex items-center lg:hidden" onClick={toggleSideMenu}>
                                    <a href="#" target="_blank" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"> hello
                                        <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"></svg>
                                    </a>
                                    <button aria-label="Dark mode" type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                                        <span className="hidden dark:block">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg>
                                        </span>
                                        <span className="block dark:hidden">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg>
                                        </span>
                                    </button>
                                    <button type="button" className="focus:outline-none whitespace-normal m-0.5 rounded-lg focus:ring-2 p-1.5 focus:ring-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 ml-3 md:hidden" aria-label="Open main menu">
                                        <span className="sr-only">Open main menu</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" role="button" tabIndex="0" width="24" height="24" className="h-6 w-6 shrink-0" aria-label="bars 3" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center w-full lg:w-auto">
                                <div className="w-full md:block md:w-auto hidden">
                                    <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                                        <NavLi text="Home" />
                                        <NavLi text="About" />
                                        <NavLi text="Sitemap" />
                                        <NavLi text="Contact" />

                                    </ul>
                                </div>

                                {isSideMenuOpen && <div className="lg:self-center flex items-center mb-4 lg:mb-0 hidden mr-3 lg:flex">
                                    <div className="items-center mr-3 flex">
                                        <a href="#" target="_blank" className="hidden xl:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
                                            <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"></svg>
                                        </a>
                                        <button aria-label="Dark mode" type="button" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                                            <span className="hidden dark:block">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg>
                                            </span>
                                            <span className="block dark:hidden">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"></svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>}
                                


                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
}

export default Nav;