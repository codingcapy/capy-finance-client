

import { NavLink } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import { IoHomeSharp } from "react-icons/io5";
import { useState } from "react";

export default function Header() {

    const { logoutService, user } = useAuthStore((state) => state)
    const userId = user?.userId || null
    const [expandedMenu, setExpandedMenu] = useState(window.innerWidth > 500 ? true : false)

    function toggleMenu() {
        setExpandedMenu(!expandedMenu)
    }

    return (
        <header className="sticky z-50 top-0 py-1 md:flex justify-between bg-slate-900 text-white">
            {expandedMenu && <div className="flex flex-col md:flex-row">
                <NavLink to="/capy-finance-client/" className="text-center py-4 px-5 mx-auto" onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}>CapyFinance</NavLink>
                <NavLink to="/capy-finance-client/" className="flex py-2 md:py-4 mx-auto" onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}><IoHomeSharp size={20} className=" text-center mx-2" /> Home</NavLink>
                {user && <NavLink to={`/dashboard/${user.userId}`} className="text-center py-2 md:py-4 px-5" onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}>Dashboard</NavLink>}
            </div>}
            {expandedMenu && <div className="flex flex-col md:block md:py-4">
                <NavLink to="/capy-finance-client/" className="text-center py-2 px-5 mx-auto" onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}>About</NavLink>
                <NavLink to="/capy-finance-client/" className="text-center py-2 px-5 mx-auto" onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}>Contact</NavLink>
            </div>}
            {expandedMenu && <div className="flex flex-col md:block md:py-4">
                {!user && <NavLink to="/capy-finance-client/users/login" className="text-center py-2 md:py-4 px-5" onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}>Login</NavLink>}
                {!user && <NavLink to="/capy-finance-client/users/signup" className="text-center py-2 md:py-4 px-5" onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}>Sign Up</NavLink>}
                {user && <NavLink to={`/capy-finance-client/users/${userId}`} className="text-center py-2 md:py-4 px-5" onClick={() => setExpandedMenu(window.innerWidth < 500 ? false : true)}>{user.username}</NavLink>}
                {user && <NavLink to="/" onClick={logoutService} className="text-center py-2 md:py-2 px-5">Logout</NavLink>}
            </div>}
            {expandedMenu && <div onClick={toggleMenu} className="text-center py-2 md:py-4 text-2xl md:hidden">&#127828;</div>}
            <div className="flex justify-between md:hidden">
                {!expandedMenu && <NavLink to="/" className="py-2 px-2 md:hidden">CapyFinance</NavLink>}
                {!expandedMenu && <div onClick={toggleMenu} className="text-3xl md:hidden">&#127828;</div>}
            </div>
        </header>
    )
}