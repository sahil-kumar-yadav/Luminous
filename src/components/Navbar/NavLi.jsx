import Link from "next/link";

const NavLi = ({ text }) => {
    return (
        <li>
            <Link href="#" className="block py-2 pr-4 pl-3 md:p-0 rounded md:border-0 text-black bg-primary-700 md:bg-transparent md:text-primary-700 md:dark:text-white dark:bg-primary-600 md:dark:bg-transparent">{text}</Link>
        </li>
    );
}

export default NavLi;