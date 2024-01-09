
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: signup page jsx for capy finance client
 */

import { NavLink, useNavigate } from "react-router-dom"
import DOMAIN from "../services/endpoint"
import axios from "axios"
import { useState } from "react"

export default function SignupPage() {

    const navigate = useNavigate();
    const [message, setMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        const username = e.target.username.value;
        const password = e.target.password.value;
        const newUser = { username, password }
        const res = await axios.post(`${DOMAIN}/api/v1/users/`, newUser)
        if (res?.data.success) {
            setMessage(res?.data.message)
            navigate("/capy-finance-client/users/login")
        }
        else {
            setMessage(res?.data.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col text-white">
                <h2 className="py-10 text-2xl font-medium text-center">Sign Up</h2>
                <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username" required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <div className="flex flex-col my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <button className="rounded-xl my-5 py-2 px-2 bg-slate-600 text-white">Sign Up</button>
                <NavLink to="/capy-finance-client/users/login" className="text-center">Login</NavLink>
            </form>
            <p>{message}</p>
        </div>
    )
}