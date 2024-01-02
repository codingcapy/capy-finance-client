
import { NavLink } from "react-router-dom"
import useAuthStore from "../store/AuthStore"

export default function DashboardPage(){

    const { logoutService, user } = useAuthStore((state)=>state)

    return(
        <div className="py-5">
            <h1 className="text-3xl font-bold text-center py-5 ">Welcome, {user.username}!</h1>
            <div className="border rounded-xl py-5 px-5 my-5 bg-slate-500">
                    <NavLink to="/plans/create">Create Financial Plan</NavLink>
                </div>
        </div>
    )
}