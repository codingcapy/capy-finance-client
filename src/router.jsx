

import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage, { pageLoader } from "./pages/DashboardPage";
import CreatePlanPage from "./pages/CreatePlanPage";

export default function Router() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard/:userId" element={<DashboardPage />} loader={pageLoader} />
                <Route path="/users/login" element={<LoginPage />} />
                <Route path="/users/signup" element={<SignupPage />} />
                <Route path="/plans/create" element={<CreatePlanPage />} />
            </Route>
        )
    )
    return router
}