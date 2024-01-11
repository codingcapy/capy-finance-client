
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: plan page jsx for capy finance client
 */

import { useLoaderData, useNavigate } from "react-router-dom"
import { useState } from "react";
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
import Income from "../components/Income";
import Fixed from "../components/Fixed";
import Variable from "../components/Variable";
import Asset from "../components/Asset";
import Liability from "../components/Liability";
import Goal from "../components/Goal";
import { FaChevronDown, FaChevronUp, FaCog } from "react-icons/fa";

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
    const [editMode, setEditMode] = useState(false)
    const [editedTitle, setEditedTitle] = useState(data.plan.title);
    const [editedContent, setEditedContent] = useState(data.plan.content);
    const [expandedMenu, setExpandedMenu] = useState(false)
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
    const [expandedGoals, setExpandedGoals] = useState(false)
    const [submitGoalMode, setSubmitGoalMode] = useState(false)
    const [incomeMessage, setIncomeMessage] = useState("")
    const [fixedMessage, setFixedMessage] = useState("")
    const [variableMessage, setVariableMessage] = useState("")
    const [assetMessage, setAssetMessage] = useState("")
    const [liabilityMessage, setLiabilityMessage] = useState("")
    const [goalMessage, setGoalMessage] = useState("")
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
    const monthlyGrowths = []
    data.assets.forEach((asset) => {
        const monthlyGrowth = (asset.value * asset.growthRate / 100 / 12)
        monthlyGrowths.push(monthlyGrowth)
    })
    const totalGrowths = monthlyGrowths.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
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
    const incomeDates = []
    const fixedDates = []
    const variableDates = []
    const assetDates = []
    const liabilitiesDates = []
    const goalDates = []
    const dates = []
    let minIncomeDate = new Date()
    let minFixedDate = new Date()
    let minVariableDate = new Date()
    let minAssetDate = new Date()
    let minLiabilityDate = new Date()
    let minGoalDate = new Date()
    if (data.income.length > 0) {
        data.income.forEach((element) => incomeDates.push(new Date(element.startDate)))
        minIncomeDate = new Date(Math.min(...incomeDates))
    }
    if (data.fixed.length > 0) {
        data.fixed.forEach((element) => fixedDates.push(new Date(element.startDate)))
        minFixedDate = new Date(Math.min(...fixedDates))
    }
    if (data.variable.length > 0) {
        data.variable.forEach((element) => variableDates.push(new Date(element.startDate)))
        minVariableDate = new Date(Math.min(...variableDates))
    }
    if (data.assets.length > 0) {
        data.assets.forEach((element) => assetDates.push(new Date(element.startDate)))
        minAssetDate = new Date(Math.min(...assetDates))
    }
    if (data.liabilities.length > 0) {
        data.liabilities.forEach((element) => liabilitiesDates.push(new Date(element.startDate)))
        minLiabilityDate = new Date(Math.min(...liabilitiesDates))
    }
    if (data.goals.length > 0) {
        data.goals.forEach((element) => goalDates.push(new Date(element.startDate)))
        const minGoalDate = new Date(Math.min(...goalDates))
    }
    dates.push(minIncomeDate, minFixedDate, minVariableDate, minAssetDate, minLiabilityDate, minGoalDate)
    dates.sort((a, b) => { return a + b })
    let oldestDate
    if (dates.length > 0) {
        oldestDate = dates[0]
    }
    else {
        oldestDate = new Date()
    }
    const minDate = oldestDate.toISOString().split('T')[0]
    const currentDate = new Date()
    currentDate.setFullYear(currentDate.getFullYear() + 1)
    const labels = [];
    labels.push(minDate)
    while (labels[labels.length - 1] < currentDate.toISOString().split('T')[0]) {
        const lastLabel = new Date(labels[labels.length - 1]);
        lastLabel.setUTCMonth(lastLabel.getUTCMonth() + 1);
        labels.push(lastLabel.toISOString().split('T')[0]);
    }
    const chartData = {
        labels,
        datasets: [
            {
                fill: true,
                label: `Net Worth ${new Date().getFullYear()}`,
                data: labels.map((label) => {
                    let assets = []
                    let liabilities = []
                    let incomes = []
                    let fixeds = []
                    let variables = []
                    let growths = []
                    data.assets.forEach((asset)=>{
                        if (asset.startDate <= label){
                            assets.push(asset)
                        }
                    })
                    data.liabilities.forEach((liability)=>{
                        if(liability.startDate <= label){
                            liabilities.push(liability)
                        }
                    })
                    data.income.forEach((element)=>{
                        if(element.startDate <= label){
                            incomes.push(element)
                        }
                    })
                    data.fixed.forEach((element)=>{
                        if(element.startDate <= label){
                            fixeds.push(element)
                        }
                    })
                    data.variable.forEach((element)=>{
                        if(element.startDate <= label){
                            variables.push(element)
                        }
                    })
                    assets.forEach((asset)=>{
                        growths.push((asset.value * asset.growthRate/100)/12)
                    })
                    let totalNetWorth = assets.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0) - liabilities.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
                    let totalExpenditure = fixeds.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0) + variables.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0)
                    let netMonthlyBalance = incomes.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0) - (totalExpenditure)
                    let totalGrowths = growths.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
                    console.log(netMonthlyBalance)
                    console.log(totalExpenditure)
                    return totalNetWorth += (netMonthlyBalance + totalGrowths) * (labels.indexOf(label) + 1)
                }),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    async function submitPlan(e) {
        e.preventDefault()
        const title = e.target.title.value;
        const content = e.target.content.value;
        const planId = data.plan.planId;
        const updatedPlan = { title, content }
        const res = await axios.post(`${DOMAIN}/api/v1/plans/${planId}`, updatedPlan);
        if (res?.data.success) {
            navigate(`/capy-finance-client/plans/${planId}`)
            setEditMode(false)
        }
    }

    async function archivePlan() {
        const active = false;
        const planId = data.plan.planId;
        const updatedPlan = { active }
        const res = await axios.post(`${DOMAIN}/api/v1/plans/${planId}`, updatedPlan);
        if (res?.data.success) {
            navigate(`/capy-finance-client/plans/${planId}`)
            setExpandedMenu(false)
        }
    }

    async function unarchivePlan() {
        const active = true;
        const planId = data.plan.planId;
        const updatedPlan = { active }
        const res = await axios.post(`${DOMAIN}/api/v1/plans/${planId}`, updatedPlan);
        if (res?.data.success) {
            navigate(`/capy-finance-client/plans/${planId}`)
            setExpandedMenu(false)
        }
    }

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
            navigate(`/capy-finance-client/plans/${data.plan.planId}`)
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
            navigate(`/capy-finance-client/plans/${data.plan.planId}`)
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
            navigate(`/capy-finance-client/plans/${data.plan.planId}`)
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
            navigate(`/capy-finance-client/plans/${data.plan.planId}`)
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
            navigate(`/capy-finance-client/plans/${data.plan.planId}`)
        }
    }

    async function submitGoal(e) {
        e.preventDefault()
        const title = e.target.title.value
        const content = e.target.content.value
        const value = e.target.value.value
        if (isNaN(value)) {
            setGoalMessage("Value must be a numeric value");
            return;
        }
        const startDate = e.target.startdate.value
        const planId = data.plan.planId
        const newGoal = { title, content, value, startDate, planId }
        const res = await axios.post(`${DOMAIN}/api/v1/goals`, newGoal)
        if (res?.data.success) {
            setSubmitGoalMode(false)
            navigate(`/capy-finance-client/plans/${data.plan.planId}`)
        }
    }

    return (
        <div className="pb-10 px-1">
            <div className="relative">
                {!editMode && <div className="flex justify-between">
                    <div className="text-2xl font-bold py-5 text-gray-500">{!data.plan.active && "ARCHIVED"}</div>
                    <h1 className="text-3xl font-bold text-center py-5 ">{data.plan.title}</h1>
                    <FaCog size={25} onClick={() => setExpandedMenu(!expandedMenu)} className="mt-7 cursor-pointer" />
                </div>}
                {expandedMenu && <div className="absolute right-0 top-full">
                    <div onClick={() => { setEditMode(true); setExpandedMenu(false) }} className="rounded-xl my-1 py-2 px-2 bg-slate-700 text-white cursor-pointer">Edit Plan</div>
                    {data.plan.active && <div className="rounded-xl my-1 py-2 px-2 bg-red-700 text-white cursor-pointer" onClick={archivePlan}>Archive Plan</div>}
                    {!data.plan.active && <div className="rounded-xl my-1 py-2 px-2 bg-green-700 text-white cursor-pointer" onClick={unarchivePlan}>Unarchive Plan</div>}
                </div>}
            </div>
            {editMode && <form onSubmit={submitPlan} className="flex flex-col">
                <div className="flex flex-col">
                    <label htmlFor="title" >Title</label>
                    <input type="text" name='title' id='title' placeholder="Title" required value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <div className="flex flex-col my-2">
                    <label htmlFor="content">Description</label>
                    <textarea type="text" name='content' id='content' placeholder='Description' rows="2" cols="40" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <button type="submit" className="rounded-xl my-1 py-2 px-2 bg-slate-700 text-white">Edit</button>
                <button onClick={() => setEditMode(false)} className="rounded-xl py-2 px-2 bg-red-700 text-white">Cancel</button>
            </form>}
            {!editMode && <p>{data.plan.content}</p>}
            <Line options={options} data={chartData} />
            <div className="md:flex">
                <p className="text-xl font-bold text-center px-5 py-5">Net Monthly Balance: ${netMonthlyBalance.toLocaleString()}</p>
                <p className="text-xl font-bold text-center px-5 py-5">Net Monthly Growth: ${(netMonthlyBalance + totalGrowths).toLocaleString()}</p>
                <p className="text-xl font-bold text-center px-5 py-5">Net Worth: ${(netWorth).toLocaleString()}</p>
            </div>
            <div className="md:grid md:gap-4 md:grid-cols-3">
                <div>
                    <div className="flex text-xl font-bold text-center pt-5 cursor-pointer" onClick={() => setExpandedIncome(!expandedIncome)}>Income {expandedIncome ? <FaChevronUp size={20} className=" text-center ml-5" /> : <FaChevronDown size={20} className=" text-center ml-5" />}</div>
                    {expandedIncome && <button className="rounded-xl my-5 py-2 px-2 bg-slate-600 text-white" onClick={() => setSubmitIncomeMode(true)}>Add Income</button>}
                    {submitIncomeMode ?
                        <form onSubmit={submitIncome} className="flex flex-col">
                            <div className="flex flex-col">
                                <label htmlFor="title" >Company Name</label> {/*not mandatory*/}
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
                    {expandedIncome && data.income.map((element) => <Income key={element.incomeId} incomeId={element.incomeId} planId={element.planId} title={element.title} content={element.content} value={element.value} taxRate={element.taxRate} startDate={element.startDate} endDate={element.endDate} />)}
                </div>
                <div>
                    <div className="flex text-xl font-bold text-center pt-5 cursor-pointer" onClick={() => setExpandedFixed(!expandedFixed)}>Fixed Expenditure {expandedFixed ? <FaChevronUp size={20} className=" text-center ml-5" /> : <FaChevronDown size={20} className=" text-center ml-5" />}</div>
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
                    {expandedFixed && <div>{data.fixed.map((element) => <Fixed key={element.fExpId} fExpId={element.fExpId} planId={element.planId} title={element.title} content={element.content} value={element.value} startDate={element.startDate} endDate={element.endDate} />)}</div>}
                </div>
                <div>
                    <div className="flex text-xl font-bold text-center pt-5 cursor-pointer" onClick={() => setExpandedVariable(!expandedVariable)}>Variable Expenditure {expandedVariable ? <FaChevronUp size={20} className=" text-center ml-5" /> : <FaChevronDown size={20} className=" text-center ml-5" />}</div>
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
                    {expandedVariable && data.variable.map((element) => <Variable key={element.vExpId} vExpId={element.vExpId} planId={element.planId} title={element.title} content={element.content} value={element.value} startDate={element.startDate} endDate={element.endDate} />)}
                </div>
                <div>
                    <div className="flex text-xl font-bold text-center pt-5 cursor-pointer" onClick={() => setExpandedAssets(!expandedAssets)}>Assets {expandedAssets ? <FaChevronUp size={20} className=" text-center ml-5" /> : <FaChevronDown size={20} className=" text-center ml-5" />}</div>
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
                    {expandedAssets && data.assets.map((element) => <Asset key={element.assetId} assetId={element.assetId} planId={element.planId} title={element.title} content={element.content} value={element.value} growthRate={element.growthRate} startDate={element.startDate} endDate={element.endDate} />)}
                </div>
                <div>
                    <div className="flex text-xl font-bold text-center pt-5 cursor-pointer" onClick={() => setExpandedLiabilities(!expandedLiabilities)}>Liabilities {expandedLiabilities ? <FaChevronUp size={20} className=" text-center ml-5" /> : <FaChevronDown size={20} className=" text-center ml-5" />}</div>
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
                    {expandedLiabilities && data.liabilities.map((element) => <Liability key={element.liabilityId} liabilityId={element.liabilityId} planId={element.planId} title={element.title} content={element.content} value={element.value} startDate={element.startDate} endDate={element.endDate} />)}
                </div>
                <div>
                    <div className="flex text-xl font-bold text-center pt-5 cursor-pointer" onClick={() => setExpandedGoals(!expandedGoals)}>Financial Goals {expandedGoals ? <FaChevronUp size={20} className=" text-center ml-5" /> : <FaChevronDown size={20} className=" text-center ml-5" />}</div>
                    {expandedGoals && <button className="rounded-xl my-5 py-2 px-2 bg-slate-600 text-white" onClick={() => setSubmitGoalMode(true)}>Add Financial Goal</button>}
                    {submitGoalMode ?
                        <form onSubmit={submitGoal} className="flex flex-col">
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
                            {goalMessage}
                            <button type="submit" className="rounded-xl my-1 py-2 px-2 bg-slate-700 text-white">Add</button>
                            <button className="rounded-xl py-2 px-2 bg-red-900 text-white" onClick={() => setSubmitGoalMode(false)}>Cancel</button>
                        </form>
                        : ""}
                    {expandedGoals && data.goals.map((element) => <Goal key={element.goalId} goalId={element.goalId} planId={element.planId} title={element.title} content={element.content} value={element.value} startDate={element.startDate} />)}
                </div>
            </div>

        </div>
    )
}

export async function planLoader({ params }) {
    const res = await axios.get(`${DOMAIN}/api/v1/plan/${params.planId}`)
    return res.data
}