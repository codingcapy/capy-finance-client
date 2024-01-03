import useAuthStore from "../store/AuthStore"


export default function ProfilePage() {

    const { user } = useAuthStore((state) => state)

    return (
        <div>
            <h1 className="text-3xl font-bold text-center py-5 ">Your Profile</h1>
            <p>Username: {user.username}</p>
            <button className="rounded-xl my-5 py-2 px-2 bg-slate-700 text-white" >Change password</button>
        </div>
    )
}