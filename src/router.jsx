

import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage, { pageLoader } from "./pages/DashboardPage";
import CreatePlanPage from "./pages/CreatePlanPage";
import PlanPage, { planLoader } from "./pages/PlanPage";
import ProfilePage from "./pages/ProfilePage";

export default function Router() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />}>
                <Route path="/capy-finance-client/" element={<HomePage />} />
                <Route path="/dashboard/:userId" element={<DashboardPage />} loader={pageLoader} />
                <Route path="/plans/create" element={<CreatePlanPage />} />
                <Route path="/plans/:planId" element={<PlanPage />} loader={planLoader} />
                <Route path="/users/login" element={<LoginPage />} />
                <Route path="/users/signup" element={<SignupPage />} />
                <Route path="/users/:userId" element={<ProfilePage />} />
            </Route>
        )
    )
    return router
}