
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: router jsx for capy finance client
 */

import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage, { pageLoader } from "./pages/DashboardPage";
import CreatePlanPage from "./pages/CreatePlanPage";
import PlanPage, { planLoader } from "./pages/PlanPage";
import ProfilePage from "./pages/ProfilePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

export default function Router() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />}>
                <Route path="/capy-finance-client/" element={<HomePage />} />
                <Route path="/capy-finance-client/dashboard/:userId" element={<DashboardPage />} loader={pageLoader} />
                <Route path="/capy-finance-client/about" element={<AboutPage />} />
                <Route path="/capy-finance-client/contact" element={<ContactPage />} />
                <Route path="/capy-finance-client/plans/create" element={<CreatePlanPage />} />
                <Route path="/capy-finance-client/plans/:planId" element={<PlanPage />} loader={planLoader} />
                <Route path="/capy-finance-client/users/login" element={<LoginPage />} />
                <Route path="/capy-finance-client/users/signup" element={<SignupPage />} />
                <Route path="/capy-finance-client/users/:userId" element={<ProfilePage />} />
            </Route>
        )
    )
    return router
}