


import { useLoaderData, useNavigate } from "react-router-dom"
import axios from "axios"
import DOMAIN from "../services/endpoint"
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
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import Income from "../components/Income";
import { useState } from "react";
import Fixed from "../components/Fixed";
import Variable from "../components/Variable";
import Asset from "../components/Asset";
import Liability from "../components/Liability";

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

export default function PlanPage() {

    const data = useLoaderData()
    const navigate = useNavigate()
    const [expandedIncome, setExpandedIncome] = useState(false)
    const [submitIncomeMode, setSubmitIncomeMode] = useState(false)
    const [expandedFixed, setExpandedFixed] = useState(false)
    const [submitFixedMode, setSubmitFixedMode] = useState(false)
    const [expandedVariable, setExpandedVariable] = useState(false)
    const [submitVariableMode, setSubmitVariableMode] = useState(false)
    const [expandedAssets, setExpandedAssets] = useState(false)
    const [submitAssetMode, setSubmitAssetMode] = useState(false)
    const [expandedLiabilities, setExpandedLiabilities] = useState(false)
    const [submitLiabilityMode, setSubmitLiabilityMode] = useState(false)
    const [incomeMessage, setIncomeMessage] = useState("")
    const [fixedMessage, setFixedMessage] = useState("")
    const [variableMessage, setVariableMessage] = useState("")
    const [assetMessage, setAssetMessage] = useState("")
    const [liabilityMessage, setLiabilityMessage] = useState("")
    const netIncomes = []
    const totalExpenditure = data.fixed.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0) + data.variable.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
    const totalAssets = data.assets.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
    const totalLiabilities = data.liabilities.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
    let netWorth = totalAssets - totalLiabilities
    data.income.forEach((value) => {
        const netIncome = (value.value - value.value * value.taxRate / 100) / 12;
        netIncomes.push(netIncome)
    })
    const totalNetIncomes = netIncomes.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    const netMonthlyBalance = totalNetIncomes - totalExpenditure
    const options = {
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
    const chartData = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Net Worth 2024',
                data: labels.map(() => netWorth += netMonthlyBalance),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    async function submitIncome(e) {
        e.preventDefault()
        const title = e.target.title.value
        const content = e.target.content.value
        const value = e.target.value.value
        if (isNaN(value)) {
            setIncomeMessage("Value must be a numeric value");
            return;
        }
        const taxRate = e.target.taxrate.value
        if (isNaN(taxRate)) {
            setIncomeMessage("Tax rate must be a numeric value");
            return;
        }
        const startDate = e.target.startdate.value
        const endDate = e.target.enddate.value
        const planId = data.plan.planId
        const newIncome = { title, content, value, taxRate, startDate, endDate, planId }
        const res = await axios.post(`${DOMAIN}/api/v1/incomes`, newIncome)
        if (res?.data.success) {
            setSubmitIncomeMode(false)
            navigate(`/plans/${data.plan.planId}`)
        }
    }

    async function submitFixed(e) {
        e.preventDefault()
        const title = e.target.title.value
        const content = e.target.content.value
        const value = e.target.value.value
        if (isNaN(value)) {
            setFixedMessage("Value must be a numeric value");
            return;
        }
        const startDate = e.target.startdate.value
        const endDate = e.target.enddate.value
        const planId = data.plan.planId
        const newFixed = { title, content, value, startDate, endDate, planId }
        const res = await axios.post(`${DOMAIN}/api/v1/fixed`, newFixed)
        if (res?.data.success) {
            setSubmitFixedMode(false)
            navigate(`/plans/${data.plan.planId}`)
        }
    }

    async function submitVariable(e) {
        e.preventDefault()
        const title = e.target.title.value
        const content = e.target.content.value
        const value = e.target.value.value
        if (isNaN(value)) {
            setVariableMessage("Value must be a numeric value");
            return;
        }
        const startDate = e.target.startdate.value
        const endDate = e.target.enddate.value
        const planId = data.plan.planId
        const newVariable = { title, content, value, startDate, endDate, planId }
        const res = await axios.post(`${DOMAIN}/api/v1/variable`, newVariable)
        if (res?.data.success) {
            setSubmitVariableMode(false)
            navigate(`/plans/${data.plan.planId}`)
        }
    }

    async function submitAsset(e) {
        e.preventDefault()
        const title = e.target.title.value
        const content = e.target.content.value
        const value = e.target.value.value
        if (isNaN(value)) {
            setAssetMessage("Value must be a numeric value");
            return;
        }
        const growthRate = e.target.growthrate.value
        if (isNaN(growthRate)) {
            setAssetMessage("Growth Rate must be a numeric value");
            return;
        }
        const startDate = e.target.startdate.value
        const endDate = e.target.enddate.value
        const planId = data.plan.planId
        const newAsset = { title, content, value, growthRate, startDate, endDate, planId }
        const res = await axios.post(`${DOMAIN}/api/v1/assets`, newAsset)
        if (res?.data.success) {
            setSubmitAssetMode(false)
            navigate(`/plans/${data.plan.planId}`)
        }
    }

    async function submitLiability(e) {
        e.preventDefault()
        const title = e.target.title.value
        const content = e.target.content.value
        const value = e.target.value.value
        if (isNaN(value)) {
            setLiabilityMessage("Value must be a numeric value");
            return;
        }
        const startDate = e.target.startdate.value
        const endDate = e.target.enddate.value
        const planId = data.plan.planId
        const newLiability = { title, content, value, startDate, endDate, planId }
        const res = await axios.post(`${DOMAIN}/api/v1/liabilities`, newLiability)
        if (res?.data.success) {
            setSubmitLiabilityMode(false)
            navigate(`/plans/${data.plan.planId}`)
        }
    }

    return (
        <div className="pb-10 px-1">
            <h1 className="text-3xl font-bold text-center py-5 ">{data.plan.title}</h1>
            <p>{data.plan.content}</p>
            <Line options={options} data={chartData} />
            <div className="flex">
                <p className="text-xl font-bold text-center px-5 py-5">Net Monthly Balance: ${netMonthlyBalance.toLocaleString()}</p>
                <p className="text-xl font-bold text-center px-5 py-5">Net Worth: ${(netWorth).toLocaleString()}</p>
            </div>
            <div className="md:grid md:gap-4 md:grid-cols-3">
                <div>
                    <div className="flex text-xl font-bold text-center pt-5" onClick={() => setExpandedIncome(!expandedIncome)}>Income {expandedIncome ? <FaChevronUp size={20} className=" text-center ml-5" /> : <FaChevronDown size={20} className=" text-center ml-5" />}</div>
                    {expandedIncome && <button className="rounded-xl my-5 py-2 px-2 bg-slate-600 text-white" onClick={() => setSubmitIncomeMode(true)}>Add Income</button>}
                    {submitIncomeMode ?
                        <form onSubmit={submitIncome} className="flex flex-col">
                            <div className="flex flex-col">
                                <label htmlFor="title" >Company Name</label>
                                <input type="text" name='title' id='title' placeholder="Title" required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col mt-1">
                                <label htmlFor="content">Job Position Title</label>
                                <textarea type="text" name='content' id='content' placeholder='Content' required rows="2" cols="40" className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col mt-1">
                                <label htmlFor="value">Gross Annual Salary</label>
                                <input type="text" name='value' id='value' placeholder='Salary' required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="taxrate">Tax Rate</label>
                                <input type="text" name='taxrate' id='taxrate' placeholder='Tax Rate' required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="startdate">Start Date</label>
                                <input type="date" name='startdate' id='startdate' required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="enddate">End Date</label>
                                <input type="date" name='enddate' id='enddate' className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            {incomeMessage}
                            <button type="submit" className="rounded-xl my-1 py-2 px-2 bg-slate-700 text-white">Add</button>
                            <button className="rounded-xl py-2 px-2 bg-red-900 text-white" onClick={() => setSubmitIncomeMode(false)}>Cancel</button>
                        </form>
                        : ""}
                    {expandedIncome && data.income.map((element) => <Income key={element.incomeId} title={element.title} content={element.content} value={element.value} startDate={element.startDate} endDate={element.endDate} />)}
                </div>
                <div>
                    <div className="flex text-xl font-bold text-center pt-5 " onClick={() => setExpandedFixed(!expandedFixed)}>Fixed Expenditure {expandedFixed ? <FaChevronUp size={20} className=" text-center ml-5" /> : <FaChevronDown size={20} className=" text-center ml-5" />}</div>
                    {expandedFixed && <button className="rounded-xl my-5 py-2 px-2 bg-slate-600 text-white" onClick={() => setSubmitFixedMode(true)}>Add Fixed Spending</button>}
                    {submitFixedMode ?
                        <form onSubmit={submitFixed} className="flex flex-col">
                            <div className="flex flex-col">
                                <label htmlFor="title" >Title</label>
                                <input type="text" name='title' id='title' placeholder="Title" required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="content">Description</label>
                                <textarea type="text" name='content' id='content' placeholder='Content' required rows="2" cols="40" className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="value">Monthly Value</label>
                                <input type="text" name='value' id='value' placeholder='Value' required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="startdate">Start Date</label>
                                <input type="date" name='startdate' id='startdate' required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="enddate">End Date</label>
                                <input type="date" name='enddate' id='enddate' className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            {fixedMessage}
                            <button type="submit" className="rounded-xl my-1 py-2 px-2 bg-slate-700 text-white">Add</button>
                            <button className="rounded-xl py-2 px-2 bg-red-900 text-white" onClick={() => setSubmitFixedMode(false)}>Cancel</button>
                        </form>
                        : ""}
                    {expandedFixed && <div>{data.fixed.map((element) => <Fixed key={element.fExpId} title={element.title} content={element.content} value={element.value} startDate={element.startDate} endDate={element.endDate} />)}</div>}
                </div>
                <div>
                    <div className="flex text-xl font-bold text-center pt-5 " onClick={() => setExpandedVariable(!expandedVariable)}>Variable Expenditure {expandedVariable ? <FaChevronUp size={20} className=" text-center ml-5" /> : <FaChevronDown size={20} className=" text-center ml-5" />}</div>
                    {expandedVariable && <button className="rounded-xl my-5 py-2 px-2 bg-slate-600 text-white" onClick={() => setSubmitVariableMode(true)}>Add Variable Spending</button>}
                    {submitVariableMode ?
                        <form onSubmit={submitVariable} className="flex flex-col">
                            <div className="flex flex-col">
                                <label htmlFor="title" >Title</label>
                                <input type="text" name='title' id='title' placeholder="Title" required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="content">Description</label>
                                <textarea type="text" name='content' id='content' placeholder='Content' required rows="2" cols="40" className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="value">Monthly Value</label>
                                <input type="text" name='value' id='value' placeholder='Value' required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="startdate">Start Date</label>
                                <input type="date" name='startdate' id='startdate' required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="enddate">End Date</label>
                                <input type="date" name='enddate' id='enddate' className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            {variableMessage}
                            <button type="submit" className="rounded-xl my-1 py-2 px-2 bg-slate-700 text-white">Add</button>
                            <button className="rounded-xl py-2 px-2 bg-red-900 text-white" onClick={() => setSubmitVariableMode(false)}>Cancel</button>
                        </form>
                        : ""}
                    {expandedVariable && data.variable.map((element) => <Variable key={element.vExpId} title={element.title} content={element.content} value={element.value} startDate={element.startDate} endDate={element.endDate} />)}
                </div>
                <div>
                    <div className="flex text-xl font-bold text-center pt-5 " onClick={() => setExpandedAssets(!expandedAssets)}>Assets {expandedAssets ? <FaChevronUp size={20} className=" text-center ml-5" /> : <FaChevronDown size={20} className=" text-center ml-5" />}</div>
                    {expandedAssets && <button className="rounded-xl my-5 py-2 px-2 bg-slate-600 text-white" onClick={() => setSubmitAssetMode(true)}>Add Asset</button>}
                    {submitAssetMode ?
                        <form onSubmit={submitAsset} className="flex flex-col">
                            <div className="flex flex-col">
                                <label htmlFor="title" >Title</label>
                                <input type="text" name='title' id='title' placeholder="Title" required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="content">Description</label>
                                <textarea type="text" name='content' id='content' placeholder='Content' required rows="2" cols="40" className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="value">Value</label>
                                <input type="text" name='value' id='value' placeholder='Value' required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="startdate">Growth Rate</label>
                                <input type="text" name='growthrate' id='growthrate' placeholder='%' required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="startdate">Start Date</label>
                                <input type="date" name='startdate' id='startdate' required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="enddate">End Date</label>
                                <input type="date" name='enddate' id='enddate' className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            {assetMessage}
                            <button type="submit" className="rounded-xl my-1 py-2 px-2 bg-slate-700 text-white">Add</button>
                            <button className="rounded-xl py-2 px-2 bg-red-900 text-white" onClick={() => setSubmitAssetMode(false)}>Cancel</button>
                        </form>
                        : ""}
                    {expandedAssets && data.assets.map((element) => <Asset key={element.assetId} title={element.title} content={element.content} value={element.value} startDate={element.startDate} endDate={element.endDate} />)}
                </div>
                <div>
                    <div className="flex text-xl font-bold text-center pt-5 " onClick={() => setExpandedLiabilities(!expandedLiabilities)}>Liabilities {expandedLiabilities ? <FaChevronUp size={20} className=" text-center ml-5" /> : <FaChevronDown size={20} className=" text-center ml-5" />}</div>
                    {expandedLiabilities && <button className="rounded-xl my-5 py-2 px-2 bg-slate-600 text-white" onClick={() => setSubmitLiabilityMode(true)}>Add Liability</button>}
                    {submitLiabilityMode ?
                        <form onSubmit={submitLiability} className="flex flex-col">
                            <div className="flex flex-col">
                                <label htmlFor="title" >Title</label>
                                <input type="text" name='title' id='title' placeholder="Title" required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="content">Description</label>
                                <textarea type="text" name='content' id='content' placeholder='Content' required rows="2" cols="40" className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="value">Value</label>
                                <input type="text" name='value' id='value' placeholder='Value' required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="startdate">Start Date</label>
                                <input type="date" name='startdate' id='startdate' required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            <div className="flex flex-col my-1">
                                <label htmlFor="enddate">End Date</label>
                                <input type="date" name='enddate' id='enddate' className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                            </div>
                            {liabilityMessage}
                            <button type="submit" className="rounded-xl my-1 py-2 px-2 bg-slate-700 text-white">Add</button>
                            <button className="rounded-xl py-2 px-2 bg-red-900 text-white" onClick={() => setSubmitLiabilityMode(false)}>Cancel</button>
                        </form>
                        : ""}
                    {expandedLiabilities && data.liabilities.map((element) => <Liability key={element.liabilityId} title={element.title} content={element.content} value={element.value} startDate={element.startDate} endDate={element.endDate} />)}
                </div>
            </div>

        </div>
    )
}

export async function planLoader({ params }) {
    const res = await axios.get(`${DOMAIN}/api/v1/plan/${params.planId}`)
    return res.data
}