
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import useAuthStore from "../store/AuthStore"

export default function LoginPage() {

    const navigate = useNavigate()
    const { loginService, authLoading, user } = useAuthStore((state) => state)
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (!!user) {
            navigate(`/capy-finance-client/dashboard/${user.userId}`)
        }
    }, [user])

    async function onLogin(e) {
        e.preventDefault()
        let username = e.target.username?.value;
        let password = e.target.password?.value
        if (!username || !password) return
        loginService(username, password)
        if (!user) {
            setMessage("Invalid login credentials");
        }
    }

    return (
        <div>
            <form onSubmit={onLogin} className="flex flex-col text-white">
                <h2 className="py-10 text-2xl font-medium text-center">Login</h2>
                <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Username" required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <div className="flex flex-col my-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Password" required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <button className="rounded-xl my-5 py-2 px-2 bg-slate-600 text-white">Login</button>
                <NavLink to="/capy-finance-client/users/signup" className="text-center">Sign Up</NavLink>
            </form>
        </div>
    )
}