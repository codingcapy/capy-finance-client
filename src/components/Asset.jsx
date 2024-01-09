
/*
Author: Paul Kim
Date: January 9, 2024
Version: 1.0
Description: asset component jsx for capy finance client
 */

import { useState } from "react"
import axios from "axios";
import DOMAIN from "../services/endpoint";
import { useNavigate } from "react-router-dom";

export default function Asset(props) {

    const navigate = useNavigate()
    const [editMode, setEditMode] = useState(false)
    const [assetMessage, setAssetMessage] = useState("")
    const [editedTitle, setEditedTitle] = useState(props.title);
    const [editedContent, setEditedContent] = useState(props.content);
    const [editedValue, setEditedValue] = useState(parseFloat(props.value));
    const [editedGrowthRate, setEditedGrowthRate] = useState(parseFloat(props.growthRate));
    const [editedStartDate, setEditedStartDate] = useState(props.startDate);
    const [editedEndDate, setEditedEndDate] = useState(props.endDate);

    async function submitAsset(e) {
        e.preventDefault()
        const assetId = props.assetId;
        const title = e.target.title.value
        const content = e.target.content.value
        const value = parseFloat(e.target.value.value)
        if (isNaN(value)) {
            setAssetMessage("Value must be a numeric value");
            return;
        }
        const growthRate = parseFloat(e.target.growthrate.value)
        if (isNaN(growthRate)) {
            setAssetMessage("Growth Rate must be a numeric value");
            return;
        }
        const startDate = e.target.startdate.value
        const endDate = e.target.enddate.value
        const planId = props.planId
        const newAsset = { title, content, value, growthRate, startDate, endDate, assetId }
        const res = await axios.post(`${DOMAIN}/api/v1/assets/${assetId}`, newAsset)
        if (res?.data.success) {
            navigate(`/capy-finance-client/plans/${planId}`)
            setEditMode(false)
        }
    }

    return (
        <div>
            <p className="text-xl font-boldpx-5">{props.title} <span className="text-base font-normal rounded-xl py-2 px-2 bg-slate-600 cursor-pointer" onClick={() => setEditMode(true)}>edit</span></p>
            {editMode && <form onSubmit={submitAsset} className="flex flex-col">
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
                <div className="flex flex-col mt-1">
                    <label htmlFor="value">Growth Rate</label>
                    <input type="text" name='growthrate' id='growthrate' placeholder='Growth Rate' value={editedGrowthRate} onChange={(e) => setEditedGrowthRate(e.target.value)} required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <div className="flex flex-col my-1">
                    <label htmlFor="startdate">Start Date</label>
                    <input type="date" name='startdate' id='startdate' value={editedStartDate} onChange={(e) => setEditedStartDate(e.target.value)} required className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                <div className="flex flex-col my-1">
                    <label htmlFor="enddate">End Date</label>
                    <input type="date" name='enddate' id='enddate' value={editedEndDate} onChange={(e) => setEditedEndDate(e.target.value)} className="px-2 border rounded-lg border-slate-700 py-1 text-black" />
                </div>
                {assetMessage}
                <button type="submit" className="rounded-xl my-1 py-2 px-2 bg-slate-700 text-white">Add</button>
                <button className="rounded-xl py-2 px-2 bg-red-900 text-white" onClick={() => setEditMode(false)}>Cancel</button>
            </form>}
            <p>{props.content}</p>
            <p className="font-bold">Value: ${Number(props.value).toFixed(2)}</p>
            <p>Growth Rate: {Number(props.growthRate).toFixed(2)}%</p>
            <p>Start Date: {props.startDate.slice(0, 10)}</p>
            <p>End Date: {props.endDate && props.endDate.slice(0, 10)}</p>
            <br />
        </div>
    )
}