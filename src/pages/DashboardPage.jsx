
import { NavLink, useLoaderData } from "react-router-dom"
import useAuthStore from "../store/AuthStore"
import axios from "axios"
import DOMAIN from "../services/endpoint"

export default function DashboardPage() {

    const data = useLoaderData()
    const { user } = useAuthStore((state) => state)

    return (
        <div className="py-5">
            <h1 className="text-3xl font-bold text-center py-5 ">Welcome, {user.username}!</h1>
            <h2 className="text-2xl font-bold text-center py-5 ">Your Financial Plans</h2>
            <div className="md:grid md:gap-4 md:grid-cols-3">
                {data.map((plan) =>
                    <div key={plan.planId} className="border border-white rounded-xl px-3 py-3">
                        <NavLink to={`/capy-finance-client/plans/${plan.planId}`} className="flex flex-col text-center">
                            <h3 className="text-xl font-bold text-center py-5 ">{plan.title}</h3>
                            <p>{plan.content}</p>
                        </NavLink>
                    </div>)}
            </div>
            <div className="border rounded-xl py-5 px-5 my-5 bg-slate-500 text-center">
                <NavLink to="/capy-finance-client/plans/create" >Create Financial Plan</NavLink>
            </div>
        </div>
    )
}

export async function pageLoader({ params }) {
    const res = await axios.get(`${DOMAIN}/api/v1/plans/${params.userId}`)
    return res.data
}