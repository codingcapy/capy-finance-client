


import { useNavigate } from "react-router-dom"
import useAuthStore from "../store/AuthStore"
import axios from "axios"
import DOMAIN from "../services/endpoint"

export default function CreatePlanPage() {

    const navigate = useNavigate()
    const { user } = useAuthStore((state) => state)
    const currentUserId = parseInt(user.userId)

    async function handleSubmit(e) {
        e.preventDefault()
        const title = e.target.title.value;
        const content = e.target.content.value
        const username = user.username
        const userId = currentUserId;
        const newPlan = { title, content, username, userId }
        const res = await axios.post(`${DOMAIN}/api/v1/plans`, newPlan)
        if (res?.data.success) {
            navigate("/dashboard")
        }
    }

    return (
        <div>
            <h2 className="py-10 text-2xl text-white font-medium text-center">Create Financial Plan</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex flex-col">
                    <label htmlFor="title" >Title</label>
                    <input type="text" name='title' id='title' placeholder="Title" required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <div className="flex flex-col my-2">
                    <label htmlFor="content">Description</label>
                    <textarea type="text" name='content' id='content' placeholder='Description' required rows="2" cols="40" className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <button type="submit" className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white">Create</button>
            </form>
        </div>
    )
}