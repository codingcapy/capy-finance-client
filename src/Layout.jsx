

import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"

export default function Layout() {

    return (
        <div className="flex flex-col min-h-screen bg-slate-800 text-white">
            <Header />
            <main className="flex-1 mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}