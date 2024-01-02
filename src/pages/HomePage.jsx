import { NavLink } from "react-router-dom";


export default function HomePage() {

    return (
        <div className="py-5">
            <h1 className="text-3xl font-bold text-center py-5 ">
            Create financial plans for yourself, your loved ones, family, friends and clients!
            </h1>
            <p className="text-center py-5">Please sign up or log in to use this app!</p>
            <div className="flex flex-col items-center">
                <div className="border rounded-xl py-5 px-5 my-5 bg-slate-500">
                    <NavLink to="/users/login">Login</NavLink>
                </div>
                <NavLink to="/users/signup"className="underline">Sign Up</NavLink>
            </div>
        </div>
    )
}