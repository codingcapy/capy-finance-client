
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: income component jsx for capy finance client
 */

import { useState } from "react"
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useNavigate } from "react-router-dom";

export default function Income(props) {

    const navigate = useNavigate()
    const [editMode, setEditMode] = useState(false)
    const [incomeMessage, setIncomeMessage] = useState("")
    const [editedTitle, setEditedTitle] = useState(props.title);
    const [editedContent, setEditedContent] = useState(props.content);
    const [editedValue, setEditedValue] = useState(parseFloat(props.value));
    const [editedTaxRate, setEditedTaxRate] = useState(parseFloat(props.taxRate));
    const [editedStartDate, setEditedStartDate] = useState(props.startDate);
    const [editedEndDate, setEditedEndDate] = useState(props.endDate);

    async function submitIncome(e) {
        e.preventDefault()
        const incomeId = props.incomeId;
        const title = e.target.title.value
        const content = e.target.content.value
        const value = parseFloat(e.target.value.value)
        if (isNaN(value)) {
            setIncomeMessage("Value must be a numeric value");
            return;
        }
        const taxRate = parseFloat(e.target.taxrate.value)
        if (isNaN(taxRate)) {
            setIncomeMessage("Tax rate must be a numeric value");
            return;
        }
        const startDate = e.target.startdate.value
        const endDate = e.target.enddate.value
        const planId = props.planId
        const newIncome = { title, content, value, taxRate, startDate, endDate, planId }
        const res = await axios.post(`${DOMAIN}/api/v1/incomes/${incomeId}`, newIncome)
        if (res?.data.success) {
            navigate(`/capy-finance-client/plans/${planId}`)
            setEditMode(false)
        }
    }

    return (
        <div>
            <p className="text-xl font-bold">{props.title} <span className="text-base font-normal rounded-xl py-2 px-2 bg-slate-600 cursor-pointer" onClick={() => setEditMode(true)}>edit</span></p>
            {editMode && <form onSubmit={submitIncome} className="flex flex-col">
                <div className="flex flex-col">
                    <label htmlFor="title" >Company Name</label> {/*not mandatory*/}
                    <input type="text" name='title' id='title' placeholder="Title" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <div className="flex flex-col mt-1">
                    <label htmlFor="content">Job Position Title</label>
                    <textarea type="text" name='content' id='content' placeholder='Content' value={editedContent} onChange={(e) => setEditedContent(e.target.value)} required rows="2" cols="40" className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <div className="flex flex-col mt-1">
                    <label htmlFor="value">Gross Annual Salary</label>
                    <input type="text" name='value' id='value' placeholder='Salary' value={editedValue} onChange={(e) => setEditedValue(e.target.value)} required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <div className="flex flex-col my-1">
                    <label htmlFor="taxrate">Tax Rate %</label>
                    <input type="text" name='taxrate' id='taxrate' placeholder='e.g 20.57' value={editedTaxRate} onChange={(e) => setEditedTaxRate(e.target.value)} required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <div className="flex flex-col my-1">
                    <label htmlFor="startdate">Start Date</label>
                    <input type="date" name='startdate' id='startdate' value={editedStartDate} onChange={(e) => setEditedStartDate(e.target.value)} required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <div className="flex flex-col my-1">
                    <label htmlFor="enddate">End Date</label>
                    <input type="date" name='enddate' id='enddate' value={editedEndDate} onChange={(e) => setEditedEndDate(e.target.value)} className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                {incomeMessage}
                <button type="submit" className="rounded-xl my-1 py-2 px-2 bg-slate-700 text-white">Add</button>
                <button className="rounded-xl py-2 px-2 bg-red-900 text-white" onClick={() => setEditMode(false)}>Cancel</button>
            </form>}
            {!editMode && <div>
                <p>{props.content}</p>
                <p>Gross Annual Salary: ${Number(props.value).toFixed(2)}</p>
                <p>Tax Rate: {Number(props.taxRate).toFixed(2)}%</p>
                <p>Gross Monthly Income: ${Number(props.value / 12).toFixed(2)}</p>
                <p className="font-bold">Net Monthly Income: ${Number((props.value - props.value * props.taxRate / 100) / 12).toFixed(2)}</p>
                <p>Start Date: {props.startDate.slice(0, 10)}</p>
                <p>End Date: {props.endDate && props.endDate.slice(0, 10)}</p>
            </div>}
            <br />
        </div>
    )
}