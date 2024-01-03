
import { NavLink, useLoaderData } from "react-router-dom"
import useAuthStore from "../store/AuthStore"
import axios from "axios"
import DOMAIN from "../services/endpoint"

export default function DashboardPage() {

    const data = useLoaderData()
    const { user } = useAuthStore((state) => state)
    console.log(data)
    return (
        <div className="py-5">
            <h1 className="text-3xl font-bold text-center py-5 ">Welcome, {user.username}!</h1>
            <h1 className="text-2xl font-bold text-center py-5 ">Your Financial Plans</h1>
            {data.map((plan) => <div>{plan.title}</div>)}
            <div className="border rounded-xl py-5 px-5 my-5 bg-slate-500">
                <NavLink to="/plans/create">Create Financial Plan</NavLink>
            </div>
        </div>
    )
}

export async function pageLoader({ params }) {
    const res = await axios.get(`${DOMAIN}/api/v1/plans/${params.userId}`)
    return res.data
}