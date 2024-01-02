import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";



export default function Router() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />}/>
                <Route path="/dashboard" element={<DashboardPage />}/>
                <Route path="/users/login" element={<LoginPage />}/>
                <Route path="/users/signup" element={<SignupPage />}/>
            </Route>
        )
    )
    return router
}