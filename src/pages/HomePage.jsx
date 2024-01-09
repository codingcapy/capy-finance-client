
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: home page jsx for capy finance client
 */

import { NavLink } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Financial Plan',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

let count = 1000

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Net savings 2023',
            data: labels.map(() => count+=500),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export default function HomePage() {

    const { user } = useAuthStore((state) => state)

    return (
        <div className="py-5">
            <h1 className="text-3xl font-bold text-center py-5 ">
                Create financial plans for yourself, your loved ones, family, friends and clients!
            </h1>
            <Line options={options} data={data} />
            {!user && <p className="text-center py-5">Please sign up or log in to use this app!</p>}
            {!user && <div className="flex flex-col items-center">
                <div className="border rounded-xl py-5 px-5 my-5 bg-slate-500">
                    <NavLink to="/capy-finance-client/users/login">Login</NavLink>
                </div>
                <NavLink to="/capy-finance-client/users/signup" className="underline">Sign Up</NavLink>
            </div>}
            {user && <div className="flex flex-col items-center">
                <div className="border rounded-xl py-5 px-5 my-5 bg-slate-500">
                    <NavLink to={`/capy-finance-client/dashboard/${user.userId}`}>Go to Dashboard</NavLink>
                </div>
            </div>}
        </div>
    )
}