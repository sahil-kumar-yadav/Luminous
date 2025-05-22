import Link from "next/link";

const NavLi = ({ text }) => {
    return (
        <li>
            <Link href="#" className=" font-bold z-10">{text}</Link>
        </li> 
    );
}

export default NavLi;