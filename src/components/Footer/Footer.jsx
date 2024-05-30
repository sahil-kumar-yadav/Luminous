const Footer = () => {
    return (
        <div>
            <footer className="p-4 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 rounded-none">
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023
                    <a href="#" target="_blank" className="hover:underline">Team xyz</a>
                    All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li className="mr-4 last:mr-0 md:mr-6">
                        <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                    </li>
                    <li className="mr-4 last:mr-0 md:mr-6">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                    </li>
                </ul>
            </footer>
        </div>
    );
}

export default Footer;