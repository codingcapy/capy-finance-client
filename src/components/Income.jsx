import { useState } from "react"


export default function Income(props) {

    const [editMode, setEditMode] = useState(false)
    const [incomeMessage, setIncomeMessage] = useState("")

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
            setEditMode(false)
            navigate(`/capy-finance-client/plans/${data.plan.planId}`)
        }
    }

    return (
        <div>
            <p className="text-xl font-bold">{props.title} <span className="text-base font-normal rounded-xl py-2 px-2 bg-slate-600" onClick={() => setEditMode(true)}>edit</span></p>
            {editMode && <form onSubmit={submitIncome} className="flex flex-col">
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