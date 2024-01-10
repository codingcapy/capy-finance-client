
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: goal component jsx for capy finance client
 */

import { useState } from "react"
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useNavigate } from "react-router-dom";

export default function Goal(props) {

    const navigate = useNavigate()
    const [editMode, setEditMode] = useState(false)
    const [goalMessage, setGoalMessage] = useState("")
    const [editedTitle, setEditedTitle] = useState(props.title);
    const [editedContent, setEditedContent] = useState(props.content);
    const [editedValue, setEditedValue] = useState(parseFloat(props.value));
    const [editedStartDate, setEditedStartDate] = useState(props.startDate);
    const [editedEndDate, setEditedEndDate] = useState(props.endDate);

    async function submitGoal(e) {
        e.preventDefault()
        const goalId = props.goalId;
        const title = e.target.title.value
        const content = e.target.content.value
        const value = parseFloat(e.target.value.value)
        if (isNaN(value)) {
            setLiabilityMessage("Value must be a numeric value");
            return;
        }
        const startDate = e.target.startdate.value
        const planId = props.planId
        const newGoal = { title, content, value, startDate, goalId }
        const res = await axios.post(`${DOMAIN}/api/v1/goals/${goalId}`, newGoal)
        if (res?.data.success) {
            navigate(`/capy-finance-client/plans/${planId}`)
            setEditMode(false)
        }
    }

    return (
        <div>
            <p className="text-xl font-bold">{props.title} <span className="text-base font-normal rounded-xl py-2 px-2 bg-slate-600 cursor-pointer" onClick={() => setEditMode(true)}>edit</span></p>
            {editMode && <form onSubmit={submitGoal} className="flex flex-col">
                <div className="flex flex-col">
                    <label htmlFor="title" >Title</label> {/*not mandatory*/}
                    <input type="text" name='title' id='title' placeholder="Title" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <div className="flex flex-col mt-1">
                    <label htmlFor="content">Description</label>
                    <textarea type="text" name='content' id='content' placeholder='Content' value={editedContent} onChange={(e) => setEditedContent(e.target.value)} required rows="2" cols="40" className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <div className="flex flex-col mt-1">
                    <label htmlFor="value">Value</label>
                    <input type="text" name='value' id='value' placeholder='Salary' value={editedValue} onChange={(e) => setEditedValue(e.target.value)} required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <div className="flex flex-col my-1">
                    <label htmlFor="startdate">Start Date</label>
                    <input type="date" name='startdate' id='startdate' value={editedStartDate} onChange={(e) => setEditedStartDate(e.target.value)} required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                {goalMessage}
                <button type="submit" className="rounded-xl my-1 py-2 px-2 bg-slate-700 text-white">Add</button>
                <button className="rounded-xl py-2 px-2 bg-red-900 text-white" onClick={() => setEditMode(false)}>Cancel</button>
            </form>}
            <p>{props.content}</p>
            <p className="font-bold">Goal value: ${Number(props.value).toFixed(2)}</p>
            <p>Start Date: {props.startDate.slice(0, 10)}</p>
            <p>End Date: </p>
            <br />
        </div>
    )
}