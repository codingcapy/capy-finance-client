

import { NavLink } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import { IoHomeSharp } from "react-icons/io5";

export default function Header() {

    const { logoutService, user } = useAuthStore((state) => state)
    const userId = user?.userId || null

    return (
        <header className="sticky z-50 top-0 py-5 md:flex justify-between bg-slate-900 text-white">
            <div className="flex flex-col md:flex-row">
                <NavLink to="/" className="px-5">CapyFinance</NavLink>
                <NavLink to="/" className="flex px-5"><IoHomeSharp size={20} className=" text-center mx-2" /> Home</NavLink>
                {user && <NavLink to={`/dashboard/${user.userId}`} className="px-5">Dashboard</NavLink>}
            </div>
            <div>
                <NavLink to="/" className="px-5">About</NavLink>
                <NavLink to="/" className="px-5">Contact</NavLink>
            </div>
            <div>
                {!user && <NavLink to="/users/login" className="px-5">Login</NavLink>}
                {!user && <NavLink to="/users/signup" className="px-5">Sign Up</NavLink>}
                {user && <NavLink to={`/users/${userId}`} className="text-center py-2 md:py-4 px-5">{user.username}</NavLink>}
                {user && <NavLink to="/" onClick={logoutService} className="text-center py-2 md:py-4 px-5">Logout</NavLink>}
            </div>
        </header>
    )
}